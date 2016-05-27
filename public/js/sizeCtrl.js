$(document).ready(function(){

  var height=document.documentElement.clientHeight;//网页可见的高度
  var h2Height= parseInt($("h2").css("height")); //标题的高度
  var panelHeight=parseInt($(".panel-heading").css("height")); 
  
  if(isNaN(h2Height))
    h2Height=0;


  var answerHeight=(height*0.9-70)*0.6;
  var quesionHeight=(height*0.9-70)*0.3;

   

  $(".header").css("height",height*0.1+"px"); 

  $(".answer-block").css("height",answerHeight+"px"); 
  $(".quesion-block").css("height",quesionHeight+"px"); 


  $(".chat-body").first().css("height",answerHeight-h2Height-panelHeight+"px"); 
  
  $(".chat-body").last().css("height",quesionHeight-h2Height+"px"); 
 // $('.chat-body').css("height",) 

});