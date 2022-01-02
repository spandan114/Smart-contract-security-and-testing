// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;
import 'hardhat/console.sol'; //For debuging

contract Token{
    string public name = "Hard hat";
    string public symbol = "HHT";
    uint public supply = 1000*10*100;
    address public owner;

    mapping(address=>uint) balances;

    constructor(){
         balances[msg.sender]=supply;
         owner = msg.sender;
    } 

    function transfer(address to,uint amount) public {
        // console.log("** %s token transfer to %s **",amount,to);
        require(balances[msg.sender] >= amount,"You dont have enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function getBalance(address _account) public view returns(uint){
       return balances[_account];
    }

}