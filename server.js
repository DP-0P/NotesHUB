console.log("fuck this shit")


const express = require('express')
const app = express();

const hbs = require('express-handlebars');

const path = require('path');
const { dirname } = require('path/posix');

app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','hbs');
app.engine('hbs',hbs({
    extname:'hbs',
    defaultView:'default',
    layoutsDir:path.join(__dirname,'views'),
    partialsDir:path.join(__dirname,'views//partials')
}))

app.get('/',(req,res)=>{
    res.render('main.hbs');
})

app.listen(3000, () => console.log('Server is started on http://localhost:3000'));