// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Betting {
    //合约构造参数
    address private owner;
    uint private BettingId;
    uint private  bettingEnds;
    bool private ended;
    string BettingTopic;
    uint private bettingstarts;

    
    
    //订单和下注单对象数组
    // BetOption[] public betOptions;
    BetOrder[] private betOrders;
    //mapping(address => BetOrder[]) public betOrders;
    // mapping(address => uint256) public balances;
    Bet[] private bets;
    //mapping(address => Bet[]) public bets;
    //当前的个选项倍率和订单ID
    uint[] public currentOdd; 
    uint[] public currentId;
    uint[] public currentPool;
    

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
        // string topic;
        uint256 betOption;
        uint256 betOrderId;
        uint256 odd;
        uint256 amount;
        uint256 prospectiveIncome;
        uint256 Income;
        uint256 JoinTime;
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
        uint256 Income;
        uint256 Jointime;
        bool participation;
        bool settled;
        bool proceed;
        bool canceled;
    }

    // 构造器
    constructor(address _owner,uint _BettingId,string memory _topic, uint _numOfoptions, uint _bettingTime){
        owner = _owner;
        BettingId = _BettingId;
        BettingTopic = _topic;
        bettingstarts = block.timestamp;
        bettingEnds = block.timestamp + _bettingTime;
        currentOdd=new uint[](_numOfoptions);
        currentId=new uint[](_numOfoptions);
        currentPool=new uint[](_numOfoptions);
    }
    // constructor(uint _numOfoptions) {
    //     // minimumBet = _minimumBet;
    //     // maximumBet = _maximumBet;
    //     // bettingEnds = block.timestamp + _bettingTime;
    //     // betRatio = _betRatio;
    //     // BettingTopic = _topic;

    //     ended = false;
    //     currentOdd=new uint[](_numOfoptions);
    //     currentId=new uint[](_numOfoptions);
    // }
    
    function createOrder(address payable sender, uint optionSelected, uint oddSetted) public payable {

        //由于gas费后面的创建要求将会提高
        require(!ended , "Bet finsihed");
        require(msg.value > 100 , "Insufficient deposit");
        require(msg.value % oddSetted == 0, "The amount and the odd are not divisible");
        require(oddSetted > 0 && oddSetted < 100, "Beyond the ratio range");
        
        // 构建订单
        betOrders.push(BetOrder({
            id: betOrders.length + 1,
            // topic: BettingTopic,
            user: payable(sender),
            option: optionSelected,
            odds: oddSetted, //1=0.1倍 因为合约没有浮点数
            orderAmount: msg.value,
            betsPlacedAmount: (msg.value * 10) / oddSetted,
            prospectiveIncome: 0,
            Income: 0,
            Jointime: block.timestamp,
            participation: false,
            settled: false,
            proceed: false,
            canceled: false
        }));
        playerOrders[sender].push(betOrders.length);
        // 判断是否有订单
        if(currentOdd[optionSelected] == 0){
            currentOdd[optionSelected] = oddSetted;
            currentId[optionSelected] = betOrders.length;
            currentPool[optionSelected] = (msg.value * 10) / oddSetted;
        }
        // 判断是否是最高倍率订单
        else{
            if(oddSetted > currentOdd[optionSelected]){
               currentOdd[optionSelected] = oddSetted;
               currentId[optionSelected] = betOrders.length;
               currentPool[optionSelected] = (msg.value * 10) / oddSetted;
               }
        }
    }
    
    function placeBet(address payable sender,uint256 optionSelected) public payable {
        require(!ended , "Bet finsihed");
        require(betOrders.length > 0, "Array is empty");
        // require(currentId[optionSelected] > 0, "Invalid bet option ID");
        BetOrder storage betOrder = betOrders[currentId[optionSelected]-1];
        // require(!betOrder.settled, "already settled");
        require(!betOrder.proceed, "already proceed");
        require(msg.value > 0, "Invalid bet amount");
        require(msg.value <= betOrder.betsPlacedAmount, "Beyond the bet amount range");
        bets.push(Bet({
            id: bets.length + 1,
            //投注者地址，结算的时候打钱到这里
            user: payable(sender),
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
            JoinTime: block.timestamp,
            //是否结算
            settled :false,
            canceled: false
        }));

        playerBets[sender].push(bets.length);
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
                        betOrders[i].settled = true;
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
                betOrders[i].canceled = true;
            }
        }
        if(bets.length > 0){
            for(uint i = 0 ;i < bets.length;i++){
                payable(bets[i].user).transfer(bets[i].amount);
                bets[i].settled = true;
                bets[i].canceled = true;
            }
        }
        ended =true; 
    }
    /**
    * @dev 获取竞猜详情。
    * @return 竞猜标题和描述。
    */
    // function getbettingDetail() external view returns (string memory){
    //     return (description);
    // }
    function getbettingName() external view returns (string memory){
        return (BettingTopic);
    }

    // function getOrder(uint i) external view  returns (BetOrder memory){
    //     return (betOrders[i]);
    // }
    
    function getend() external view returns (bool){
        return (ended);
    }
    
    function getOdds() external view returns (uint256[] memory){
        // BetOrder memory order =betOrders[playerOrders[sender][i]];
        return (currentOdd);
    }
    function getPools() external view returns (uint256[] memory){
        // BetOrder memory order =betOrders[playerOrders[sender][i]];
        return (currentPool);
    }
    function getMyBetsOrder(address sender,uint i) external view returns (uint256[] memory ){
        BetOrder memory order = betOrders[playerOrders[sender][i]-1];
        uint256 result = 3;
        if(order.canceled == true){
            result = 2;
        }
        else{
            if(order.settled == true){
                result = 1;
            }
            else{
                result = 0;
            }
        }
        uint256[] memory info = new uint[] (7);
        info[0] = order.odds;
        info[1] = order.orderAmount;
        info[2] = order.prospectiveIncome;
        info[3] = order.option;
        info[4] = result;
        info[5] = order.Jointime;
        info[6] = bettingstarts;

        return (info);
    }
    function getMyBets(address sender,uint i) external view returns (uint256[] memory ){
        Bet storage bet =bets[playerBets[sender][i]-1];
        uint256 result = 3;
        if(bet.canceled == true){
            result = 2;
        }
        else{
            if(bet.settled == true){
                result = 1;
            }
            else{
                result = 0;
            }
        }
        uint256[] memory info = new uint[] (7);
        info[0] = bet.odd;
        info[1] = bet.amount;
        info[2] = bet.prospectiveIncome;
        info[3] = bet.betOption;
        info[4] = result;
        info[5] = bet.JoinTime;
        info[6] = bettingstarts;
        return (info);
    }


    // function getPlayerBet(address user) external view returns (uint256[] memory){
    //     return (playerBets[user]);
    // }
    // function getPlayerOrder(address user) external view returns (uint256[] memory){
    //     return (playerOrders[user]);
    // }
    
    // receive() external payable {

    // }

    // fallback() external  payable {}
        
    // function getAllBets() external view returns (Bet[] memory){
    //     return (bets);
    // }
    // function getAllOrders() external view returns (BetOrder[] memory){
    //     return (betOrders);
    // }
    // function getBet(uint i) external view returns (Bet memory){
    //     return (bets[i]);
    // }
    // function checkPlayerExists(address player) public view returns(bool) {
    //     for(uint i = 0; i < players.length; i++) {
    //         if(players[i] == player) return true;
    //     }
    //     return false;
    // }

}