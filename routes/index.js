var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/chat-room', checkLogin);

router.get('/chat-room', function (req, res) {
	var client=req.session.client;
    res.render('chat-room',{admission:client.admission,identification:client.identification,
    	school:req.session.school});
});

//管理员回答问题界面
router.get('/admin', function (req, res) {
	//console.log(req.ip);
    res.render('admin');
});

router.get('/login', function (req, res) {
	//console.log(req.ip);
	var school;
	switch(req.query.id)
	{
      case '1':school="江西财经大学";break;
      case '2':school="华东理工大学";break;
      case '3':school="江西理工大学";break;
	}
	req.session.school=school;
    
    res.render('login');
});

router.post('/login', function (req, res) {
	//console.log(req.body['no1']);
	var client={admission:req.body['no1'],identification:req.body['no2']};
	req.session.client=client;
    res.redirect('./chat-room');
});

function checkLogin(req, res, next) {
 if (!req.session.client) {
 return res.redirect('/login');
 }
 next();
}

module.exports = router;
