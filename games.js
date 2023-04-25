var buttonChar = ["akali", "ahri", "miss", "vayne"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// Starting game
$(document).keydown(function(){
    if(!started){
        $("#level-title").text(`Level: ${level}`);
        nextSequence();
        started = true;
    }
});

// General Simon says
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level: ${level}`);

    // Simon says logic
    var randNum = Math.round(Math.random()*3);
    var randChar = buttonChar[randNum];
    gamePattern.push(randChar);
    $(`#${randChar}`).fadeOut(250).fadeIn(250);
    playSound(randChar);
    
}

//Checking answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("pass");

        //Let user finish sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
        
    } else {
        console.log("fail");

        playSound("defeat");
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over!, Press A Key to Restart");

        startOver();
    }
}

// Clicking button
$(".btn").click(function(){
    if (started) {
        var userChosenChar = this.id;   
        userClickedPattern.push(userChosenChar);

        playSound(userChosenChar);
        animatePress(userChosenChar);

        checkAnswer(userClickedPattern.length -1);
    } else {
        startOver();
    }
    
}); 

//Restart Game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Playing sound
function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// Animate the press of button
function animatePress(currentChar) {
    $(`#${currentChar}`).addClass("pressed");

    setTimeout(() => {
        $(`#${currentChar}`).removeClass("pressed")
    }, 100);
}


