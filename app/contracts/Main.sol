// SPDX-License-Identifier: MIT

import './Betting.sol';

pragma solidity ^0.8.0;

contract Main {
    
    address[] public Admins;
    address[] public GuessThemes;
    address[] public Owners;
    uint256[] public ThemeIds;
    string[] public ThemeNames;
    string[] public Descriptions;
    uint256[] public InitialPools;
    uint256[] public Odds;
    string[] public Images;
    string[] public Sources;

    // intial settings of the contract
    constructor(address[] memory _admins) {
        require(_admins.length > 0, 'At least one admin is required.');
        for (uint i = 0; i < _admins.length; i++) {         // add all admins to Admins array 以数组形式传Admins进去
            Admins.push(_admins[i]);
        }   
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
    function createGuessTHeme(
        string memory _topic,
        string memory _description,
        uint256 initial_pool,
        uint256 _odd,
        uint _numOfoptions,
        uint _maximumBet,
        uint _bettingTime,
        string memory _image,
        string memory _source) public {
        uint _BettingId = GuessThemes.length + 1;    

        Betting newTheme = new Betting(   
            msg.sender,
            _BettingId,
            _topic,
            _description,
            2,                          // 暂时把numOfOptions设为2  
            _maximumBet,
            _bettingTime
        );

        GuessThemes.push(address(newTheme));
        Owners.push(msg.sender);
        ThemeIds.push(_BettingId);
        ThemeNames.push(_topic);
        Descriptions.push(_description);
        InitialPools.push(initial_pool);
        Odds.push(_odd);
        Images.push(_image);
        Sources.push(_source);
    }

    // get all guess themes or user's themes
    function getGuessThemes(address user, uint offset, uint limit) public view returns (        // user设为address(0)就是get all themes
        uint[] memory ids, string[] memory names, string[] memory images) {                     // 输入user address就是get user's themes 
        uint end = offset + limit > ThemeIds.length ? ThemeIds.length : offset + limit;
        uint[] memory _ids = new uint[](end - offset);
        string[] memory _names = new string[](end - offset);
        string[] memory _images = new string[](end - offset);

        uint j = 0;
        for (uint i = offset; i < end; i++) {
            if (user == address(0) || Owners[i] == user) {
                _ids[j] = ThemeIds[i];
                _names[j] = ThemeNames[i];
                _images[j] = Images[i];
                j++;
            }
        }

        ids = new uint[](j);
        names = new string[](j);
        images = new string[](j);

        if (user != address(0)) {
            j = 0;
            for (uint i = 0; i < ThemeIds.length; i++) {
                if (Owners[i] == user) {
                    j++;
                }
            }
        }

        for (uint i = 0; i < j; i++) {
            ids[i] = _ids[i];
            names[i] = _names[i];
            images[i] = _images[i];
        }
    }
    
    // get theme details
    function getGuessThemeDetails(uint _ThemeId) public view returns (uint, string memory, string memory, uint256, uint256, string memory, string memory) {    // 暂定传ID
        uint _idx;
        for (uint i = 0; i < ThemeIds.length; i++) {
            if (ThemeIds[i] == _ThemeId) {
                _idx = i;
                break;
            }        
        }
        return (_ThemeId, ThemeNames[_idx], Descriptions[_idx], InitialPools[_idx], Odds[_idx], Images[_idx], Sources[_idx]);
    }
}