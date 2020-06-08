const signinhandler = (req,res,pg,bcrypt) => {

    const {email, pwd} = req.body;
    if (!email || !pwd) {
        return res.status(400).json("Incomplete details")
    }
        
    return pg.select('email', 'hash').from('login').where('email', '=', email)
      .then(data => 
        {
            const pwdcheck = bcrypt.compareSync(pwd, data[0].hash)
            if (pwdcheck)
            {
                return pg.select('*').from('users').where('email', '=', data[0].email)
                .then(user => res.json(user[0]))
                .catch(err=>res.json("Incorrect User"))
            }
            else {
               return res.json("Incorrect Password");
            }
        }).catch(err=>res.status(400).json("Wrong Credentials, Try again"))
   
   

}

module.exports = {signinhandler:signinhandler}


