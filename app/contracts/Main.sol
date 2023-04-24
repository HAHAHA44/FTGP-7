// SPDX-License-Kdentifier: MIT

import './GuessTheme.sol';

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

    // login with metamask 备用
    // function login() public view returns (address) {
    //     return msg.sender;
    // }

    // create a guess theme
    function createGuessTheme(
        string memory _name,
        string memory _description,
        bool initial_pred,
        uint256 initial_pool,
        uint256 _odd
        ) public {
            GuessTheme newTheme = new GuessTheme(           // link to GuessTheme.sol
                msg.sender,
                _name,
                _description,
                initial_pred,
                initial_pool,
                _odd
            );
            GuessThemes.push(address(newTheme));
        }
    
    // get all guess themes
    function getAllGuessThemes() public view returns (address[] memory) {
        return GuessThemes;
    }

    // get user's guess themes
    function getUserGuessThemes() public view returns (address[] memory) {
        address[] memory userGuessThemes = new address[](GuessThemes.length);
        uint count = 0;
        for (uint i = 0; i < GuessThemes.length; i++) {
            GuessTheme theme = GuessTheme(GuessThemes[i]);
            if (theme.getOwner() == msg.sender) {
                userGuessThemes[count] = GuessThemes[i];
                count++;
            }
        }
        address[] memory result = new address[](count);
        for (uint i = 0; i < count; i++) {
            result[i] = userGuessThemes[i];
        }
        return result;
    }

    // get user's guess themes
    function getMyGuessThemes() public view returns (address[] memory) {
        address[] memory myGuessThemes = new address[](0);
        for (uint i = 0; i < GuessThemes.length; i++) {
            GuessTheme _theme = GuessTheme(GuessThemes[i]);
            if (_theme.getOwner() == msg.sender){               // need something like getOwner() in GuessTheme     
                myGuessThemes.push(address(_theme));
            }
        }
        return myGuessThemes;
    }

  
}
