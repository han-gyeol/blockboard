const letters = document.querySelectorAll(".classes");
let oldResponse;

let ajax = () => {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     let newResponse = this.responseText;
     if(oldResponse == undefined){
     	oldResponse = newResponse;
     	console.log(JSON.parse(oldResponse));
     }
     else if(oldResponse === newResponse){
     	return;
     }
     else{
     	parsedNewResponse = JSON.parse(newResponse);
     	parsedOldResponse = JSON.parse(oldResponse);
     	oldResponse = newResponse;
     	return;
     }
    }
  };
  xhttp.open("GET", "https://hr-blockboard.herokuapp.com/api/board", true);
  xhttp.send();
}






window.onload=function(){
	setInterval('ajax()',10000);
}