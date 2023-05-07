// SPDX-License-Kdentifier: MIT

import './Betting.sol';

pragma solidity ^0.8.0;

contract Main {
    
    address[] public Admins;
    address[] public GuessThemes;

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
        string memory _name,
        string memory _description,
        uint256 initial_pool,
        uint256 _odd,
        uint _options,
        string memory _image,
        string memory _source) public {
        uint256 guess_id = GuessThemes.length + 1;          // create a guess id automatically and transform it into 8-digit string
        bytes32 myBytes32 = bytes32(guess_id);
        bytes memory myBytes = abi.encodePacked(myBytes32);
        string memory guess_id_str = string(myBytes);
        while (bytes(guess_id_str).length < 8) {
            guess_id_str = string(abi.encodePacked('0', guess_id_str));
        }
        
        Betting newTheme = new Betting(          // create a new Betting contract
            msg.sender,
            guess_id_str,
            _name,
            _description,
            initial_pool,
            _odd,
            _options,
            _image,
            _source
        );
        GuessThemes.push(address(newTheme));
     }
    
    // get adresss of all guess themes 备用
    // function getAllGuessThemesAds() public view returns (address[] memory) {
    //     return GuessThemes;
    // }
    
   // get all guess themes
    function getAllGuessThemes() public view returns (string[] memory) {
        string[] memory allGuessThemes = new string[](GuessThemes.length);      // store required details of guess themes
        for (uint i = 0; i < GuessThemes.length; i++) {
            Betting _theme = Betting(GuessThemes[i]);
            allGuessThemes[i] = _theme.getBriefDetails();            // need something like getBriefDetails() in Betting
        }
        return allGuessThemes;          //string[] 套 string[]，每个小的string[]是一个theme的信息
    }

    // get addresses of user's guess themes
    function getMyGuessThemesAds() internal view returns (address[] memory) {       // 暂定internal
        address[] memory myGuessThemes = new address[](0);
        for (uint i = 0; i < GuessThemes.length; i++) {
            Betting _theme = Betting(GuessThemes[i]);
            if (_theme.getOwner() == msg.sender){               // need something like getOwner() in Betting    
                myGuessThemes.push(address(_theme));
            }
        }
        return myGuessThemes;
    }
    
    // get user's guess themes
    function getMyGuessThemes() public view returns (string[] memory) {
        address[] memory myGuessThemes = getMyGuessThemesAds();
        string[] memory myGuessThemesBrief = new string[](myGuessThemes.length);
        for (uint i = 0; i < myGuessThemes.length; i++) {
            Betting _theme = Betting(myGuessThemes[i]);
            myGuessThemesBrief[i] = _theme.getBriefDetails();
        }
        return myGuessThemesBrief;          // string[]
    }

  // get all details of a guess theme
    function getGuessThemeDetails(address _guessTheme) public view returns (string memory) {   // 需要传入一个address
        Betting _theme = Betting(_guessTheme);
        return _theme.getDetails();         // string[]
    }
}
