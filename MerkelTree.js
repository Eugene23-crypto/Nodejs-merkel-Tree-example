
const sha256 = require("./helper");
const util = require("util");

class MerkelTree {
	constructor() {
		this.root = [];
	}
	/**
	 * Takes a list of transaction as input and
	 * @param {TransactionList} transactionList
	 */
	createTree(transactionList) {
		this.root.unshift(transactionList);
		this.root.unshift(transactionList.map(t => t.hash));

		while (this.root[0].length > 1) {
			let temp = [];
			for (let index = 0; index < this.root[0].length; index += 2) {
				if (index < this.root[0].length - 1 && index % 2 == 0)
					temp.push(sha256(this.root[0][index] + this.root[0][index + 1]));
				else temp.push(this.root[0][index]);
			}
			this.root.unshift(temp);
		}
	}

	/*I review the merkle proof that I saw in the contract,
	I understood that it was an array containing the merkel nodes
	that must be concatenated to verify the thing so
	my function returns its nodes from the merkle tree*/
	getProof(transaction) {
		const proof = []
		let position = this.root.slice(-1)[0].findIndex(t => t.hash == transaction.hash);
		if (position) {
			let verifyHash = transaction.getHash();
			for (let index = this.root.length - 2; index > 0; index--) {
				let neighbour = null;
				if (position % 2 == 0) {
					neighbour = this.root[index][position + 1];
					position = Math.floor((position) / 2);
					proof.push(neighbour);
				}
				else {
					neighbour = this.root[index][position - 1];
					proof.push(neighbour);
					position = Math.floor((position - 1) / 2);
				}
			}
			return proof;
		}
		else {
			console.log("Data not found with the id");

		}
	}
}

module.exports = MerkelTree;

