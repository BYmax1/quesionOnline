var app=angular.module('adminApp',[]);

app.controller('adminCtrl',function($scope,$timeout)
{
    var socket=io.connect('http://localhost:3000/');
    
    //var client={admission:123,identification:456,lastaskTime:"-100"};
    
    $scope.questions=[];//未回答的问题
    $scope.questionsAnswerd=[];//已经回答的问题

    //接收到别人的提问
    socket.on('message',function(_msg)
    {   
         $timeout(function()
         {
             //console.log(_msg);
             $scope.questions.push(_msg);
         })
    });

      //封IP
      $scope.blockIp=function(ip)
      { 
       if(confirm('确定封IP?')==false)return false; 
        console.log(ip);
        socket.emit('blockedIps',ip);
      }

      //删除提问
      $scope.remove=function(index)
      {  
       if(confirm('确定删除?')==false)return false;  
         //console.log("123");
         $scope.questions.splice(index,1);
         socket.emit('remove',index);
         $scope.showMe=false;
      }


     



    $scope.getQuestion=function(index)
    {
      $scope.question=$scope.questions[index];
      $scope.question.id=index;

     // console.log($scope.questions[$index].content);
    }
    $scope.answer=function()
    {
      if(!$scope.question)
      {
        alert("选择的提问不能为空!");
        return;
      }
        
      if(!$scope.answerText)
      {
         alert("回答的内容不能为空!");
         return;
      }
     




      var item={question:$scope.question,answer:$scope.answerText};
      
      socket.emit('reply',item);//将回复显示到所有的客户端上

      $scope.questionsAnswerd.push(item);
      $scope.questions.splice($scope.question.id,1);
      $scope.question=null;
      $scope.answerText=null;

    }
   

   
  
});

