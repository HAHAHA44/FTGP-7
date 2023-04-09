- [Decentralized vs. Centralized](#decentralized-vs-centralized)
- [Similar DApps](#similar-dapps)
  - [Augur](#augur-httpaugurnet)
  - [Gonsis](#gonsis-httpswwwgnosisio)
  - [EARNBET](#earnbet-httpsearnbetio)
  - [Polymarket](#polymarket-httpspolymarketcom)
  - [PlotX](#plotx)
- [Summary](#summary)


## Decentralized vs. Centralized
Centralized applications are usually referred to as general betting platforms. The main advantage of DApps is that forgery is impossible, but there are still many shortcoming like:
1. Insufficient processing speed and capacity, which is not as good as centralized Apps and is controlled by gas 
2. Lack of liquidity, i.e. the number of blockchain platform users itself is relatively small 

## Similar DApps
DApp themes on gussing side are mainly about sports, esports, etc. The gambling side includes diffierent kinds of dice games, card games, etc. There is also a DApp where users are able to post bounty.

### Augur (http://augur.net/)
**Augur** is a relatively large decentralized betting platform, mainly providing variety of sports themes, but also some political themes such as *WETHER TRUMP WILL BE RE-ELECTED*. Augur allows users to create their own themes, i.e. creating markets, basically the same idea as woat we aim to do.

- **Logic of Betting**  
Augur takes the idea of stock trading but not just betting.For example, there is a theme called *IT WILL RAIN TOMORROW*, the current price $0.7 means the market believes that the probability of *IT WILL RAIN TOMORROW* is 70%. The price, also the probability, may change over time and users are allowed to sell at any time or keep until the theme can be judged. The price will be $1 if the theme really happens.  
Some good points are trading is all for free and totally transparent, the odds are clear and no commission, the platform only earns trading fees and users can bet on whether the probability of the theme will rise in addition to betting on the outcome. The downside in my opinion is that the market may be manipulated as users can provide liquidity to the market and the large entry may just be creating a break from the market. In short, it has all the problems stock trading has.  
More information can be found [here](https://help.augur.net/trading-guide/how-to-trade).

- **Themes Publication and Validation**  
In Augur, users can publish themes through **Augur Pro** and need to write or customize their own contracts, and verifiable results are not limited. Validation confirms the event through a third party source and an arbitration mechanism is available to verify the results.

- **Profit Model**  
Augur claims to be a "NO FOR PROFIT" platform, with the main revenue being the transaction and the arbitration fees. Users are not charged for publishing themes and there are no drawback fees on the platform.

- **Supplements**  
Augur is a decentralized oracle and peer to peer protocol for prediction markets. Augur is free, public, open source software, portions of which are licensed under the General Public License (GPL) and portions of which are licensed under the Massachusetts Institute of Technology (MIT) license. Augur is a set of smart contracts written in Solidity that can be deployed to the Ethereum blockchain.  
More information about the description above can be found [here](https://augur.net/faqs). Also attach a link to the relevant code: https://github.com/AugurProject/augur.

### Gonsis (https://www.gnosis.io/)
**Gonsis** was originally proposed in 2015 as a concept similar to **Augur**, which later evolved into **Gonsis Chain** (A sidechain that aims to address many of the scaling challenges of the Ethereum blockchain, and is the associated execution-layer EVM (Ethereum Virtual Machine) chain for stable transactions). This part of the description can be found at https://www.kraken.com/en-gb/learn/what-is-gnosis-gno.  
Gonsis has released a number of basic tools during its development including Safe, CoW Protocol, Conditional Tokens, Gonsis Aution and Zodiac, of which [**Conditional Tokens**](https://docs.gnosis.io/conditionaltokens/) is Gonsis' prediction markets, which is basically what we're looking for. It's more of a tutorial for posting markets than a direct hands-on trading site.

- **Logic of Betting**  
It is more of a futures trading concept than guessing and gambling, with the platform acting as a market maker.  
If a user invests $6 in the event *IT WILL RAIN TOMORROW*, the user will receive 6 tokens representing that it will rain tomorrow and 6 tokens that it will not, which can be traded between users e.g. 6 no rain tokens for 4 rain tokens, with the correct result giving back money, so if it rains tomorrow the user can exchange $10.  
The complexity of this logic is that it takes into account the correlation between the two markets and, like Augur, is likely to be writing a real exchange market. Here is the [link](https://docs.gnosis.io/conditionaltokens/docs/introduction1/) for more information.

- **Themes Publication and Validation**  
From the [official description](https://docs.gnosischain.com/), the issuance of Conditional Tokens is particularly simple, it's the kind that sets a dichotomous result and the user doesn't have to write their own contract. It seems to have introduced a credit mechanism for validation, as well as tools such as Multisig, Emergency Stop, etc., all of which can be found in the document above.

- **Profit Model**  
As we all know so for is that users pay to create a market.

- **Supplements**  
Feeling that Gonsis is very developer friendly, with all kinds of code tutorials available. Click [here](https://www.youtube.com/watch?v=uZNWq07Y4Ag) to get a YouTube tutorial.

### EARNBET (https://earnbet.io/)
**EARNBET** is a licensed online gambling platform and what se can learn from it is the UI and some of the gameplay.

- **About UI**  
The Home Page is a very simple and clear partition with just six games and all the bets synced in real time underneath.

- **About Function**  
There is a leaderboard rewards feature that might be considered to entice users to post topics through rewards. For validation of results there is a description in the [Q&A](https://blog.earnbet.io/en/faq/) that users can validate results on the blockchain.

### Polymarket (https://polymarket.com/)
**Polymarket** is ostensibly a guessing platform focused on political or economic events, but in reality it is a platform for guessing everything. Basically, it covers everything we thought of, such as posting own themes, partitions, providing sources of verification, etc.

- **Logic of Betting**  
Same as **Augur**.

- **Themes Publication and Validation**  
Polymarket does not offer the function to customise themes, users can only suggest themes to the platform and the administrator is responsible for publishing them.  
The platform offers three categories of market: secondary (yes/no); optional (category 1, category 2, ...); and range (50M - 100M, etc.), with a description of the topic provided by the publisher, as well as a public verification link and contracts, and even a comment society. Here is an [example](https://polymarket.com/event/john-wick-chapter-4-opening-weekend).

- **Profit Model**  
Free for publishing themes but being charged if themes happen. And also the transaciton fee.

- **Supplements**  
This should be the only one of the platforms that is closest to what we want to do and can be seen directly how to achieve it, which means less room for improvement, except to say that the trading fee is relatively high at 2.5%.

### PlotX
**PlotX** has links to the [App](https://plotx.io/) and the [platform](https://v2.plotx.io/market), which is a gussing game platform featuring cryptocurrency price predictions, ball game result betting and NFT betting.

- **Logic of Betting**  
Divided into **Forecasts** and **Challenges** sections to earn points for guessing the results, here are some introductions:
  - **Forecasts** is to guess whether the price of a currency will go up or down, choose your own currency and choose the time, the web version will show the price fluctuations directly.
  - **Challenges** is the match prediction category, which asks a few small questions such as who won and who scored to give options, gives a source for verification, and ends with the settlement of points.

- **Themes Publication and Validation**  
After the platform has been revamped to the App, the Q&A place is nowhere to be found and the instructions cannot be seen.

- **Profit Model**  
Also the transaction fee.

## Summary
1. **PlotX** is a form of guessing the outcome and winning points, which is relatively simple and clear but no code is provided; **Augur** and **Polymarket** both swap probabilities for stock trading models; **Gonsis Conditional Tokens** focuses on predicting outcomes with a futures concept.
2. The most complete of all the themes on the release, apart from some Apps using third-party sites that provide accurate results (prices, ball games), is **Polymarket**, which sets the form of the results and also lets the user provide a verification link.
3. The profitability of several platforms relies mainly on fees in trading, with various details on the fees charged on theme releases.
A big problem is that these products are relatively complete, giving us less room for functional improvement or innovation, and the hard problems of blockchain guessing platforms, such as low liquidity and complicated operation, cannot be solved by adjusting the DApp's functions.  


One thing can be thought of is reducing the number of contracts to increase the speed of processing, or perhaps setting up a bit short gussing themes like in **PlotX**, not sure if that would be more attractive.
