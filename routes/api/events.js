const express = require('express');
const router = express.Router();
const {
  getEvents, deleteEvent, addEvent, editEvent
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

// DELETE event
router.delete('/:id', async function(req, res){
  try{
    const data = await deleteEvent(req.params.id);
    res.send(data)
  } catch(err){
      console.log("ERROR:",err);
      res.status(500).send("Internal server error; check logs");
  }
})

// POST event
router.post('/', async function(req, res){
  try{
    const data = await addEvent(req.body);
    res.send(data);
  } catch(err){
      console.log("ERROR:",err);
      res.status(500).send("Internal server error; check logs");
  }
})

//PATCH event
router.patch('/:id', async function(req, res){
  try{
    const data = await editEvent(req.params.id, req.body);
    res.send(data);
  } catch(err){
      console.log("ERROR:",err);
      res.status(500).send("Internal server error; check logs");
  }
})

module.exports = router;