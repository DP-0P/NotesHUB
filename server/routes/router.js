const express = ('express');

const route = express.Router();

route.get('/',(req,res) => {
    res.render('index');
});

route.get('/add-User',(req,res) => {
    res.render('addUser');
});

route.get('/update-User',(req,res) => {
    res.render('updateUser');
});

module.exports = route;

exports.route = route;