const SHA256 = require("crypto-js/sha256");

let block = {
    "_id": 0,
    "previousHash": "",
    "hash": "",
    "timestamp": "27/1/2018 06:49:48",
    "nonce": "0",
    "data": {
        "name": "god",
        "char": "R",
        "index": "0",
        "display": 1
    }
}

let calculateHash = (block) => {
	return SHA256(block._id + block.previousHash + block.hash + block.timestamp + JSON.stringify(block.data) + block.nonce).toString();
}

console.log(calculateHash(block));