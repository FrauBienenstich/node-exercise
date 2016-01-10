var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' })
});

router.post('/send', function(req, res, next) {
	// the transport object is able to send an email
	var transporter = nodemailer.createTransport({ 
		service: 'gmail',
		auth: {
			user: process.env.TEST_EMAIL,
			pass: process.env.TEST_PW
		},
	});
  var mailOptions = {
  	from: process.env.TEST_EMAIL,
  	to: process.env.MY_EMAIL,
  	subject: "Website Submission",
  	text: "You have a new submission with the following details: Name: " + req.body.name + " Email: " + req.body.email + " Message: " + req.body.message ,
  	html: '<p>Got a new email</p><ul><li>Name: '+ req.body.name + '</li> <li>Email: ' + req.body.email + '<li>Message:' + req.body.message + '</li></ul>'
  };

  transporter.sendMail(mailOptions, function(error, info){
  	if(error){
  		console.log(error);
  		res.redirect('/');
  	} else {
  		console.log('Message Sent: ' + info.response);
  		res.redirect('/');
  	}
  });
});

module.exports = router;
