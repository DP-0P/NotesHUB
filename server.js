const express = require('express')
const app = express();

const path = require('path');
const { dirname } = require('path/posix');

app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.send("<h3>yo yo chal </h3>");
})

app.listen(3000, () => console.log('Server is started on http://localhost:3000'));