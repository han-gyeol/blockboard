const letters = document.querySelectorAll(".classes");
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
     		indexSelect.textContent = parsedResponse[i].data.char;
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






window.onload=function(){
	setInterval('ajax()',10000);
}