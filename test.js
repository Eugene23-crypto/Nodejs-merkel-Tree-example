const Web3 = require("web3");
//################################### !important
const ethNetwork = 'https://rinkeby.infura.io/v3/a7fc0bfe71e64fec9242f58c72509208';
//###################################
const MerkelTree = require("./MerkelTree");
const TransactionList = require("./TransactionList");
const Transaction = require("./Transaction");
const {distribution,privateKeys} = require("./rewardDistribution2.json")

let transactionList = new TransactionList();
// I put the distributions in the transactions
for (const index in distribution) {
	transactionList.add(new Transaction({...distribution[index]}));
}
//I create an instance of merkle tree
const tree = new MerkelTree();

//I hydrate the merkle tree with the data
tree.createTree(transactionList.list);


async function reclaiming (index){
	const transaction = transactionList.get(index);
	const merkelProof = tree.getProof(transaction)
	try {
        const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
		console.log(web3) 
	}catch(e) {
        console.log("Connection Error!", e);
	}
}
reclaiming(5)
