const express = require('express');
const cors = require('cors');
var bcrypt = require('bcryptjs');
const app = express();

const signin = require('./controller/signin')
const register = require('./controller/register')
const profile = require('./controller/profile')
const image = require('./controller/image')

const knex = require('knex');

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

var pg = knex({
    client: 'postgres',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smartbrain'
    }
  });


/*app.get("/", (req, res) => {
    pg.count('email').from('users')
      .then(emailcount => res.json(emailcount[0]))
      .catch(err => res.json("Error fetching data"))
})*/
app.get("/", (req, res) => {res.json("It is working")})
app.post("/signin", (req,res) => { signin.signinhandler(req, res, pg, bcrypt)})
app.post("/register", (req,res) => { register.registerhandler(req, res, pg, bcrypt)})
app.get("/profile/:id", (req, res) => { profile.profilehandler(req, res, pg)})
app.post("/image", (req, res) => { image.imagehandlerapi(req, res)})
app.put("/image", (req, res) => { image.imagehandler(req, res, pg)})


app.listen(process.env.PORT || 3000, () => {
    console.log("Working");
}); 