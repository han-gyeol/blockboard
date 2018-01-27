const letters = document.querySelectorAll(".letter");
const mine = document.querySelector("#mine");
const ledger = document.querySelector("#ledger");




let redirectMine = () => {
	location.href = "mine.html";
}

let redirectLedger = () => {
	location.href = "mine.html";
}

mine.addEventListener("click", redirectMine);
ledger.addEventListener("click", redirectLedger);


// letters.forEach(letter => letter.addEventListener("click"))