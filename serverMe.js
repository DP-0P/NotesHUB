console.log("fuck this shit")

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const { dirname } = require('path');
const app = express();

const mongoose = require('mongoose');

// model.js

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
},
)

// const userSchema = mongoose.Schema({ 
//     email: String, 
//     username: String, 
//     password: String, 
//     googleId: String, 
//     avatar_url: String, 
// });














const Userdb = mongoose.model('userdb', schema);

//model.js ends here

//connect db starts here

const mongoKey = 'mongodb+srv://admin:admin@cluster0.1upgx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(mongoKey, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

//connection ends

//router begins

//router

//controller begins

Userdb.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    });

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

Userdb.findUser = (req,res) => {
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
}

Userdb.update = (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

Userdb.delete = (req,res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}



//controller ends


dotenv.config({path:'config.env'});

const PORT = 3000;

app.use(morgan('tiny'));

connectDB();

app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine','ejs');
// app.set('views',path.resolve(--dirname,'views/ejs'));

app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/img',express.static(path.resolve(__dirname,'assets/img')));
app.use('/js',express.static(path.resolve(__dirname,'assets/js')));


const axios = require('axios');

app.get('/',(req,res) => {
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
            console.log(response);
        })
        .catch(err =>{
            res.send(err);
        })
});

app.get('/add-User',(req,res) => {
    res.render('addUser');
});

app.get('/update-User',(req,res) => {
    res.render('updateUser');
});

app.post('/api/users',Userdb.create);
app.get('/api/users',Userdb.findUser);
app.put('/api/users/:id',Userdb.update);
app.delete('/api/users/:id',Userdb.delete);



// app.use('/',require('./server/routes/router'));

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:3000`);
});

// const bodyParser = require('body-parser');

// const MongoClinent = require('mongodb').MongoClient;



// app.use(bodyParser.urlencoded({
//     extended:true
// }));

// const hbs = require('express-handlebars');

// const path = require('path');
// const { dirname } = require('path/posix');

// app.use(express.json());

// app.use(express.static(path.join(__dirname,'public')));

// app.set('view engine','hbs');
// app.engine('hbs',hbs({
//     extname:'hbs',
//     defaultView:'default',
//     layoutsDir:path.join(__dirname,'views'),
//     partialsDir:path.join(__dirname,'views//partials') 
// }))
// app.listen(3000, () => console.log('Server is started on http://localhost:3000'));

// let db;

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/upload.html');
// });

// const mdbClient = 'mongodb+srv://dp:deepak123456@cluster0.xfvxq.mongodb.net/first?retryWrites=true&w=majority;'

// MongoClinent.connect(mdbClient,{
//     useUnifiedTopology:true
// })
// .then(client => {
//     console.log('Connected to database');
//      db = client.db('first'); 
// });

//nodemon server.js

