const { json } = require("body-parser");
var express = require("express");
var app = express();
var fs = require("fs"); //filesystem
//
var server = app.listen(3000, function () {
    console.log(" server is running");
});
//list
app.get("/list", function (request, response) {

    fs.readFile("users.json", function (err, data) {
        console.log(data);
        response.end(data);

    });
});
//add 
app.get("/add", function (request, response) {

    var newUser = {
        "u3": {
            "name": request.query.name,
            "password": request.query.password,
            "email": request.query.email
        }
    };

    //read the file
    fs.readFile("users.json", function (err, data) {
        data = JSON.parse(data);
        data["u3"] = newUser["u3"];
        console.log(data);
        response.end(JSON.stringify(data));

        //then write in file permanently
        fs.writeFile("users.json", JSON.stringify(data), function (err) {
            console.log("An error happened");
        });
    });


});

//delete
app.get("/delete", function (request, response) {
    // response.end("delete the users");

    fs.readFile("users.json", function (err, data) {
        data = JSON.parse(data);
        var id = "u" + request.query.id;
        delete data[id];
        console.log(data);
        response.end(JSON.stringify(data));

    });
});