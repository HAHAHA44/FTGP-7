// SPDX-License-Identifier: MIT

import './Betting.sol';
pragma solidity ^0.8.0;


contract Main {

    address[] public GuessThemes;
    ThemesDetail[] private ThemesDetails;

    //mapping(address => address[]) public Betaddresses; // Betaddresses 使用映射，什么地址发出的请求获得其地址的下注信息
    mapping(address => uint[]) public playerOrders; // playerOrders 使用映射，什么地址发出的请求获得其地址的下庄信息
    mapping(address => uint[]) public playerBets;

    address[] public Admins;

    // intial settings of the contract
    constructor(address[] memory _admins) {
        require(_admins.length > 0, 'admin required.');
        for (uint i = 0; i < _admins.length; i++) {         // add all admins to Admins array 以数组形式传Admins进去
            Admins.push(_admins[i]);
        }
    }

    struct BetDetail {
        string ThemeNames;
        uint odds;
        uint amounts;
        uint256 prospectiveIncome;
        uint option;
        uint result;
        uint joinTime;
        uint createTime;
    }

    struct ThemesDetail {
        address GuessThemes;
        address Owners;
        string ThemeNames;
        string Descriptions;
        string Sources;
        uint startTime;
        uint endTime;
        uint id;
    }

    // check if is an admin
    modifier checkAdmin() {
        bool isAdmin = false;
        for (uint i = 0; i < Admins.length; i++) {
            if (msg.sender == Admins[i]) {
                isAdmin = true;
                break;
            }
        }
        require(isAdmin, 'Your account has no permission.');
        _;
    }

    //  add a new admin 备用
    // function addAdmin(address _Admin) public checkAdmin{
    // }

    // remove an existing admin 备用
    // function removeAdmin(address _Admin) public checkAdmin{
    // }
    
    // create a guess theme
    function createGuessTheme(
        string memory _topic,
        string memory _description,
        uint _bettingTime,
        string memory _source) public {   
        uint _BettingId = GuessThemes.length;    
        Betting newTheme = new Betting(   
            msg.sender,
            _BettingId,
            _topic,
            2,                          // 暂时把numOfOptions设为2  
            _bettingTime
        );
        
        GuessThemes.push(payable(address(newTheme)));

        ThemesDetails.push(ThemesDetail({
            GuessThemes:address(newTheme),
            Owners: msg.sender,
            ThemeNames: _topic,
            Descriptions: _description,
            Sources: _source,
            startTime: block.timestamp,
            endTime:  block.timestamp + _bettingTime,
            id: _BettingId
        }));

        
    }


    // get all guess themes or user's themes
    function getGuessThemes( uint offset, uint limit) external view returns (ThemesDetail[] memory, uint[][] memory,uint[][] memory){
        uint end = offset + limit > GuessThemes.length ? GuessThemes.length : offset + limit;
        uint length = offset > end ? 0 : end - offset;
        ThemesDetail[] memory ThemesDetails_part = new ThemesDetail[](length);
        uint[][] memory odds_part = new uint[][](length);
        uint[][] memory pools_part = new uint[][](length);
       
        uint j = 0;
        for (uint i = offset; i < end; i++) {
            odds_part[j] = Betting(ThemesDetails[i].GuessThemes).getOdds();
            pools_part[j] = Betting(ThemesDetails[i].GuessThemes).getPools();
            ThemesDetails_part[j]= ThemesDetails[i];
            j++;
        }
        return (ThemesDetails_part,odds_part,pools_part);
    }

    function createOrder(uint BetSelected, uint optionSelected, uint oddSetted) public payable {

        address payable target = payable(GuessThemes[BetSelected]); // 目标合约地址
        Betting(target).createOrder{value: msg.value}(payable (msg.sender),optionSelected,oddSetted); 
        playerOrders[msg.sender].push(BetSelected);
    }
    function placeBet(uint BetSelected, uint256 optionSelected) public payable {
        address payable target = payable(GuessThemes[BetSelected]);
        Betting(target).placeBet{value: msg.value}(payable (msg.sender) ,optionSelected); 
        playerBets[msg.sender].push(BetSelected);
    }

    function settle(uint BetSelected, uint256 optionSelected) public payable checkAdmin() {
        address payable target = payable(GuessThemes[BetSelected]);
        Betting(target).settle(optionSelected);
    }

    function cancel(uint BetSelected) public payable checkAdmin() {
        address payable target = payable(GuessThemes[BetSelected]);
        Betting(target).cancel();
    }


    function MyBets ()  external view returns (BetDetail[] memory){
        uint Orderslength = 0;
        uint betslength = 0;
        for (uint i =0; i<playerOrders[msg.sender].length;i++){
            Orderslength += Betting(GuessThemes[playerOrders[msg.sender][i]]).getplayerOrderslength(msg.sender);
        }
        for (uint i =0; i<playerBets[msg.sender].length;i++){
            betslength += Betting(GuessThemes[playerBets[msg.sender][i]]).getplayerBetslength(msg.sender);
        }


        BetDetail[] memory BetDetails = new BetDetail[](Orderslength+betslength);
        uint index = 0;
        for(uint i=0;i<playerOrders[msg.sender].length;i++){
            string memory name = Betting(GuessThemes[playerOrders[msg.sender][i]]).getbettingName();
            for(uint j = 0;j<Betting(GuessThemes[playerOrders[msg.sender][i]]).getplayerOrderslength(msg.sender);j++){
                uint[] memory info = Betting(GuessThemes[playerOrders[msg.sender][i]]).getMyBetsOrder(msg.sender,j);
                BetDetails[index] = BetDetail({
                ThemeNames: name,
                odds:info[0],
                amounts:info[1],
                prospectiveIncome:info[2],
                option:info[3],
                result:info[4],
                joinTime:info[5],
                createTime:info[6]
                });
            index += 1;
            }
        }
        for(uint i=0;i<playerBets[msg.sender].length;i++){ 
            for(uint j = 0; j<Betting(GuessThemes[playerBets[msg.sender][i]]).getplayerBetslength(msg.sender);j++){
                uint[] memory info = Betting(GuessThemes[playerBets[msg.sender][i]]).getMyBets(msg.sender,j);
                BetDetails[index] = BetDetail({
                ThemeNames: Betting(GuessThemes[playerBets[msg.sender][i]]).getbettingName() ,
                odds:info[0],
                amounts:info[1],
                prospectiveIncome:info[2],
                option:info[3],
                result:info[4],
                joinTime:info[5],
                createTime:info[6]
                });
            index += 1;
            }
           
        }
        
        return (BetDetails);
    }
}
