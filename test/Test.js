
const {ethers} = require('hardhat');
const {MerkleTree} = require('merkletreejs');
const keccak256 = require('keccak256');

describe('AirToken Trial', function() {
  it('Airtoken contract is deployed and exclusive members can clain tokens',
      async function() {
        const whitelist = [
          '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
          '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
          '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
        ];

        const leafs = whitelist.map((leaf) => keccak256(leaf));
        const tree = new MerkleTree(leafs, keccak256, {sortPairs: true});
        const buf2hex = (x) => '0x' + x.toString('hex');
        const root = buf2hex(tree.getRoot());

        const [owner, member1, member2, member3] = await ethers.getSigners();
        const AirToken = await ethers.getContractFactory('AirToken');
        const airtoken = await AirToken.deploy(root);

        await airtoken.deployed();
        console.log(`AirToken is deployed to  ${airtoken.address}`);

        const trialLeaf = keccak256(member2.address);
        const proof = tree.getHexProof(trialLeaf);

        const claimToken = await airtoken.claim(member2.address, trialLeaf,
            proof);
        console.log(`Token claimed by ${member2.address}`);

        const funds = await airtoken.balanceOf(member2.address);
        console.log(`AirToken balance of member ${funds}`);

        const mint = await airtoken.mint(owner.address, 10000);
        console.log('Additional tokens minted to owner');
        const funds2 = await airtoken.balanceOf(owner.address);
        console.log(`AirToken balance of owner ${funds2}`);
      });
});
