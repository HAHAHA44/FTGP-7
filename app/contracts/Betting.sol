// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Betting {
    //合约构造参数
    address public owner;
    uint public totalBets;
    uint public minimumBet;
    uint public maximumBet;
    uint public bettingEnds;
    bool public ended;
    
    //订单和下注单对象数组
    // BetOption[] public betOptions;
    BetOrder[] public betOrders;
    //mapping(address => BetOrder[]) public betOrders;
    mapping(address => uint256) public balances;
    Bet[] public bets;
    //mapping(address => Bet[]) public bets;
    //当前的个选项倍率和订单ID
    uint[] public currentOdd; 
    uint[] public currentId;

    //暂时没用
    //address[] public players;
    //address payable[] public players;
    //mapping(address => uint) public playerBets;
    //address payable[] public winners;
    // uint public totalAmount;
    // uint public winningAmount;


    struct Bet {
        uint256 id;
        address payable user;
        address payable banker;
        uint256 betOption;
        uint256 betOrderId;
        uint256 odd;
        uint256 amount;
        uint256 prospectiveIncome;
        bool settled;
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
        //uint256 ids;
        uint option;
        address payable user;
        uint256 odds;
        uint256 totalBetAmount;
        uint256 betsPlacedAmount;
        uint256 prospectiveIncome;
        uint256 maxIncome;

        bool settled;
        bool proceed;
    }

    // 暂时有点用的构造器
    // constructor(uint _minimumBet, uint _maximumBet, uint _bettingTime, uint _numOfoptions)
    constructor(uint _numOfoptions) {
        owner = msg.sender;
        // minimumBet = _minimumBet;
        // maximumBet = _maximumBet;
        // bettingEnds = block.timestamp + _bettingTime;
        // betRatio = _betRatio;
        ended = false;
        currentOdd=new uint[](_numOfoptions);
        currentId=new uint[](_numOfoptions);
    }
    
    function createOrder(uint optionSelected, uint oddSetted) public payable {
        require(msg.value > 10, "Insufficient deposit");

        require(msg.value % oddSetted == 0, "The amount and the odd are not divisible");
        //require(oddSetted < 0 && oddSetted > 10, "Beyond the ratio range");
        
        // 构建订单
        betOrders.push(BetOrder({
            id: betOrders.length + 1,
            //id: betOrders[msg.sender].length + 1,
            //ids:betOrders.length + 1,
            user: payable(msg.sender),
            option: optionSelected,
            odds: oddSetted,
            totalBetAmount: msg.value,
            betsPlacedAmount:msg.value/oddSetted,
            prospectiveIncome:0,
            maxIncome:(msg.value/oddSetted)*97/100, // 3% commission
            settled: false,
            proceed: false
        }));
        // 判断是否有订单
        if(currentOdd[optionSelected]==0){
            currentOdd[optionSelected]=oddSetted;
            currentId[optionSelected] = betOrders.length;
        }
        // 判断是否是最低倍率订单
        else{
            if(oddSetted < currentOdd[optionSelected]){
               currentOdd[optionSelected] = oddSetted;
               currentId[optionSelected] = betOrders.length;
               }
        }
        

        //emit createOrder(betOrders.length,optionSelected, oddSetted);
    }
    
    function placeBet(uint256 optionSelected) public payable {
        require(currentId[optionSelected] > 0, "Invalid bet option ID");
        BetOrder storage betOrder = betOrders[currentId[optionSelected]-1];
        require(!betOrder.settled, "Bet Order already settled");
        require(!betOrder.settled, "Bet Order already proceed");
        require(msg.value > 0, "Invalid bet amount");
        require(msg.value < betOrder.betsPlacedAmount, "Beyond the bet amount range");
        // balances[msg.sender] += msg.value;
        bets.push(Bet({
            id: bets.length + 1,
            //投注者地址，结算的时候打钱到这里
            user: payable(msg.sender),
            //庄家地址，结算的时候打钱到这里
            banker:payable(betOrder.user),
            //投注者的订单ID
            betOrderId: betOrder.id,
            //投注者的选择
            betOption: optionSelected,
            //订单的倍率
            odd: betOrder.odds,
            //下注金额
            amount: msg.value,
            //预计收益
            prospectiveIncome: msg.value * betOrder.odds*97/100,
            settled :false
        }));
        betOrder.prospectiveIncome += msg.value;
        betOrder.betsPlacedAmount -= msg.value;
        // if(betOrder.betsPlacedAmount == 0){
        //     betOrder.proceed = true;
        //     //遍历找到下一个最低倍率的订单(还没搓)
        //     currentId[optionSelected] = betOrder.id;
        // }
    }
    //结算

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