const Clarifai = require('clarifai');
const imagehandlerapi = (req,res) => {

const app = new Clarifai.App({
    apiKey: 'e8a56bfc00ba4cbd8999424b65639270'
   });

   app.models.predict('a403429f2ddf4b49b307e318f00e528b',
   req.body.input)
   .then(data => res.json(data))
}


const imagehandler = (req, res, pg) => {
    const { id } = req.body;
  return  pg('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
      
    if(entries.length)
        {
            res.json(entries[0]);
        }
        else {
            res.json("UserID not found");
        }
  })
  .catch(err=>res.status(400).json("Error updating count"))
}

module.exports = {imagehandlerapi,imagehandler}