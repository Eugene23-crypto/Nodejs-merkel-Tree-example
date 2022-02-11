const sha256 = require("./helper");

class Transaction {
	constructor({index, address, amount}) {
		this.index = index;
		this.address = address;
		this.amount = amount;
		//this.id = Transaction.getCount();
		this.hash = sha256(this.index + this.address + this.amount);
		//Transaction.incrementCount();
	}

	/*static getCount() {

		return Transaction.count;
	}

	static incrementCount() {
		Transaction.count++;
	}*/

	getHash() {
		return sha256(this.index + this.address + this.amount);
	}

	toString() {
		return `
        to:${this.index}
        from:${this.address}
        amount:${this.amount}
        hash:${this.hash}`
	}
}

//Transaction.count = 0;

module.exports = Transaction;

