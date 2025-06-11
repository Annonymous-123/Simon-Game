//Declaring the variables
var level=0;
var gamestarted=false;
var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];

//For getting the random sequence of buttons with animation
function nextSequence(){
    gamestarted=true;
    userClickedPattern=[];
    level++;
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level "+level);
    // console.log(gamePattern);

}
//For getting the sequence of buttons user clicked
$( ".btn" ).click(function() {
   var userChosenColour= $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(this);
   checkAnswer(userClickedPattern.length);
   // console.log(userClickedPattern);
   }
);

//For playing the sounds corresponding to the buttons
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

//Animation on clicking the buttons
function animatePress(currentColour){
    $(currentColour).addClass("pressed");
    setTimeout(function(){
        $(currentColour).removeClass("pressed");
    }, 100)
}
//Detecting the starting of game with keypress
$(document).keydown(function(){
   if (gamestarted==false){
        nextSequence();
        $("h1").text("Level "+level);
   }
  });

//Checking the answer and giving alert on wrong answer
function checkAnswer(currentLevel){
  
    if(gamePattern[currentLevel-1]===userClickedPattern[currentLevel-1]){
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(nextSequence, 1000);
         }
        }
    else{
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $(document.body).addClass("game-over");
        setTimeout(function(){
        $(document.body).removeClass("game-over");
        },200)
        startOver();
        }
       
    }
//Restaring the game after wrong answer
    function startOver(){
      gamestarted=false;
      level=0;
      gamePattern=[];
   }
