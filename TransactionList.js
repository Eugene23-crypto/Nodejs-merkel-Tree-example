class TransactionList {
	constructor() {
		this.list = [];
	}
    get(index){
        return this.list[index]
    }
	add(transaction) {
		this.list.push(transaction);
	}
}

module.exports = TransactionList;