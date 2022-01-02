async function main(){
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token"); //create instance
    const hardhatToken = await Token.deploy();//Deploy contract
    console.log("contract address :", hardhatToken.address)
}

main()
.then(()=>process.exit(0))
.catch(err=>{
    console.log(err)
    process.exit(1)
})