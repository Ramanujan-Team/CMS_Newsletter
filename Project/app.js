const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const users = [{
    id: 'kk2j2724kh248U7H_84Y4',
    email: 'vibrant.vishal75@gmail.com',
    name: 'Vishal Kumar',
    password: 'qwerty000'
}];

function findUser(tokenId) {
    var usersFound = users.filter(function(e) {
        return e.id === tokenId
    });

    return usersFound[0]
}

//Login get
app.get('/login',function (req,res) {
    res.sendfile('./public/login.html')
});

//Logout get
app.get('/logout', function(req, res) {
    res.clearCookie('uId_token').redirect('/login')
});

//Login post
app.post('/login', function(req, res) {
    var userBody = req.body,
        isValid = false, uid;

    users.filter(function(e) {
        isValid = e.email === userBody.email && e.password === userBody.password;
        if (isValid) {
            uid = e.id;
        }
        return true
    });

    if (isValid) {
        res.cookie('uId_token', uid);
    }

    res.json({
        validUser: isValid
    })
});

/*
app.post('/log',function (req,res) {

});  */

app.get('/dashboard', function (req, res) {
    if (findUser(req.cookies['uId_token'])) {
        return res.sendfile('./public/dashboard.html');
    }
    res.redirect('/login')
});

app.post('/send', function (req, res) {
    var loggedUser = findUser(req.cookies['uId_token']);
    if (!loggedUser) {
        return res.redirect('/login')
    }

    var body = req.body;
    console.log(body);
    sgMail.send({
        to: body.to,
        from: loggedUser.email,
        subject: body.subject,
        text: body.html,
        html: body.html,
        templateId: body.templateId,
        substitutions: {
            title: 'Greetings from CMS Newsletter'
        }
    }, function(e, a) {
        //console.log('--?', e, a)
        res.json({success : true})
    });

});

app.listen(8000);