var buttoncolors=["red","blue","green","yellow"];
var gamepattern=[];
var userclickpattern=[];
var started=false;
var level=0;

$(document).bind("keypress click",function() {
    if (!started) {
  
            $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


  $(".btn").click(function() {
    var userchoosencolor=$(this).attr("id");
    userclickpattern.push(userchoosencolor);
    playSound(userchoosencolor);
        animatePress(userchoosencolor);
        checkAnswer(userclickpattern.length-1);

});

  function checkAnswer(currentLevel){
    if (gamepattern[currentLevel] === userclickpattern[currentLevel]) {
      if (userclickpattern.length === gamepattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }

function nextSequence(){
  userclickpattern=[];

    level++;
    $("#level-title").text("Level " + level);
    var rno=Math.floor(Math.random()*4);
    
var randomchoosencolor=buttoncolors[rno];

    gamepattern.push(randomchoosencolor);


        $("#"+ randomchoosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
                        playSound(randomchoosencolor);


}

      

          function playSound(name){
            let audio = new Audio("sounds/" + name + ".mp3");
                     audio.play();

          }

          function animatePress(currentColor){
            $("#"+currentColor).addClass("pressed");
            setTimeout(function () {
                $("#" + currentColor).removeClass("pressed");
              }, 100);
          }


          function startOver() {
            level = 0;
            gamepattern = [];
            started = false;
          }