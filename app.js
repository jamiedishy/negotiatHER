const express = require('express');
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const passport = require("passport");
const port = 2000;

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());


app.post("/", function(req, res) {

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {email_address: email,
            user: 'user: 0174bf9f6355238fccc175a215034b04-us4',
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
            "Authorization": "jamie1 0174bf9f6355238fccc175a215034b04-us4"
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
                console.log(response.statusCode);
                
                // unless add the below info, the user is not added to mailchimp list for signup.
                // currently, resort to 'err'... so temporarily sendFILE to portfolio.html given err
                // needs to be fixed
                req.login(data.members.user, function(err) {
                    if (err) {
                        //res.status(400).send(err);
                        res.sendFile(__dirname + "/portfolio.html")
                        console.log("theres an error");
                    }
                    else {
                        res.sendFile(__dirname + "/portfolio.html")
                        console.log(res.json(data.members.user));
                    }
                });
            }
        }
    })
    
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));