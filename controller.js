// var userdb = require('./model');

// exports.create = (req,res)=>{
//     // validate request
//     if(!req.body){
//         res.status(400).send({ message : "Content can not be emtpy!"});
//         return;
//     }

//     // new user
//     const user = new Userdb({
//         name : req.body.name,
//         email : req.body.email,
//         gender: req.body.gender,
//         status : req.body.status
//     })

//     // save user in the database
//     user
//         .save(user)
//         .then(data => {
//             //res.send(data)
//             res.redirect('/add-user');
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message : err.message || "Some error occurred while creating a create operation"
//             });
//         });

// }

// exports.find = (req,res) => {

// }

// exports.update = (req,res) => {

// }

// exports.delete = (req,res) => {

// }

