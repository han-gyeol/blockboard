let table = document.getElementById("myTable");
let oldResponse;
let id = 0;


let createRow = (id, hash,name,char,index,timestamp) => {
	let row = table.insertRow(1);
    let idCell = row.insertCell(0);
    let hashCell = row.insertCell(1);
    let nameCell = row.insertCell(2);
    let charCell = row.insertCell(3);
    let indexCell = row.insertCell(4);
    let timestampCell = row.insertCell(5);
    idCell.innerHTML = id;
    hashCell.innerHTML = hash;
    nameCell.innerHTML = name;
    charCell.innerHTML = char;
    indexCell.innerHTML = index;
    timestampCell.innerHTML = timestamp;
}

// let checkArrayDifferent = (oldRes, newRes) => {
// 	for (let i = 0, l=old.length; i < l; i++) {
// 		if (oldRes[i] != newRes[i]){
//             return i;   
//         }           
//     }   
// }

let ajax = () => {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     let newResponse = this.responseText;
     if(oldResponse == undefined){
     	oldResponse = newResponse;
     	let parsedResponse = JSON.parse(oldResponse);
     	for(; id<parsedResponse.length;id++){
     		console.log(parsedResponse);
     		if(table.rows.length > 5){
     			table.deleteRow(5);
     		}
     		let temp = parsedResponse[id];
     		createRow(temp._id, temp.hash, temp.data.name, temp.data.char, temp.data.index, temp.timestamp);
     	}
     }
     else if(oldResponse === newResponse){
     	return;
     }
     else{

     	if(table.rows.length > 5){
     		table.deleteRow(5);
     	}
     	let parsedResponse = JSON.parse(oldResponse);
        // let parsedOldResponse = JSON.parse(oldResponse);
        // let parsedNewResponse = JSON.parse(newResponse);
        // let indexChange = checkArrayDifferent(parsedOldResponse, parsedNewResponse);
        // let temp = parsedResponse[indexChange];
        let temp = parsedResponse[id];
     	createRow(temp._id, temp.hash, temp.data.name, temp.data.char, temp.data.index, temp.timestamp);

     }
    }
  };
  xhttp.open("GET", "https://hr-blockboard.herokuapp.com/api/board", true);
  xhttp.send();
}

window.onload=function(){
	setInterval('ajax()',1000);
}