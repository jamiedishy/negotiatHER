const express = require('express');
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = 2000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
res.render("home");
});

app.post("/", function(req, res) {

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {email_address: email,
            user: 'user: be427d53261e47fd322e51c08af35f22-us4',
            status: "subscribed",
            merge_fields : {
                FNAME: firstName,
                LNAME: lastName
            }
            }
        ]
    };
    var jsonData = JSON.stringify(data);

    var option = {
        url: "https://us4.api.mailchimp.com/3.0/lists/bc3321e782",
        method: "POST",
        headers: {
            "Authorization": "jamie1 be427d53261e47fd322e51c08af35f22-us4"
        },
        body: jsonData
    };

    request(option, function(error, response, body) {
        if (error) {
           res.send("There was an error signing up. Please try again");
        }
        else {
            if (response.statusCode == 200) {
                // successfully hits mailchimp server
                res.redirect("/portfolio");
            }
        }
    })
    
})

app.get("/portfolio", function(req, res) {
    res.render("portfolio");
})

app.get("/questionaire", function(req, res) {
    res.render("questionaire");
})
app.post("/questionaire", function(req, res) {
    res.redirect("/");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));