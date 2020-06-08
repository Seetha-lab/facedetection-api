const profilehandler = (req, res, pg) => {
    const { id } = req.params;
   return pg.select('*').from('users').where({
       id:id
   }).then(user =>
    {
        if(user.length)
        {
            res.json(user[0]);
        }
        else {
            res.json("User not found");
        }
    })
   .catch(err=>res.status(400).json("User not found"))
    }


    module.exports = {profilehandler}