const registerhandler = (req,res,pg,bcrypt) => {
    const { name, email, pwd } = req.body;
    if (!name || !email || !pwd) {
        return res.status(400).json("Incomplete details")
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pwd, salt);
  
   return pg.transaction(trx => {
      trx.insert( 
        { 
        email: email,
        hash: hash
         }
        )
         .into ('login')         
         .returning('email')
            .then (loginemail => { 
                 return trx.insert(
                        {
                            name: name,
                            email: loginemail[0],
                            joined: new Date()
                        }
  
                    )
                    .into('users')
                    .returning('*') 
                    .then(user => {res.json(user[0])})
                 })
                .then(trx.commit)
                .catch(trx.rollback)  
        })    
      .catch(err => res.status(400).json("Unable to Register"));
    
    
}

module.exports = {registerhandler}