const letterBlk = document.querySelectorAll("#letterBlk");
const mine = document.querySelector("#mine");
const ledger = document.querySelector("#ledger");
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


let redirectMine = () => {
	location.href = "mine";
}

let redirectLedger = () => {
	location.href = "ledger";
}

mine.addEventListener("click", redirectMine);
ledger.addEventListener("click", redirectLedger);

window.onload=function(){
	setInterval('ajax()', 2000);
}

