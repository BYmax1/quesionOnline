$(document).ready(function(){
	
  $("#no1").keyup(function(event)
  {   

      if(!isAdmissionNo($(this).val()))
      {
        $("#info1").css("visibility","visible");
        $("button").attr({"disabled":"disabled"});
      }
      else
      {
        $("#info1").css("visibility","hidden");
        $("button").removeAttr("disabled");       
      }
  }) 

  $("#no2").keyup(function(event)
  {   

      if(!isCardNo($(this).val()))
      {
        $("#info2").css("visibility","visible");
        $("button").attr({"disabled":"disabled"});
      }
      else
      {
        $("#info2").css("visibility","hidden");
        $("button").removeAttr("disabled");       
      }
  }) 


 function isCardNo(card) { 
 var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
 return pattern.test(card); 
} 
function isAdmissionNo(admission)
{
 var pattern = /^\d{10}$/; 
 return pattern.test(admission);   
}
});