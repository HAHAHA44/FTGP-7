# FTGP-7

## Quick Start

First of all, because this application is running on Nodejs, Nodejs is necessary to be installed. We can download Nodejs from [here](https://nodejs.org/en/download).

Install the dependencies.

```
cd app
npm install
```

Once the dependencies are installed, we can run testing network with Hardhat:

```
npx hardhat node
```

We can import the test accounts to Metamask to use these accounts now.

Moreover, you can add some accounts as administrator accounts for FishBet, just modify the file `app/admins.json .`

Then open a new terminal, run the following script to deploy the contracts.

```
npx hardhat run scripts/deploy.js --network localhost
```

Now we can run the frontend react application.

```
npm start
```

Open http://localhost:3000/ on browser to see the webpage.


## How to use it

The first step is to login to your Metamask wallet. Click the button on the top right to login.

There are 4 pages in the app, homepage, create theme page, my bet page and admin page.

### Home page

This page shows all the themes. If you have not create a theme, this page is empty. For each theme, you can click the triangle button to show the detail and join the handicap. If there are no banker now, every button will be 'joining as banker.' If there is a banker on your choice, you can click the button to join the handicap. If you are not satisified with current odd, you can be an host too with clicking 'join as banker' button.

Be caution, if you want to join as a banker, confirm that the pool is divisible by the odd.


### Create Theme page

In create theme page, you can create a theme (only need gas fee).


### My Bets page

When you connect to your account, you can click the account button, there will be 2 item, the first one is 'MyBets'. It will show all the bets you participated. If you join one theme for betting multiple times, there will be multiple items with the same theme name.

IsBanker, FinalOption = 1, Prediction = 1, Result = Lose

IsBanker, FinalOption = 0, Prediction = 1, Result = Win

IsBanker, FinalOption = 0, Prediction = 0, Result = Lose

IsBanker, FinalOption = 1, Prediction = 0, Result = Win


NotBanker, FinalOption = 1, Prediction = 1, Result = Win

NotBanker, FinalOption = 0, Prediction = 1, Result = Lose

NotBanker, FinalOption = 0, Prediction = 0, Result = Win

NotBanker, FinalOption = 1, Prediction = 0, Result = Lose


### Admin page

Admin page is hidden, you can enter the page with explore the url directly: http://localhost:3000/#/admin

There are 3 options for each not ended theme, which are settling as yes, settling as no and cancel the theme respectively.
