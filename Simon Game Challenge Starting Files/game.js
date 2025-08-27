var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
function makeSound(colour){
    var audio = new Audio("./sounds/" + colour + ".mp3");
    audio.play();
}
var started = false;
var level = 0;
$(".btn").click(function(){
    var buttonClicked = $(this).attr("id");
    userClickedPattern.push(buttonClicked);
    $("#" + buttonClicked).fadeOut(100).fadeIn(100);
    makeSound(buttonClicked);
    checkAnswer(userClickedPattern.length - 1);
});
$(document).keydown(function(event) {
    if(!started){
        started = true;
        nextSequence();
    }
});

function nextSequence(){
    userClickedPattern = [];
    $("h1").text("Level " + level);
    var rand = Math.floor(Math.random()*4);
    var colour = buttonColours[rand];
    gamePattern.push(colour);
    $("#" + colour).fadeOut(100).fadeIn(100);
    makeSound(colour);
    level++;
}

function checkAnswer(ind){
    if(userClickedPattern[ind] === gamePattern[ind]){
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        makeSound("wrong");
        level = 0;
        gamePattern = [];
        started = false;
        $("h1").text("Game Over, Press any Key to restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
    }
}