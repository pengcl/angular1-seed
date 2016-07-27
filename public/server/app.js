var application_root = __dirname,
    express = require("express"),
    path = require("path");

//使用express
var app = express();

var databaseUrl = "sampledb";
var collections = ["things"]
var db = require("mongojs").connect(databaseUrl, collections);

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
    res.send('Our Sample API is up...');
});

pp.get('/getangularusers', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross           // Domain Request
    db.things.find('', function(err, users) { // Query in MongoDB via Mongo JS Module
        if( err || !users) console.log("No users found");
        else
        {
            res.writeHead(200, {'Content-Type': 'application/json'}); // Sending data via json
            str='[';
            users.forEach( function(user) {
                str = str + '{ "name" : "' + user.username + '"},' +'\n';
            });
            str = str.trim();
            str = str.substring(0,str.length-1);
            str = str + ']';
            res.end( str);
            // Prepared the jSon Array here
        }
    });
});

app.post('/insertangularmongouser', function (req, res){
    console.log("POST: ");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross
    // Domain Request
    console.log(req.body);
    console.log(req.body.mydata);
    var jsonData = JSON.parse(req.body.mydata);

    db.things.save({email: jsonData.email, password: jsonData.password, username: jsonData.username},
        function(err, saved) { // Query in MongoDB via Mongo JS Module
            if( err || !saved ) res.end( "User not saved");
            else res.end( "User saved");
        });
});

app.listen(1212);