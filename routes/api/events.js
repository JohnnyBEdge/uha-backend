const express = require('express');
const router = express.Router();
const {
  getEvents, deleteEvent
} = require('../../dal/events');

/* GET events. */
router.get('/', async function(req, res) {
    try{
      const data = await getEvents();
      res.send(data);
    } catch(err){
      console.log("ERROR:",err)
      res.status(500).send("Internal server error; check logs");
    };
  });

// DELETE events
router.delete('/:id', async function(req, res){
  try{
    const data = await deleteEvent(req.params.id);
    res.send(data)
  } catch(err){
    console.log("ERROR:",err);
    res.status(500).send("Internal server error; check logs");
  }
})

module.exports = router;