/**
 * Created by coofly on 2014/7/12.
 */
var io = require('socket.io')();
var xssEscape = require('xss-escape');

var blockedIps=[];
var clients={};

//记录上次提问的时间

function appendZero(obj) {
    if (obj < 10) return "0" + "" + obj;
    else return obj;
}

function getLocalHMS() {
    var time = (new Date()).getTime();
    var d = new Date();
    return appendZero(d.getHours()) + ":" + appendZero(d.getMinutes()) + ":" + appendZero(d.getSeconds());
}

function isBlocked(ip)
{
    for(var i=0;i<blockedIps.length;i++)
    {
        if(ip==blockedIps[i])
            return true;
    }
    return false;
}




io.on('connection', function (_socket) 
{
    //console.log("ip:"+_socket.request.connection.remoteAddress);
    //var ip=_socket.request.connection.remoteAddress.match(/\d+\.\d+\.\d+\.\d+/); 
    _socket.emit('ip',_socket.request.connection.remoteAddress);
    


    console.log(_socket.id + ': connect');

 
    _socket.on('disconnect', function () {
        console.log(_socket.id + ': disconnect')});
    

    _socket.on('init',function(identification)
    {
       if(!clients[identification]) 
          clients[identification]=-100;
    });
    //初始化数据

  
    _socket.on('ask', function (_content) {

          var t=(new Date()).getTime();     
          _content.time=getLocalHMS();

          _content.content=xssEscape(_content.content);

          console.log(_content.content);

         //if((t-clients[_content.identification])<1000*60*3)//如果在3分钟之内发言
         //   return _socket.emit('ask_too_fast');
          console.log(_content.ip);
          if(isBlocked(_content.ip))
             return _socket.emit('blocked');
          clients[_content.identification]=t; 
          
          console.log(clients);

          _socket.broadcast.emit('message',_content);
          return _socket.emit('ask_done',_content);
    }); 
    
    //管理员回复
    _socket.on('reply',function(_content)
    {
        // console.log("123fdsfdsf");
         return _socket.broadcast.emit('answer_done',_content);
    });
    
    //删除问题
    _socket.on('remove',function(index)
    {
         console.log("remove done");
        return _socket.broadcast.emit('remove_done',index);
    })
    
    //封ip
    _socket.on('blockedIps',function(ip)
    {
        console.log("block ip: "+ip);
        blockedIps.push(ip);

    })
 
});

exports.listen = function (_server) {
    return io.listen(_server);
};