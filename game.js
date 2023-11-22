var buttonColours = ["red", "blue", "green", "yellow"];     // array for storing the colour ids of the buttons
var userClickedPattern = [];        // empty array for the user pattern created
var gamePattern = [];               // empty array for the game pattern generated
var gameStarted = false;    // initialising the game value
var level = 0;              // initialising the level value

// Detecting the keystrokes 
$(document).on("keydown", function () {
    if (!gameStarted) {             // condition for checking whether the game is started or not
        // $("#level-title").text("Level " + level);
        nextSequence();             // only the first keystroke will call the function and create the first game pattern
        gameStarted = true;         // the game value is changed so that other keystrokes don't trigger the function
    }
});

// Detecting the button clicks
$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");      // stores the id attribute of the button that got clicked.'this' keyword gives the identity of the object(button) that triggerred the click event
    userClickedPattern.push(userChosenColour);      // keeping track of the user click pattern by pushing the clicked button id at the end of the array userClickedPattern
    animatePress(userChosenColour);
    playSound(userChosenColour);
    var lastIndex = userClickedPattern.length - 1;      // storing the last index of the array to check the last item 
    checkAnswer(lastIndex);
});

// Function for creating a game pattern of buttons with animations and sounds
function nextSequence() {
    userClickedPattern = [];        // resetting the array every time the function is called for each new level
    level++;                        // incrementing the level value for each new level
    $("#level-title").text("Level " + level);                   // updating the h1 value for each new level
    var randomNumber = Math.round(Math.random() * 3);           // creates a random number between 0 - 3
    var randomChosenColour = buttonColours[randomNumber];       // generates a random colour id
    gamePattern.push(randomChosenColour);                       // pushes the item (randomChosenColour) at the end of the array gamePattern
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);      // creates the flash animation for the button with the id #randomChosenColour
    playSound(randomChosenColour);
}

// Function for playing the sound
function playSound(audioName) {
    var audio = new Audio("sounds/" + audioName + ".mp3");
    audio.play();
}

// Function for creating the click button animation
function animatePress(currentColour) {
    var activeButton = $("#" + currentColour);
    activeButton.addClass("pressed");
    setTimeout(function () {
        activeButton.removeClass("pressed");
    }, 100);    // the function gets executed after 100ms
}

// Function for checking the user pattern and the game pattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {       // checks the user and the game pattern for each sequence
        // console.log("success");
        if (userClickedPattern.length === gamePattern.length) {                 // checks if the user sequence is completed for the level
            setTimeout(function () {                                            // next game pattern is added after 1000ms
                nextSequence();
            }, 1000);
        }
    }
    else {                                          // if the user sequence is wrong
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

// Function for resetting the values of the variables when the game is restarted
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
