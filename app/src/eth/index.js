import { ethers } from "ethers";
import CoinFlipArtifact from "../artifacts/contracts/CoinFlip.sol/CoinFlip.json"
import MainArtifact from "../artifacts/contracts/Main.sol/Main.json"
import Addresses from "../artifacts/contract-address.json";
import { getCat } from "../utils";

const address = Addresses.Main;

// async function _initializeEthers() {
//     // We first initialize ethers by creating a provider using window.ethereum
//     this._provider = new ethers.providers.Web3Provider(window.ethereum);

//     // Then, we initialize the contract using that provider and the token's
//     // artifact. You can do this same thing with your contracts.
//     this._token = new ethers.Contract(
//         contractAddress,
//         CoinFlipArtifact.abi,
//         this._provider.getSigner(0)
//     );
// }

export async function connect() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // use this way to wake up metamask.
    const accounts = await provider.send("eth_requestAccounts", []);
    const account = accounts[0];
    return account;
  } else {
    alert("Please install MetaMask");
  }
}

export async function disconnect() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error('Failed to logout from MetaMask', error);
    }
  };
}

export async function createGuessTheme(value, name, desc, duration, source) {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, MainArtifact.abi, signer);
    try {
      let overrides = {
        value: ethers.utils.parseUnits(value + "", "gwei")
      };

      console.log("create theme", name,
      desc,
      duration,
      source,
      overrides);
      const ret = await contract.createGuessTheme(
        name,
        desc,
        duration,
        source,
        // overrides
      );
      console.log(ret);
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Please install MetaMask");
  }
}

function formatGuessThemes(data) {
  let l = data[0];
  let odd = data[1];
  let pool = data[2];
  let ended = data[3];
  ;
  let ret = [];
  for (let i = 0; i < l.length; i++) {
    let cur = l[i];
    ret.push({
      noOdd: odd[i][0].toNumber(),
      yesOdd: odd[i][1].toNumber(),
      noPool: ethers.utils.formatUnits(pool[i][0], 'gwei').toString(),
      yesPool: ethers.utils.formatUnits(pool[i][1], 'gwei').toString(),
      desc: cur.Descriptions,
      name: cur.ThemeNames,
      source: cur.Sources,
      startTime: new Date(cur.startTime.toNumber() * 1000).toLocaleString("en-US"),
      id: cur.id.toNumber(),
      img: getCat(cur.id.toNumber()),
      ended: ended[i],
    });
  }
  return ret;
}

export async function getGuessThemes(offset, limit) {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, MainArtifact.abi, signer);
    try {
      const themes = await contract.getGuessThemes(offset, limit);
      const ret = formatGuessThemes(themes);
      console.log(themes, ret);
      return ret;
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Please install MetaMask");
  }
}

export async function createOrder(value, betId, option, odd) {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, MainArtifact.abi, signer);
    try {
      let overrides = {
        value: ethers.utils.parseUnits(value + "", "gwei"),
        gasLimit: 30000000,
      };
      console.log("do create order", value, betId, option, odd);
      const res = await contract.createOrder(
        betId,
        option,
        odd,
        overrides);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Please install MetaMask");
  }
}

export async function placeBet(value, betId, option) {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, MainArtifact.abi, signer);
    try {
      let overrides = {
        value: ethers.utils.parseUnits(value + "", "gwei"),
        gasLimit: 30000000,
      };
      console.log("do place bet",value, betId, option);
      const res = await contract.placeBet(betId, option, overrides);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Please install MetaMask");
  }
}

function formatMyBets(data) {
  const ret = [];
  for (let i = 0; i < data.length; i++) {
    let cur = data[i];
    ret.push({
      name: cur.ThemeNames,
      odd: cur.odds.toNumber(),
      amounts: ethers.utils.formatUnits(cur.amounts, "gwei"),
      income: ethers.utils.formatUnits(cur.prospectiveIncome, "gwei"),
      prediction: cur.option.toNumber(),
      result: cur.result.toNumber(),
      joinTime: new Date(cur.joinTime.toNumber() * 1000).toLocaleString("en-US"),
      createTime: new Date(cur.createTime.toNumber() * 1000).toLocaleString("en-US"),
      isBanker: cur.isBanker,
    });
  }
  return ret;
}


export async function myBets() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, MainArtifact.abi, signer);
    let myBetList;
    try {
      const retMyBets = await contract.MyBets();
      myBetList = formatMyBets(retMyBets)
      console.log(retMyBets, myBetList);
    } catch (error) {
      console.log(error);
    }
    return myBetList;
  } else {
    alert("Please install MetaMask");
  }
}

export async function settle(betId, option) {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, MainArtifact.abi, signer);
    try {
      let overrides = {
        gasLimit: 30000000,
      };
      console.log("do settle bet", betId, option);
      const res = await contract.settle(betId, option, overrides);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Please install MetaMask");
  }
}

export async function cancel(betId) {
  if (typeof window.ethereum !== "undefined") {
    let overrides = {
      gasLimit: 30000000,
    };
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, MainArtifact.abi, signer);
    try {
      console.log("do cancel bet", betId);
      const res = await contract.cancel(betId, overrides);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Please install MetaMask");
  }
}

const toBeExported = {
  connect,
  createGuessTheme,
  getGuessThemes,
}

window.eee = toBeExported;