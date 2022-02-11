const crypto = require("crypto");


function hash(data) {
	return data != null? 
		crypto.createHash("sha256").update(data.toString()).digest("hex"):
		"";
}


module.exports = hash;