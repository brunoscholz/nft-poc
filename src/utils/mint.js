const NFT = artifacts.require("NFT");

module.exports = async function (cb) {
  const nft = await NFT.deployed();
  console.log('Token fetched: ', nft.address)
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0])

  try {
    await nft.mint(
      "QmSrMqymH3rGKw2f9uQkncwmdouL483VDo5V2Bivps5cZs",
      "100000000000000000"
    );
    console.log("minted your NFT");
  } catch (e) {
    console.log("Failed to mint ", e);
  }

  cb();
};
