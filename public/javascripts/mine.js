const letters = document.querySelectorAll(".classes");
const letterBlk = document.querySelectorAll("#letterBlk");
const loader = document.querySelectorAll(".loader");
let oldResponse;
let latestBlock;

var buttonElement = document.getElementById('mineStartBtn');
var nameInput = document.getElementById('name');
var charInput = document.getElementById('char');
var indexInput = document.getElementById('indexSelect');
buttonElement.addEventListener('click', function () {
	buttonElement.value = 'Mining...';
	buttonElement.disabled = true;
	mineBlock(nameInput.value, charInput.value, (parseInt(indexInput.value) - 1).toString());
});

let ajax = () => {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let newResponse = this.responseText;

			let blockList = JSON.parse(newResponse);
			let max = -1;
			let maxIdx = 0;
			for (let i = 0; i < blockList.length; i++) {
				if (max < blockList[i]._id) {
					max = blockList[i]._id;
					maxIdx = i;
				}
			}
			latestBlock = blockList[maxIdx];

			if (oldResponse == undefined) {
				letterBlk[0].style.display = "block";
				loader[0].style.display = "none";
				oldResponse = newResponse;
				let parsedResponse = JSON.parse(oldResponse);
				for (let i = 0; i < parsedResponse.length; i++) {
					let indexSelect = document.querySelector("#i" + parsedResponse[i].data.index);
					if (parsedResponse[i].data.char == ' ') {
						indexSelect.textContent = "_";
					} else {
						indexSelect.textContent = parsedResponse[i].data.char;
					}
				}
				console.log(JSON.parse(oldResponse));
			} else if (oldResponse === newResponse) {} else {
				oldResponse = newResponse;
				let parsedResponse = JSON.parse(oldResponse);
				for (let i = 0; i < parsedResponse.length; i++) {
					let indexSelect = document.querySelector("#i" + parsedResponse[i].data.index);
					if (parsedResponse[i].data.char == ' ') {
						indexSelect.textContent = "_";
					} else {
						indexSelect.textContent = parsedResponse[i].data.char;
					}
				}
			}
		}
	};
	xhttp.open("GET", "https://hr-blockboard.herokuapp.com/api/board", true);
	xhttp.send();
}

let difficulty = 4;
let mineBlock = (name, char, index) => {
	console.log("Start Mining Block...");
	let newBlock = {
		"_id": parseInt(latestBlock._id) + 1,
		"previousHash": latestBlock.hash,
		"hash": "temp",
		"timestamp": getCurrentTime(),
		"nonce": 0,
		"data": {
			"name": name,
			"char": char,
			"index": index,
			"display": 1
		}
	}
	while (newBlock.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
		newBlock._id = parseInt(latestBlock._id) + 1;
		newBlock.previousHash = latestBlock.hash;
		newBlock.nonce++;
		newBlock.hash = calculateHash(newBlock);
	}

	var jsonData = {
		"previousHash": latestBlock.hash,
		"hash": newBlock.hash,
		"timestamp": getCurrentTime(),
		"nonce": newBlock.data.nonce,
		"name": newBlock.data.name,
		"char": newBlock.data.char,
		"index": newBlock.data.index
	}
	console.log("BLOCK MINED: " + jsonData);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "https://hr-blockboard.herokuapp.com/api/add_block", true);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(jsonData));

	buttonElement.value = 'Mine';
	buttonElement.disabled = false;
}

let calculateHash = (block) => {
	return sha256(block._id + block.previousHash + block.hash + block.timestamp + JSON.stringify(block.data) + block.nonce).toString();
}

let getCurrentTime = () => {
	let date = new Date();
	let day = date.getUTCDate();
	let month = date.getUTCMonth()+1;
	let year = date.getUTCFullYear();
	let hour = date.getUTCHours();
	let min = date.getUTCMinutes();
	let sec = date.getUTCSeconds();

	return day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;
}

window.onload = function () {
	setInterval('ajax()', 1000);
}