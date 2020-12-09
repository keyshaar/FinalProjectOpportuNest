let index=0;
let attempt = 0;
let score = 0;
let wrong = 0;

let questions= quiz.sort(function(){
  return 0.5 - Math.random();
});

let totalQuestion= questions.length;


$(function(){
  let totalTime = 300;
  let min = 0;
  let sec = 0;
  let counter = 0;

  let timer = setInterval(function(){
    counter++;
    min = Math.floor ((totalTime - counter)/60);
    sec = totalTime - (min * 60) - counter;

    $(".timer_box span").text(min + ":" + sec)

    if (counter == totalTime) {

      alert("Time's up. press ok to show the result");
      result();
      clearInterval(timer);

    }
    //console.log("sec=" + sec);
    //console.log("min=" + min);
  }, 1000);


  printQuestion(index);

});

function printQuestion(i){
  //console.log(questions[0]);

  $(".questionbox").text(questions[i].question);
  $(".optionbox span").eq(0).text(questions[i].option[0]);
  $(".optionbox span").eq(1).text(questions[i].option[1]);
  $(".optionbox span").eq(2).text(questions[i].option[2]) ;
  $(".optionbox span").eq(3).text(questions[i].option[3]);
}

function checkAnswer(option){
  attempt++;

  let optionClicked = $(option).data("opt");

  console.log(questions[index]);

  if(optionClicked == questions[index].answer){
    $(option).addClass("right");
    score++;
  }
  else {
    $(option).addClass("wrong");
    wrong++;
  }

  $(".scorebox span").text(score);

  $(".optionbox span").attr("onclick","");

}

function showNext(){

  if(index >= questions.length - 1){
    showResult(0);
    return;
  }
  index++;

  $(".optionbox span").removeClass();
  $(".optionbox span").attr("onclick","checkAnswer(this)");
  printQuestion(index);
}

function showResult(j){
  if(
    j == 1 &&
    index < questions.length -1 &&
    !confirm(
      "Quiz has not finished yet. Press ok to skip quiz & get final result."
    )
  ){
    return;
  }
  result();
}


function result(){
    $("#questionscreen").hide();
    $("#resultscreen").show();

    $("#totalQuestion").text(totalQuestion);
    $("#totalAttempt").text(attempt);
    $("#correctQuestion").text(score);
    $("#falselQuestion").text(wrong);

}
