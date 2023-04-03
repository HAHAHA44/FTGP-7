import { ethers } from "ethers";
import CoinFlipArtifact from "../artifacts/contracts/CoinFlip.sol/CoinFlip.json"
import Addresses from "../artifacts/contract-address.json";

const address = Addresses.CoinFlip;

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

async function connect() {
	if (typeof window.ethereum !== "undefined") {
		try {
			await window.ethereum.request({ method: "eth_requestAccounts" });
		} catch (error) {
			console.log(error);
		}
		document.getElementById("connectButton").innerHTML = "Connected";
		const accounts = await window.ethereum.request({ method: "eth_accounts" });
		document.getElementById("accountLabel").innerHTML = "Account: " + accounts;
		console.log(accounts);
	} else {
		alert("Please install MetaMask");
	}
}

async function check() {
	if (typeof window.ethereum !== "undefined") {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(address, CoinFlipArtifact.abi, signer);
		try {
			const p1 = await contract.player1();
			const p2 = await contract.player2();
			if (p1 == "0x0000000000000000000000000000000000000000") {
				document.getElementById("resultLabel").innerHTML = "No bet";
			} else if (p2 == "0x0000000000000000000000000000000000000000") {
				const value = await contract.bet();
				document.getElementById("resultLabel").innerHTML = "Bet made, value:" + value;
			}
			else {
				document.getElementById("resultLabel").innerHTML = "Bet taken. Waiting for reveal.";
			}
		} catch (error) {
			console.log(error);
		}
	} else {
		alert("Please install MetaMask");
	}
}

async function collectValues() {
	var selection = document.getElementById("selectionInput").value;
	if (selection == "Heads") {
		selection = 0;
	} else {
		selection = 1;
	}
	var pass = document.getElementById("passwordInput").value;

	return [selection, pass];
}

async function bet() {
	if (typeof window.ethereum !== "undefined") {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(address, CoinFlipArtifact.abi, signer);
		try {
            console.log("start bet");
			const vals = await collectValues();
			const selection = vals[0];
			const password = vals[1];
			const hash = await contract.getHash(selection, password);
			console.log(vals, hash);
			await contract.makeBet(hash, { value: ethers.utils.parseEther("1") });
		} catch (error) {
			console.log(error);
		}
	} else {
		alert("Please install MetaMask");
	}
}

async function guess() {
	if (typeof window.ethereum !== "undefined") {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(address, CoinFlipArtifact.abi, signer);
		try {
			const vals = await collectValues();
			const selection = vals[0];
			console.log(selection);
			await contract.takeBet(selection, { value: ethers.utils.parseEther("1") });
		} catch (error) {
			console.log(error);
		}
	} else {
		alert("Please install MetaMask");
	}
}

async function reveal() {
	if (typeof window.ethereum !== "undefined") {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(address, CoinFlipArtifact.abi, signer);
		try {
			const vals = await collectValues();
			const selection = vals[0];
			const password = vals[1];
			console.log(vals);
			await contract.reveal(selection, password);
		} catch (error) {
			console.log(error);
		}
	} else {
		alert("Please install MetaMask");
	}
}

export {
	connect,
	check,
	bet,
	guess,
	reveal
};