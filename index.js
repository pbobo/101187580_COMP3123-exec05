// Prendi Bobo | 101187580
const express = require('express');
const app = express();
const router = express.Router();
var fs = require('fs')

router.get('/', (req,res) => {
  res.send('This is start router');
});

router.get('/home', (req,res) => {
  res.send('This is home router');
});

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
app.use(express.static("public"))


/*
- Return all details from user.json file to client as JSON format
*/
let loadDetails = () => {
    let details = JSON.parse(fs.readFileSync('user.json'));
    //console.log(details)
    //send to server
    return details;
}
//console.log(loadDetails());
router.get('/details', (req,res) => {
  //res.send('This is profile router');
  res.send(loadDetails());
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  //res.send('This is login router');
  //http://localhost:8081/login?user_name=Prendi&password=Bobo
 
    let user_name = req.query.user_name
    let password = req.query.password

    let check1;
    let check2;

    // Creating JS Object
    let response = {
        status: 'works!',
        message: "User is valid"
    }

    let response2 = {
      status: false,
      message: "Username is invalid."
    }

    let response3 = {
      status: false,
      message: "password is invalid"
    }

    if(req.query.user_name == "Prendi" && req.query.password == "Bobo") {
      // works
      res.send(response)
    } else {
      if(req.query.user_name != "Prendi") {
        res.send(response2)
      }
    }
    if(req.query,password != "Bobo") {
      res.send(response3)
    }

    //res.send(response)
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/

router.get('/logout/:user_name', (req,res) => {
  //res.send(req.params);
  let username = req.params.user_name;

  res.send(`<b>${username} successfully logged out</b>`)
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));