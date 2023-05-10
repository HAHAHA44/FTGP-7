// SPDX-License-Identifier: MIT

import './Betting.sol';

pragma solidity ^0.8.0;

contract Main {
    
    address[] public GuessThemes;
    address[] public Owners;
    string[] public ThemeNames;
    ThemesDetail[] private ThemesDetails;

    //mapping(address => address[]) public Betaddresses; // Betaddresses 使用映射，什么地址发出的请求获得其地址的下注信息
    mapping(address => uint[]) public playerOrders; // playerOrders 使用映射，什么地址发出的请求获得其地址的下庄信息
    mapping(address => uint[]) public playerBets;

    // intial settings of the contract
    constructor(address[] memory _admins) {
        // require(_admins.length > 0, 'At least one admin is required.');
        // for (uint i = 0; i < _admins.length; i++) {         // add all admins to Admins array 以数组形式传Admins进去
        //     Admins.push(_admins[i]);
        // }   
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
        
    }

    // check if is an admin
    // modifier checkAdmin() {
    //     bool isAdmin = false;
    //     for (uint i = 0; i < Admins.length; i++) {
    //         if (msg.sender == Admins[i]) {
    //             isAdmin = true;
    //             break;
    //         }
    //     }
    //     require(isAdmin, 'Your account has no permission.');
    //     _;
    // }

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
        uint _BettingId = GuessThemes.length + 1;    
        Betting newTheme = new Betting(   
            msg.sender,
            _BettingId,
            _topic,
            _description,
            2,                          // 暂时把numOfOptions设为2  
            _bettingTime,
            _source
        );
        
        GuessThemes.push(payable(address(newTheme)));

        ThemesDetails.push(ThemesDetail({
            GuessThemes:address(newTheme),
            Owners: msg.sender,
            ThemeNames: _topic,
            Descriptions: _description,
            Sources: _source,
            startTime: block.timestamp
        }));

        
    }


    // get all guess themes or user's themes
    function getGuessThemes( uint offset, uint limit) external view returns (ThemesDetail[] memory, uint[][] memory){
        uint end = offset + limit > GuessThemes.length ? GuessThemes.length : offset + limit;
        uint length = offset > end ? 0 : end - offset;
        ThemesDetail[] memory ThemesDetails_part = new ThemesDetail[](length);
        uint[][] memory odds_part = new uint[][](length);
       
        uint j = 0;
        for (uint i = offset; i < end; i++) {
             odds_part[j] = Betting(ThemesDetails[i].GuessThemes).getOdds();
            ThemesDetails_part[j]= ThemesDetails[i];
            j++;
        }
        return (ThemesDetails_part, odds_part);
    }
    // get all guess themes or user's themes
    // function getGuessThemes(address user, uint offset, uint limit) public view returns (        // user设为address(0)就是get all themes
    //     uint[] memory ids, string[] memory names, string[] memory images) {                     // 输入user address就是get user's themes 
    //     uint end = offset + limit > GuessThemes.length ? GuessThemes.length : offset + limit;
    //     string[] memory _names = new string[](end - offset);
    //     string[] memory _images = new string[](end - offset);

    //     uint j = 0;
    //     for (uint i = offset; i < end; i++) {
    //         if (user == address(0) || Owners[i] == user) {
    //             _names[j] = ThemeNames[i];
    //             j++;
    //         }
    //     }

    //     ids = new uint[](j);
    //     names = new string[](j);

    //     if (user != address(0)) {
    //         j = 0;
    //         for (uint i = 0; i < GuessThemes.length; i++) {
    //             if (Owners[i] == user) {
    //                 j++;
    //             }
    //         }
    //     }

    //     for (uint i = 0; i < j; i++) {
    //         names[i] = _names[i];
    //         images[i] = _images[i];
    //     }
    // }
    
   // get theme details
    // function getGuessThemeDetails(uint _ThemeId) public view returns (uint, string memory, string memory, uint256, uint256, string memory, string memory) {    // 暂定传ID
    //     uint _idx;
    //     for (uint i = 0; i < ThemeIds.length; i++) {
    //         if (ThemeIds[i] == _ThemeId) {
    //             _idx = i;
    //             break;
    //         }        
    //     }
    //     return (_ThemeId, ThemeNames[_idx], Descriptions[_idx], InitialPools[_idx], Odds[_idx], Images[_idx], Sources[_idx]);
    // }

    function createOrder(uint BetSelected, uint optionSelected, uint oddSetted) public payable {

        address payable target = payable(GuessThemes[BetSelected]); // 目标合约地址
        // uint256 amount = msg.value;     // 需要转移的 ETH 数量

        // 将 ETH 转移到目标合约
        // target.transfer(amount);
        // (bool success, ) = target.call{value: amount}("");
        // require(success, "Transfer failed");

        // 调用目标合约的方法
        // (bool success2, ) = target.call{value: amount}(abi.encodeWithSignature("createOrder(payable address,uint,uint)",msg.sender, optionSelected, oddSetted));
        // require(success2, "Method call failed");
        Betting(target).createOrder{value: msg.value}(payable (msg.sender),optionSelected,oddSetted); //后可改成地址搜索
        playerOrders[msg.sender].push(BetSelected);
    }
    function placeBet(uint BetSelected, uint256 optionSelected) public payable {
        address payable target = payable(GuessThemes[BetSelected]); // 目标合约地址
        uint256 amount = msg.value;     // 需要转移的 ETH 数量

        // 将 ETH 转移到目标合约
        target.transfer(amount);
        Betting(GuessThemes[BetSelected]).placeBet{value: msg.value}(payable (msg.sender) ,optionSelected); //后可改成地址搜索
        playerBets[msg.sender].push(BetSelected);
    }


    function MyBets ()  external view returns (BetDetail[] memory){
        BetDetail[] memory BetDetails = new BetDetail[](playerOrders[msg.sender].length+playerBets[msg.sender].length);
        uint index = 0;
        for(uint i=0;i<playerOrders[msg.sender].length;i++){ 
            uint[] memory info = Betting(GuessThemes[playerOrders[msg.sender][i]]).getMyBetsOrder(msg.sender,i);
            BetDetails[index] = BetDetail({
                ThemeNames: Betting(GuessThemes[playerOrders[msg.sender][i]]).getbettingName() ,
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
        for(uint i=0;i<playerBets[msg.sender].length;i++){ 
            uint[] memory info = Betting(GuessThemes[playerBets[msg.sender][i]]).getMyBets(msg.sender,i);
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
        
        return (BetDetails);
    }
}
