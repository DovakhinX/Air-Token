// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract AirToken is ERC20{

address private _admin;
bytes32 private root;
mapping(address=>bool)public _claimed;


 constructor(bytes32 _root) ERC20("AirToken", "ATK") {
         root=_root;    
        _admin=msg.sender;

        _mint(_admin, 50000 * 10 ** decimals());
    }

modifier onlyOwner(){
    require(msg.sender==_admin,"Your are not the owner");
    _;

}
//To increase supply of token
  function mint(address to, uint256 amount) external onlyOwner {
    _mint(to, amount);
  }


//Pre-determined qty of Token claim
function claim(address _claimer,bytes32 leaf,bytes32[] memory proof)public {
    require(MerkleProof.verify(proof,root,leaf),"Not an Exclusive Member");
    require(_claimed[_claimer]==false,"AirToken already claimed");
    uint amount=5000;

    _claimed[_claimer]=true;
    _transfer(_admin,_claimer,amount);
    
    

}





}



