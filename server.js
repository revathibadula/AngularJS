//import the modules
//require() is the predefined function used to import the modules
var express = require("express");
var mysql = require("mysql");
var mongodb = require("mongodb");
var fs = require("fs");
var bodyparser = require("body-parser");
var jwt = require("jwt-simple");

//create the REST Object
var app = express();
//where app object used to develop the Rest API.

//Deploy the Project
app.use(express.static(__dirname+"/../AngularJS_Mini_Project"));
//automatically server launches the index.html file.

//set the json as MIME type
app.use(bodyparser.json());

//implementing the security while reading the post parameters
app.use(bodyparser.urlencoded({extended:false}));

//create the connection object
var connection = mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"root",
   database:"poc_7am"
});

//connect to database
connection.connect();

//create the Array to store the tokens
var tokens=[];

// create the "/Login" Rest API
app.post("/login",function (req,res) {
    //Read the uname & upwd
    var uname = req.body.uname;
    var upwd = req.body.upwd;

    console.log("Inside server file uname = "+uname+"....upwd = "+upwd);

    //compare with the database
    connection.query("select * from login_details where uname='"+uname+"' and upwd='"+upwd+"'",function (err,recordsArray,fields) {
        console.log("RecordArray Data is "+recordsArray);
        if(recordsArray.length>0){
            var token = jwt.encode({'uname':uname,'upwd':upwd},"hr@nareshit.in");
            tokens.push(token);
            //console.log("Tokens of zero is ::"+tokens[0]);
            res.send({"login":"success","token":token});
        }else {
            res.send({"login":"fail"});
        }
    });
});


// create the /mysql request(post)
app.post("/mysql",function (req,res) {
    var token = req.body.token;
    if(tokens[0] == token){
        connection.query("select * from products",function (err,recordsArray,fields) {
            res.send(recordsArray);
        });
    }else {
        res.send({"404":"Error !"});
    }
});

//create the /mongodb request
var nareshIT = mongodb.MongoClient;
app.post("/mongodb",function (req,res) {
    var token = req.body.token;
   // console.log(token+"tokens[0] :: "+tokens[0]);
    if(token == tokens[0]){
       // console.log(token+"tokens[0] :: "+tokens[0]);
        nareshIT.connect("mongodb://localhost:27017/poc_7am",function (err,db) {
            db.collection("products").find().toArray(function(err,array){
                res.send(array);
            });
        });
    }else {
        res.send({"404":"Error !"});
    }
});

//create the /static request
app.post("/static",function (req,res) {
    var token = req.body.token;
    if(token == tokens[0]){
        fs.readFile(__dirname+"/products.json",function (err,data) {
            res.send(data);
        });
    }else {
        res.send({"404":"Error !"})
    }
});


//assign the port no.
app.listen(8080);
console.log("server listening the port no. 8080");

