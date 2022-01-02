const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Token contract', () => {

    var owner;
    var address1;
    var address2;
    var address;
    var Token;
    var hardhatToken;
    beforeEach(async ()=>{
        [owner,address1,address2,...address] = await ethers.getSigners();
        Token = await ethers.getContractFactory("Token"); //create instance
        hardhatToken = await Token.deploy();//Deploy contract
    })

    describe('Deployment', () => {
        it("Should set the right owner", async ()=>{
            expect(await hardhatToken.owner()).to.equal(owner.address)
          })
        it("After deployment all token should be assign to the owner", async ()=>{
            const ownerBalance = await hardhatToken.getBalance(owner.address)//get owner balance 1000*10*100
            expect(await hardhatToken.supply()).to.equal(ownerBalance)
          })
    })

    describe('Transfer token', () => {
        it("Token should transfer between accounts ", async ()=>{
          //Transfer 10 token from owner to address1
          await hardhatToken.transfer(address1.address,10);
          expect(await hardhatToken.getBalance(address1.address)).to.equal(10)
        //   await hardhatToken.connect(address1).transfer(address2.address,5);
        //   expect(await hardhatToken.getBalance(address2.address)).to.equal(5)
        })
        it("Should fail if user doesn't have enough token ", async ()=>{
           const initialBalance = await hardhatToken.getBalance(owner.address);
           await expect(hardhatToken.connect(address2).transfer(owner.address,2)).to.be.revertedWith("You dont have enough tokens")
           expect(await hardhatToken.getBalance(owner.address)).to.equal(initialBalance);
        })
        it("Should update balance after transfer", async ()=>{
            const initialBalance = await hardhatToken.getBalance(owner.address);
            await hardhatToken.transfer(address1.address,10);
            await hardhatToken.transfer(address2.address,10);
            const finalBalance = await hardhatToken.getBalance(owner.address);
            expect(finalBalance).to.equal(initialBalance-20);
            expect(await hardhatToken.getBalance(address1.address)).to.equal(10);
            expect(await hardhatToken.getBalance(address2.address)).to.equal(10);
         })
    })
    
})


