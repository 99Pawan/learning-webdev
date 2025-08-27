var randomNumber1 = (Math.floor(Math.random() * 6 )) + 1;
var randomNumber1Source = "./images/" + "dice" + randomNumber1 + ".png";

var randomNumber2 = (Math.floor(Math.random() * 6 )) + 1;
var randomNumber2Source = "./images/" + "dice" + randomNumber2 + ".png";

document.querySelectorAll("img")[0].setAttribute("src", randomNumber1Source);
document.querySelectorAll("img")[1].setAttribute("src", randomNumber2Source);

if(randomNumber1 > randomNumber2){
    document.querySelector("h1").textContent = "🎲Player 1 wins!";
}
else if(randomNumber2 > randomNumber1){
    document.querySelector("h1").textContent = "Player 2 wins!🎲";
}
else{
    document.querySelector("h1").textContent = "It's a tie!";
}