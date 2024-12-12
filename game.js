// Ensure jQuery is loaded
$(document).ready(function() {

  var level = 0;
  var userClickedPattern = [];
  var audioPlayed = false;
  var buttonColours = ["red", "blue", "green", "yellow"];


  var randomChosenColour;
  var gamePattern = [];



  $(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress($(this));
    if(checkAnswer(userClickedPattern.length-1)){
      if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){nextSequence()},1000);
        userClickedPattern=[];
      }
    }else{
      playSound('wrong');
      $('body').addClass('game-over');
      setTimeout(function(){
        $('body').removeClass('game-over');
      },200);
      $('#level-title').text("Game Over, Press Any Key to Restart");
      startOver();
      console.log("wrong");

    }
    console.log(userClickedPattern);
    console.log(gamePattern);
  });

   $(document).keydown(function() {
     if (!audioPlayed) {
       nextSequence();
     }
   });

   function startOver(){
     level=0;
     gamePattern=[];
     userClickedPattern=[];
     audioPlayed=false;
   }
   function checkAnswer(currentLevel){
     if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
       console.log("success");
       return true;
     }
     else{
       console.log("wrong");
       return false;
     }
   }

   function nextSequence(){
     var randomNumber =Math.floor(((Math.random()*4)));
     level++;
     $("#level-title").text("Level " + level);
     randomChosenColour = buttonColours[randomNumber];
     gamePattern.push(randomChosenColour);
     flashButton($('#'+ randomChosenColour));
     playSound(randomChosenColour);
     audioPlayed = true;
   }

   //just provide the file name without the extention, for example if the file is called blue.mp3, u send blue as param;
   function playSound(name){
     new Audio('sounds/'+name+'.mp3').play();
   }

   function animatePress(button){
       button.addClass("pressed");
       setTimeout(function(){button.removeClass("pressed");},100);
   }


   function flashButton(button) {
     $(button).animate({opacity: 0.05}, 100).animate({opacity: 1}, 100);
   }
});
