// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GuessTheme {
    
    // Struct for a single bet
    struct Bet {
        address bettor; 
        uint256 amount;
        bool choice; 
    }
    
    // Struct for a single theme
    struct Theme {
        string name; 
        string description; 
        address creator; 
        uint256 totalPool; 
        uint256 odd; 
        bool status; 
        mapping(address => Bet) bets; 
    }
    
    // Mapping of theme ID to Theme struct
    mapping(uint256 => Theme) public themes; 
    
    // Counter for theme IDs
    uint256 public themeCounter; // 竞猜主题的ID计数器
    
    // Event for new theme creation
    event ThemeCreated(uint256 indexed id, string name, address creator); 
    
    // Event for new bet
    event BetPlaced(uint256 indexed id, address indexed bettor, uint256 amount, bool choice); 
    
    // Event for theme settlement
    event ThemeSettled(uint256 indexed id, address indexed winner, uint256 payout); 
    
    // Constructor
    constructor() {
        // Initialize state variables
        themeCounter = 0; 
    }
    
    // Function to create a new theme
    function createTheme(string memory _name, string memory _description, uint256 _odd) public {
        // Increment the theme counter
        themeCounter++; 
        
        // Create a new Theme struct and add it to the mapping
        Theme storage newTheme = themes[themeCounter]; 
        newTheme.name = _name; 
        newTheme.description = _description; 
        newTheme.creator = msg.sender; 
        newTheme.totalPool = 0; 
        newTheme.odd = _odd; 
        
            newTheme.status = true; 
    emit ThemeCreated(themeCounter, _name, msg.sender); 
}

    // Function to place a bet on a theme
    function createBet(uint256 _themeId, bool _choice) public payable {
        Theme storage theme = themes[_themeId]; 
    
        require(theme.status == true, "Theme is not open for betting"); // 检查竞猜主题是否开放
    
        Bet storage bet = theme.bets[msg.sender]; 
    
        require(msg.value > 0, "Bet amount must be greater than 0"); 
        require(bet.amount == 0, "Bet already placed"); 
    
        bet.bettor = msg.sender; 
        bet.amount = msg.value; 
        bet.choice = _choice; 
    
        theme.totalPool += msg.value; 
    
        emit BetPlaced(_themeId, msg.sender, msg.value, _choice); // 表示有新的下注
    }

    // Function for theme settlement by creator
    function settleTheme(uint256 _themeId, bool _winningChoice) public {
        Theme storage theme = themes[_themeId]; 
    
        require(msg.sender == theme.creator, "Only theme creator can settle the theme"); 
        require(theme.status == true, "Theme is not open for settlement"); 
    
        theme.status = false;
    
        uint256 totalWinningPool = 0; 
        uint256 totalLosingPool = 0; 
    
        // Loop through all bets and calculate total pools for winning and losing choices
        for (uint256 i = 1; i <= themeCounter; i++) {
            Bet storage bet = themes[i].bets[msg.sender];
            if (bet.choice == _winningChoice) {
                totalWinningPool += bet.amount;
            } else {
                totalLosingPool += bet.amount;
            }
            delete themes[i].bets[msg.sender]; 
        }

        require(totalWinningPool > 0, "Total winning pool is zero");
    
        uint256 creatorFee = (theme.totalPool * 5) / 100; // 计算竞猜主题的创建者的手续费
        uint256 winningPayout = ((totalLosingPool + totalWinningPool - creatorFee) * theme.odd) / totalWinningPool; // 计算获胜者的总奖金
    
        //theme.status = ThemeStatus.Settled;
        //theme.winningChoice = _winningChoice;
        //theme.creatorFee = creatorFee;
        //theme.totalPool = totalWinningPool + totalLosingPool;
        //theme.winnersPayout = winningPayout;

        
    }   
}