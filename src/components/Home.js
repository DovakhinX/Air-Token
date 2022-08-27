import "./Home.css";
import React from "react";
import { ethers } from "ethers";
import Airtoken from "../artifacts/contracts/AirToken.sol/AirToken.json";
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
global.Buffer = global.Buffer || require("buffer").Buffer; // To solve buffer depreciated issue (BS:-/)

function Home() {
  let airtokenAdd = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  let row = 1;
  let amount = 5000;

  let whitelist = [
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ];

  let leafs = whitelist.map((leaf) => keccak256(leaf));
  let tree = new MerkleTree(leafs, keccak256, { sortPairs: true });

  async function claim() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      const accounts = await provider.send("eth_requestAccounts", []);
      const account = accounts[0];
      let trialLeaf = keccak256(account);
      let proof = tree.getHexProof(trialLeaf);
      const airtoken = new ethers.Contract(airtokenAdd, Airtoken.abi, signer);
      const claiming = await airtoken.claim(account, trialLeaf, proof);
      console.log(`Airtoken claimed by ${account} `);
      const table = document.getElementById('tab');
      const newRow = table.insertRow(row);
      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      cell1.innerHTML = account;
      cell2.innerHTML = amount;
      row++;
    }
  }

  return (
    <div className="home">
      <h2>Air Tokens Claimed</h2>
      <table id="tab" className="data">
        <tbody>
          <tr>
            <th>Claimed Address</th>
            <th>Amount</th>
          </tr>
        </tbody>
      </table>
      <br />
      <button onClick={claim}>Claim Your Token</button>
    </div>
  );
}

export default Home;
