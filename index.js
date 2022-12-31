const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();
// views
app.set('view engin', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Middleware _____ Express Parser: It parse the form data into object which have body as a key whose value is also an object conatain form data
app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'));

var contactList = [
    {
        name: 'Tarun',
        number: '9410040742'
    },
    {
        name: 'Papa',
        number: '8909404142'
    },
    {
        name: 'Mummy',
        number: '9319567690'
    }
];
//controllers
app.get('/', function (req, res) {
    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log('Error in fetching Contacts from DB');
        }
        return res.render('home.ejs', {
            title: "Contact List",
            contact_list: contacts
        });
    });
});
app.get('/practice', function (req, res) {
    return res.render('practice.ejs', {
        title: 'Practice'
    });
});

app.post('/create-contact', function (req, res) {
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        number: req.body.number
    }, function (err, newContact) {
        if (err) {
            console.log('Error in creating contact');
            return;
        }
        console.log('********', newContact);
        return res.redirect('back');
    });
});

app.get('/delete-contect/', function (req, res) {
    console.log(req.query);
    let id = req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting contact from DB');
        }
        return res.redirect('back');
    });
});
//express server
app.listen(port, function (err) {
    if (err) { console.log('Oops Error: ', err) };
    console.log('Express server is working on: ', port);
});