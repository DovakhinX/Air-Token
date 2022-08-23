import React from 'react';
import "./Home.css";
import Airtoken from '../artifacts/contracts/AirToken.sol/AirToken.json';
import { ethers } from "ethers";

function Home(){
    
    let airtokenAdd="0x5FbDB2315678afecb367f032d93F642f64180aa3";
    let row=1;

    async function claim(){
        if (typeof window.ethereum !== "undefined") {
          let provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts",[]);
          const account = accounts[0];
          let signer = provider.getSigner();
          let airtoken=new ethers.Contract(airtokenAdd,Airtoken.abi,signer);
          let claim=await airtoken.claim(account);
          console.log(`Airtoken claimed by ${account} `);
          let funds=await airtoken.balanceOf(account);
          console.log(`Funds claimed by ${funds} `);
          let table=document.getElementById("tab");
          let newRow=table.insertRow(row);
          let cell1=newRow.insertCell(0);
          let cell2=newRow.insertCell(1);
          cell1.innerHTML=account;
          cell2.innerHTML=funds;
          row++; 
      }
    }
    
    

     
    

    return(
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
      <br/>
      <button onClick={claim}>Claim Your Token</button>
      </div>



        )
}

export default Home;
