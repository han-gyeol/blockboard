const letters = document.querySelectorAll(".classes");
const letterBlk = document.querySelectorAll("#letterBlk");
const loader = document.querySelectorAll(".loader");
let oldResponse;

let ajax = () => {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     let newResponse = this.responseText;
     if(oldResponse == undefined){
        letterBlk[0].style.display = "block";
        loader[0].style.display = "none";
     	oldResponse = newResponse;
     	let parsedResponse = JSON.parse(oldResponse);
     	for(let i=0; i<parsedResponse.length;i++){
     		let indexSelect = document.querySelector("#i" + parsedResponse[i].data.index);
     		if(parsedResponse[i].data.char == ' '){
                indexSelect.textContent = "_";
            }
            else{
            indexSelect.textContent = parsedResponse[i].data.char;
            }
     	}
     }
     else if(oldResponse === newResponse){
     	return;
     }
     else{
        oldResponse = newResponse;
        let parsedResponse = JSON.parse(oldResponse);
        for(let i=0; i<parsedResponse.length;i++){
            let indexSelect = document.querySelector("#i" + parsedResponse[i].data.index);
            if(parsedResponse[i].data.char == ' '){
                indexSelect.textContent = "_";
            }
            else{
            indexSelect.textContent = parsedResponse[i].data.char;
            }
        }
     }
    }
  };
  xhttp.open("GET", "https://hr-blockboard.herokuapp.com/api/board", true);
  xhttp.send();
}

// let difficulty = 1;
// let mineBlock = (name, char, index) => {
// 	let latestBlock = <%-JSON.stringify(latest_block)%>;
// 	let newBlock = {
// 		"_id": parseInt(latestBlock._id)+1,
// 		"previousHash": latestBlock.hash,
// 		"hash": "temp",
// 		"timestamp": Date.now(),
// 		"nonce": 0,
// 		"data": {
// 			"name": name,
// 			"char": char,
// 			"index": index,
// 			"display": 1
// 		}
// 	}
// 	while (newBlock.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
// 		newBlock.nonce++;
// 		newBlock.hash = calculateHash(newBlock);
// 	}

// 	console.log("BLOCK MINED: " + newBlock.hash);
// }

let calculateHash = (block) => {
	return sha256(block._id + block.previousHash + block.hash + block.timestamp + JSON.stringify(block.data) + block.nonce).toString();
}

window.onload=function(){
	setInterval('ajax()',1000);
}
