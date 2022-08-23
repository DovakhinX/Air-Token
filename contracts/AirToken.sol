// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract AirToken is ERC20{

address private _admin;
uint[] public _allotedAmount;
address[] public _whiteListAddress;
mapping(address=>bool)public _claimed;


 constructor() ERC20("AirToken", "ATK") {
        _admin=msg.sender;
        _mint(_admin, 50000 * 10 ** decimals());
    }


function addWhiteListAddress(address _add,uint _amt) public{
    require(_amt!=0,"Amount is zero");
    _whiteListAddress.push(_add);
    _allotedAmount.push(_amt);

}

function claim(address _claimer)public {
    require(_claimed[_claimer]==false,"AirToken already claimed");
    uint index;
    uint amount;

    for(uint i=0;i<_whiteListAddress.length;i++){
        if(_whiteListAddress[i]==_claimer){
            index=i;//For getting matching amount from amount array
        }
    }
    require(_claimer==_whiteListAddress[index],"Not exclusive member");
    _claimed[_claimer]=true;
    amount=_allotedAmount[index];
    _transfer(_admin,_claimer,amount);
    

}





}



