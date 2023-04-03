import {
    connect,
    check,
    bet,
    guess,
    reveal
} from "../eth/index";
import { useState } from "react";


export function CoinFlip() {

    const [input, setInput] = useState(0);
    const [psw, setPsw] = useState(1);

    const onCheck = () => {
        check();
    }

    const onConnect = () => {
        connect();
    }

    const onBet = () => {
        bet();
    }

    const onGuess = () => {
        guess();
    }

    const onReveal = () => {
        reveal();
    }

    const handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    return (
      <div className="container">
        <h1>Coin Guess</h1>
        <label id="accountLabel">Account: None</label>

        <div></div>

        <button id="connectButton" onClick={onConnect}>Connect</button>
        
        <div></div>

        <label id="resultLabel">No Bet</label>

        <div></div>

        <button id="reloadButton" onClick={onCheck}>Reload</button>

        <div></div>

        <select id="selectionInput" onchange={(event) => {setInput(event.target.value)}}>
            <option>Heads</option>
            <option>Tails</option>
        </select>

        Password:
        <input type="integer" id="passwordInput" value={psw} onChange={(event) => {setPsw(event.target.value)}}></input>

        <div></div>

        <button id="betButton" type="button" onClick={onBet}>Bet</button>
        <button id="guessButton" onClick={onGuess}>Guess</button>
        <button id="revealButton" onClick={onReveal}>Reveal</button>
      </div>
    );
  }