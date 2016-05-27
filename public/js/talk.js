var app=angular.module('talkApp',[]);

app.controller('talkCtrl',function($scope,$timeout)
{
    var socket=io.connect('http://192.168.1.104:3000/');
    
     var client={};
    
    $scope.questions=[];//未回答的问题
    $scope.questionsAnswerd=[];//已经回答的问题


    client.admission=document.getElementById("admission").innerHTML;
    client.identification=document.getElementById("identification").innerHTML;
    
    console.log(typeof(client.admission));
    console.log(client.admission[0]);

    switch(client.admission[0])
    {
        case '1':client.name="宜春考生"+client.admission.substr(0,3);break;
        case '2':client.name="九江考生"+client.admission.substr(0,3);break;
        case '3':client.name="新余考生"+client.admission.substr(0,3);break;
    } 


    //console.log("123"+document.getElementById("admission").innerHTML);
    //client.name="123";

    //初始化服务端的客户数据
    socket.emit('init',client.identification);

    
    //获得自己的ip地址
    socket.on('ip',function(ip)
    {   
        
        client.ip=ip.substr(7,ip.length-1);
        //alert(client.ip);
    })

    //某个提问被删除
    socket.on('remove_done',function(index)
    {  
          $timeout(function()
         {
           $scope.questions.splice(index,1);
            
         })     
       
    })
    
    //提问
    $scope.sendMessage=function()
    {   
        var question={name:client.name,content:$scope.text,ip:client.ip,
            identification:client.identification};
        $scope.text="";
        socket.emit('ask',question);
    }

    //接收回答的问题
    socket.on('answer_done',function(_msg)
    {
           $timeout(function()
         {
             //console.log(_msg);
             $scope.questionsAnswerd.push(_msg);
             
             console.log(_msg.question.id);
             $scope.questions.splice(_msg.question.id,1);
            
         })     
    })



    //提问完毕,将发送时间填充
    socket.on('ask_done',function(_msg)
    {
          $timeout(function()
         {
             //console.log(_msg);
             $scope.questions.push(_msg);
             client.lastaskTime=_msg.lastaskTime;
         })
    })
   
    //提问时间过快
    socket.on('ask_too_fast',function()
    {
        alert("提问时间过快！请3分钟以后再提问");
    })

    //ip被封
    socket.on('blocked',function()
    {
        alert("您的IP已经被禁止发言,请联系管理员解除");
    })

    //接收到别人的提问
    socket.on('message',function(_msg)
    {   
    	 $timeout(function()
    	 {
    	 	 //console.log(_msg);
    	     $scope.questions.push(_msg);
    	 })
    });






	function appendZero(obj) {
	    if (obj < 10) return "0" + "" + obj;
	    else return obj;
	}

	function getLocalHMS() {
	   // var time = (new Date()).getTime();
	    var d = new Date();
	    return appendZero(d.getHours()) + ":" + appendZero(d.getMinutes()) + ":" + appendZero(d.getSeconds());
	} 
	function getMin()
	{
		var d = new Date();
		return d.getMinutes();
	}

   //socket.send("123");
   
  
});

