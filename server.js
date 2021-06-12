console.log("fuck this shit")

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');

const app = express();

dotenv.config({path:'config.env'});

const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));

app.use(bodyparser.urlencoded({extended:true}))

app.get('/',(req,res) => {
    res.send('crud application')
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
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

