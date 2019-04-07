var express = require("express");
var app = express();
var port = 3000;
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine','ejs');


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'FAQ_MEAN';


var exp=app.listen(port,function() {
    console.log('3000 your host');
});

app.route('/').get(function (req, res) {
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {

        console.log("Connected successfully to Mongo server");
        const db = client.db(dbName);
        var faqArr=[];
        var col = db.collection('faqlist');
        var i=0;
        var cursor =col.find();
        //noinspection JSDeprecatedSymbols
        cursor.forEach(function(item, err) {
            assert.equal(null, err);
            if(err) throw err;
            if (item != null)
            {
                faqArr.push(item);
                ++ i;
            }
            else
            {
                console.log("No FAQ's Updated");
            }
        },function () {
            db.close;
            res.render('home',{data:JSON.stringify(faqArr)});
        });
    });

    /*
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(dbName);

            var cursor = db.collection('login').find();

            cursor.forEach(function (doc) {
                str=doc.id;
                console.log(str);
                console.log(doc.name);

            });
            /*
                    col.insert(prodArr, {w: 1}, function (err, result) {
                        if(err)
                        {console.log('error occured');}
                        else{
                            db.close;
                        }
                    });
        });
    */


});

app.route('/home').post(function (req, res) {
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {

        console.log("Connected successfully to Mongo server");
        const db = client.db(dbName);
        var faqArr=[];
        var col = db.collection('faqlist');
        var i=0;
        var cursor =col.find();
        //noinspection JSDeprecatedSymbols
        cursor.forEach(function(item, err) {
            assert.equal(null, err);
            if(err) throw err;
            if (item != null)
            {
                faqArr.push(item);
                ++ i;
            }
            else
            {
                console.log("No FAQ's Updated");
            }
        },function () {
            db.close;
            res.render('home',{data:JSON.stringify(faqArr)});
        });
    });

    /*
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(dbName);

            var cursor = db.collection('login').find();

            cursor.forEach(function (doc) {
                str=doc.id;
                console.log(str);
                console.log(doc.name);

            });
            /*
                    col.insert(prodArr, {w: 1}, function (err, result) {
                        if(err)
                        {console.log('error occured');}
                        else{
                            db.close;
                        }
                    });
        });
    */


});


app.route('/LoginPage').post(function (req,res) {
    var datetime = new Date();
    console.log(datetime.toISOString().slice(0,10));
    res.render('login');
});




app.route('/AdminPage').post(function (req,res) {
    MongoClient.connect(url, function (err,client) {
        assert.equal(null, err);
        console.log("admin login in progress...");
        const db = client.db(dbName);
        db.collection('adminlogin').findOne({email:req.body.email, password:req.body.Password},function (err,result) {
            if (err) throw err;

            if (!result)
            {
                db.close;
                res.send("Invalid Login");
            }
            else
            {
                db.close;
                faqArr=[];
                var col = db.collection('faqlist');
                var i=0;
                var cursor =col.find();
                //noinspection JSDeprecatedSymbols
                cursor.forEach(function(item, err) {
                    assert.equal(null, err);
                    if(err) throw err;
                    if (item != null)
                    {
                        faqArr.push(item);
                        ++ i;
                    }
                    else
                    {
                        console.log("No FAQ's Updated");
                    }
                },function () {
                    db.close;
                    console.log("admin login success");
                    res.render('adminpage',{data:JSON.stringify(faqArr),deleted:''});
                });
            }
        });
        })
});

app.route('/added').post(function (req,res) {
    var datetime = new Date();
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        db.collection('faqlist').insertOne({
            date:datetime.toISOString().slice(0,10) ,
            question:req.body.question,
            answer:req.body.answer
        },function (err,result) {
            if(err) throw err;
            if(!result){
                db.close;
                res.send("Updation Error");
            }
            else {
                db.close;
                faqArr=[];
                var col = db.collection('faqlist');
                var i=0;
                var cursor =col.find();
                //noinspection JSDeprecatedSymbols
                cursor.forEach(function(item, err) {
                    assert.equal(null, err);
                    if(err) throw err;
                    if (item != null)
                    {
                        faqArr.push(item);
                        ++ i;
                    }
                    else
                    {
                        console.log("No FAQ's Updated");
                    }
                },function () {
                    db.close;
                    console.log("admin login success");
                    res.render('adminpage',{data:JSON.stringify(faqArr),deleted:''});
                });
            }
        });
    })
});

app.route('/edit').post(function (req,res) {

    res.render('editpage',{question:req.body.ques, answer:req.body.ans});

});

app.route('/updated').post(function (req,res) {
    var datetime = new Date();
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        db.collection('faqlist').updateOne({question:req.body.ques,answer:req.body.ans},

            { $set: {date:datetime.toISOString().slice(0,10) ,
                    question:req.body.question,
                    answer:req.body.answer
                } },function (err,result) {
            if (err) throw err;
            if(!result){
                db.close;
                res.send("Updation Error");
            }
            else {
                db.close;
                faqArr=[];
                var col = db.collection('faqlist');
                var i=0;
                var cursor =col.find();
                //noinspection JSDeprecatedSymbols
                cursor.forEach(function(item, err) {
                    assert.equal(null, err);
                    if(err) throw err;
                    if (item != null)
                    {
                        faqArr.push(item);
                        ++ i;
                    }
                    else
                    {
                        console.log("No FAQ's Updated");
                    }
                },function () {
                    db.close;
                    console.log("admin login success");
                    res.render('adminpage',{data:JSON.stringify(faqArr),deleted:''});
                });
            }
        });
    })
});

app.route('/deletefaq').post(function (req,res) {
    MongoClient.connect(url, function (err,client) {
        assert.equal(null, err);
        console.log("admin login in progress...");
        const db = client.db(dbName);
        db.collection('faqlist').deleteOne({question:req.body.ques,answer:req.body.ans},function (err,result) {
            if (err) throw err;

            if (!result)
            {
                db.close;
                res.send("Invalid Login");
            }
            else
            {
                db.close;
                faqArr=[];
                var col = db.collection('faqlist');
                var i=0;
                var cursor =col.find();
                //noinspection JSDeprecatedSymbols
                cursor.forEach(function(item, err) {
                    assert.equal(null, err);
                    if(err) throw err;
                    if (item != null)
                    {
                        faqArr.push(item);
                        ++ i;
                    }
                    else
                    {
                        console.log("No FAQ's Updated");
                    }
                },function () {
                    db.close;
                    console.log("admin login success");
                    res.render('adminpage',{data:JSON.stringify(faqArr),deleted:req.body.ques});
                });
            }
        });
    })


});