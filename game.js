 var buttonColours=["red","blue","yellow","green"];
var gamePattern=[];
var userClickedPattern = [];
var level=0;
var started = false;
$('.btn').click(function(){
  var chosenColour=$(this).attr("id");
  userClickedPattern.push(chosenColour);

  playSound(chosenColour);
  animatePress(chosenColour);
  //to get index of user inpur pattern
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSquence();
    started = true;
  }
});


function nextSquence()
{
  userClickedPattern=[];
level++;
$("#level-title").text("Level " + level);
    var random = Math.floor((Math.random())*4);

var randomColour= buttonColours[random];
 gamePattern.push(randomColour);
 $("#"+ randomColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomColour);
 animatePress(randomColour);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3" );
  audio.play();
}
function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}
//to check the answer
function checkAnswer(currentlevel)
{
  if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
    console.log("sucess");
    if(gamePattern.length===userClickedPattern.length)
    {
      setTimeout(function(){
        nextSquence();
      },1000);
    }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  //animataion for wrong
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },2000);
  $("#level-title").text("game over, press Any key to Start");
  startOver();
  }
}
function startOver(){
level=0;
gamePattern=[];
started=false;
}