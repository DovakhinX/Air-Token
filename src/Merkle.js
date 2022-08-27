const {MerkleTree} = require('merkletreejs');
const keccak256 = require('keccak256');

const whitelist = [
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', // Last digit being qty
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906', // Last digit being qty
  '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', // Last digit being qty
];

const leafs = whitelist.map((leaf) => keccak256(leaf));
const tree = new MerkleTree(leafs, keccak256, {sortPairs: true});
const buf2hex = (x) => '0x' + x.toString('hex');
const root = buf2hex(tree.getRoot());
console.log(root);
const qty = 1;
const trialLeaf = keccak256('0xace085582F7C1E692Bb5610c7920683d45a27Af7' + qty);
const proof = tree.getHexProof(trialLeaf);
// console.log(buf2hex(trialLeaf));
// console.log(trialLeaf);
// console.log(proof);

console.log(tree.verify(proof, trialLeaf, root));
