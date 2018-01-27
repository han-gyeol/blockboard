const letters = document.querySelectorAll(".letter");
const mine = document.querySelector("#mine");
const ledger = document.querySelector("#ledger");

let oldResponse;

let ajax = () => {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     let newResponse = this.responseText;
     if(oldResponse == undefined){
     	oldResponse = newResponse;
     	let parsedResponse = JSON.parse(oldResponse);
     	for(let i=0; i<parsedResponse.length;i++){
     		let indexSelect = document.querySelector("#i" + i.toString());
     		if(parsedResponse[i].data.char == ' '){
     			indexSelect.textContent = "_";
     		}
     		else{
     		indexSelect.textContent = parsedResponse[i].data.char;
     		}
     	}
     	console.log(JSON.parse(oldResponse));
     }
     else if(oldResponse === newResponse){
     	return;
     }
     else{
     	let parsedNewResponse = JSON.parse(newResponse);
     	let parsedOldResponse = JSON.parse(oldResponse);
     	console.log("changed");

     	oldResponse = newResponse;
     	console.log(JSON.parse(oldResponse));
     }
    }
  };
  xhttp.open("GET", "https://hr-blockboard.herokuapp.com/api/board", true);
  xhttp.send();
}


let redirectMine = () => {
	location.href = "mine.html";
}

let redirectLedger = () => {
	location.href = "ledger.html";
}

mine.addEventListener("click", redirectMine);
ledger.addEventListener("click", redirectLedger);

window.onload=function(){
	setInterval('ajax()',1000);
}



// letters.forEach(letter => letter.addEventListener("click"))