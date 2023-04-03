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

Then open a new terminal, run the following script to deploy the contracts.

```
npx hardhat run scripts/deploy.js --network localhost
```

Now we can run the frontend react application.

```
npm start
```

Open http://localhost:3000/ on browser to see the webpage. 



