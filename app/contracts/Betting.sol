// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Betting {
    //合约构造参数
    address public owner;
    uint public BettingId;
    uint public totalBets;
    uint public minimumBet;
    uint public maximumBet;
    uint public bettingEnds;
    bool public ended;
    string BettingTopic;
    string description;
    
    
    //订单和下注单对象数组
    // BetOption[] public betOptions;
    BetOrder[] private betOrders;
    //mapping(address => BetOrder[]) public betOrders;
    // mapping(address => uint256) public balances;
    uint256 public balances;
    Bet[] private bets;
    //mapping(address => Bet[]) public bets;
    //当前的个选项倍率和订单ID
    uint[] public currentOdd; 
    uint[] public currentId;
    

    //暂时没用
    //address[] public players;
    //address payable[] public players;
    mapping(address => uint[]) public playerBets; // playerBets 使用映射，什么地址发出的请求获得其地址的下注信息
    mapping(address => uint[]) public playerOrders; // playerOrders 使用映射，什么地址发出的请求获得其地址的下庄信息
    //address payable[] public winners;
    // uint public totalAmount;
    // uint public winningAmount;

    //初始化 （不知道多次调用是否需要，暂时没写）

    struct Bet {
        uint256 id;
        address payable user;
        address payable banker;
        // string topic;
        uint256 betOption;
        uint256 betOrderId;
        uint256 odd;
        uint256 amount;
        uint256 prospectiveIncome;
        uint256 Income;
        bool settled;
        bool canceled;
    }

    // struct BetOption {
    //     uint256 id;
    //     string name;
    //     address payable user;
    //     uint256 odds;
    //     uint256 totalBets;
    //     uint256 totalBetAmount;
    //     uint256 outcome;
    //     bool settled;
    // }

    struct BetOrder {
        uint256 id;
        // string topic;
        uint option;
        address payable user;
        uint256 odds;
        uint256 orderAmount;
        uint256 betsPlacedAmount;
        uint256 prospectiveIncome;
        uint256 maxIncome;
        uint256 Income;
        bool participation;
        bool settled;
        bool proceed;
        bool canceled;
    }

    // 构造器
    // constructor(address _owner,uint _BettingId, string memory _topic,string memory _description, uint _numOfoptions, uint _maximumBet, uint _bettingTime){
    //     owner = _owner;
    //     BettingId = _BettingId;
    //     BettingTopic = _topic;
    //     description = _description;
    //     maximumBet = _maximumBet;
    //     bettingEnds = block.timestamp + _bettingTime;
    //     currentOdd=new uint[](_numOfoptions);
    //     currentId=new uint[](_numOfoptions);
    // }
    constructor(uint _numOfoptions) {
        // minimumBet = _minimumBet;
        // maximumBet = _maximumBet;
        // bettingEnds = block.timestamp + _bettingTime;
        // betRatio = _betRatio;
        // BettingTopic = _topic;

        ended = false;
        currentOdd=new uint[](_numOfoptions);
        currentId=new uint[](_numOfoptions);
    }
    
    function createOrder(uint optionSelected, uint oddSetted) public payable {

        //由于gas费后面的创建要求将会提高
        require(!ended , "Bet finsihed");
        require(msg.value > 100 , "Insufficient deposit");
        require(msg.value % oddSetted == 0, "The amount and the odd are not divisible");
        require(oddSetted > 0 && oddSetted < 100, "Beyond the ratio range");
        
        // 构建订单
        betOrders.push(BetOrder({
            id: betOrders.length + 1,
            // topic: BettingTopic,
            user: payable(msg.sender),
            option: optionSelected,
            odds: oddSetted, //1=0.1倍 因为合约没有浮点数
            orderAmount: msg.value,
            betsPlacedAmount: (msg.value * 10) / oddSetted,
            prospectiveIncome: 0,
            maxIncome: (((msg.value * 10) / oddSetted)+ msg.value) * 97/100, // 3% commission
            Income: 0,
            participation: false,
            settled: false,
            proceed: false,
            canceled: false
        }));
        playerOrders[msg.sender].push(betOrders.length);
        // 判断是否有订单
        if(currentOdd[optionSelected] == 0){
            currentOdd[optionSelected] = oddSetted;
            currentId[optionSelected] = betOrders.length;
        }
        // 判断是否是最高倍率订单
        else{
            if(oddSetted > currentOdd[optionSelected]){
               currentOdd[optionSelected] = oddSetted;
               currentId[optionSelected] = betOrders.length;
               }
        }
        

        //emit createOrder(betOrders.length,optionSelected, oddSetted);
    }
    
    function placeBet(uint256 optionSelected) public payable {
        require(!ended , "Bet finsihed");
        require(betOrders.length > 0, "Array is empty");
        require(currentId[optionSelected] > 0, "Invalid bet option ID");
        BetOrder storage betOrder = betOrders[currentId[optionSelected]-1];
        require(!betOrder.settled, "Bet Order already settled");
        require(!betOrder.proceed, "Bet Order already proceed");
        require(msg.value > 0, "Invalid bet amount");
        require(msg.value <= betOrder.betsPlacedAmount, "Beyond the bet amount range");
        // balances[msg.sender] += msg.value;
        bets.push(Bet({
            id: bets.length + 1,
            //投注者地址，结算的时候打钱到这里
            user: payable(msg.sender),
            //庄家地址
            banker:payable(betOrder.user),
            //竞猜主题
            // topic: BettingTopic,
            //投注者的订单ID
            betOrderId: betOrder.id,
            //投注者的选择
            betOption: optionSelected,
            //订单的倍率
            odd: betOrder.odds,
            //下注金额
            amount: msg.value,
            //预计收益
            prospectiveIncome: (msg.value/10 * betOrder.odds+ msg.value) * 97/100,
            Income: 0,
            //是否结算
            settled :false,
            canceled: false
        }));

        playerBets[msg.sender].push(bets.length);
        betOrder.participation = true;

        if(betOrder.prospectiveIncome == 0){
            betOrder.prospectiveIncome = betOrder.orderAmount * 97/100;
            betOrder.prospectiveIncome += msg.value * 97/100;
        }
        else{
            betOrder.prospectiveIncome += msg.value * 97/100;
        }
        //寻找最大赔率订单索引 
        betOrder.betsPlacedAmount -= msg.value;
        if(betOrder.betsPlacedAmount == 0){
            uint maxOdd = 0;
            uint maxId = 0;
            betOrder.proceed = true;
            for(uint i=0 ;i< betOrders.length;i++){
                if(betOrders[i].proceed == false){
                    if( betOrders[i].odds > maxOdd){
                        maxOdd = betOrders[i].odds;
                        maxId = betOrders[i].id;
                    }
                }
            }
            currentId[optionSelected] = maxId;
            currentOdd[optionSelected] = maxOdd;
        }
    }
    //结算（后续输入参数会加）
    function settle(uint256 optionSelected) public payable{
        // requirement
        require(!ended , "Bet finsihed");


        for(uint i=0 ;i< betOrders.length;i++){
            //待修改，目前可用
            if(betOrders[i].participation == true){
                if(betOrders[i].option != optionSelected){
                    payable(betOrders[i].user).transfer(betOrders[i].prospectiveIncome);
                    betOrders[i].Income = betOrders[i].prospectiveIncome;
                    betOrders[i].settled = true;
                }
                else{
                    // 订单被部分投注
                    if(betOrders[i].proceed == false){
                        payable(betOrders[i].user).transfer((betOrders[i].betsPlacedAmount * betOrders[i].betsPlacedAmount)/10);
                    }

                }
            }
            else{
                //全额退款可能考虑到gas费，目前100%退款
                payable(betOrders[i].user).transfer(betOrders[i].orderAmount);
                betOrders[i].settled = true;
            }
        }
        for(uint i=0 ;i < bets.length;i++){
            if(bets[i].settled == false){
                if(bets[i].betOption == optionSelected){
                    payable(bets[i].user).transfer(bets[i].prospectiveIncome);
                    balances = bets[i].user.balance;
                    bets[i].Income = bets[i].prospectiveIncome;
                    bets[i].settled = true;
                    }
            }
        }
        ended =true;       
    }
    //  取消这次竞猜
    function cancel() public {
        //requirement
        require(!ended , "Bet finsihed");
        if(betOrders.length > 0){
            for(uint i = 0 ;i < betOrders.length;i++){
                payable(betOrders[i].user).transfer(betOrders[i].orderAmount);
                betOrders[i].settled = true;
            }
        }
        if(bets.length > 0){
            for(uint i = 0 ;i < bets.length;i++){
                payable(bets[i].user).transfer(bets[i].amount);
                bets[i].settled = true;
            }
        }
        ended =true; 
    }
    /**
    * @dev 获取竞猜详情。
    * @return 竞猜标题和描述。
    */
    function getbettingDetail() external view returns (string memory, string memory){
        return (BettingTopic,description);
    }

    function getAllBets() external view returns (Bet[] memory){
        return (bets);
    }
    function getAllOrders() external view returns (BetOrder[] memory){
        return (betOrders);
    }
    function getBet(uint i) external view returns (Bet memory){
        return (bets[i]);
    }
    function getOrder(uint i) external view returns (BetOrder memory){
        return (betOrders[i]);
    }
    function getPlayerBet(address user) external view returns (uint256[] memory){
        return (playerBets[user]);
    }
     function getPlayerOrder(address user) external view returns (uint256[] memory){
        return (playerOrders[user]);
    }







    // function checkPlayerExists(address player) public view returns(bool) {
    //     for(uint i = 0; i < players.length; i++) {
    //         if(players[i] == player) return true;
    //     }
    //     return false;
    // }
    // function bet(uint optionSelected) public payable {
    //     require(optionSelected == 1 || optionSelected == 2, "Invalid option selection");
    //     require(msg.value >= minimumBet && msg.value <= maximumBet);
    //     if(!checkPlayerExists(msg.sender)) players.push(msg.sender);
    //     players.push(payable(msg.sender));
    //     playerBets[msg.sender] = msg.value;
        
    // }
    

    // function createBetOption(string memory name) public {
    //     require(msg.value > 10, "Insufficient deposit");
    //     betOptions.push(BetOption({
    //         id: betOptions.length + 1,
    //         name: name,
    //         totalBets: 0,
    //         totalBetAmount: 0,
    //         outcome: 0,
    //         settled: false
    //     }));
    //     emit BetOptionCreated(betOptions.length, name );
    // }


}