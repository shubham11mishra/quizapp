$(document).ready(function () {
  var form = $("#quizform");
  var quizData = [];
  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz",
    function (response) {
      quizData = response;
      response.forEach((question) => {
        var questionWrapper = $("<div>").addClass("question-wrapper");
        form.append(questionWrapper);
        var questionH3 = $("<h3>").html(
          "Q" + question.id + ". " + question.question
        );
        questionWrapper.append(questionH3);

        for (var index = 0; index < question.options.length; index++) {
          var answerWrapper = $("<label>");
          questionWrapper.append(answerWrapper);
          var input = $("<input>")
            .attr("type", "radio")
            .attr("name", "q" + question.id)
            .attr("value", index + 1)
            .attr("id", "q" + question.id + "-" + (index + 1))
            .attr('required','true');
          var answer = $("<span>").html(question.options[index]);
          answerWrapper.append(input).append(answer);
        }
        questionWrapper.append($("<hr>").addClass("seprater"));
      });
      form.append($("<input>").attr("type", "submit").attr("id", "submitbtn"));
    }
  );

  $("#quizform").submit((e) => {
    e.preventDefault();
    var result = {};
    var radioBtns = $('input[type="radio"]');
    for (let index = 0; index < radioBtns.length; index++) {
      if (radioBtns[index].checked) {
        result[radioBtns[index].name] = radioBtns[index].value;
      }
    }
    var score = 0;
    for (let index = 0; index < quizData.length; index++) {
      var key = "q" + quizData[index].id;

      var selector = "#" + (key + "-" + result[key] + "+ span");
      //console.log($(selector));
    
      
      if (result[key] == quizData[index].answer) {
        score++;
        $(selector).addClass('rightanswer');
        $(selector).html($(selector).html() + ' <i class="fas fa-check-circle"></i>');
      } else {
        var correctOptionSelector =
          "#" + (key + "-" + quizData[index].answer) + " + span";
        
        $(correctOptionSelector).html($(correctOptionSelector).html() + ' <i class="fas fa-check-circle"></i>');
        $(correctOptionSelector).addClass('rightanswer');
        $(selector).html($(selector).html() + ' <i class="fas fa-times-circle"></i>');
        $(selector).addClass('wronganswer');
        
      }
    }
    $("#score-wrapper h1").html(score + "/5");
  });
});
