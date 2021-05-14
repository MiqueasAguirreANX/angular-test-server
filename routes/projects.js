var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // --- BD ----
  try {
    db.query('SELECT * FROM projects', [], (err, result)=>{
      if (err) {
        console.log(err.message)
        res.status(404).send(err.message)
      } else if (result.length > 0) {
        res.send({data: result})
      } 
    })
  } catch (error) {
    res.status(500).send(error)
  }
  
});

router.get('/:id', (req, res) => {

  try {
    db.query('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, result)=>{
      if (err) {
        console.log(err.message)
        res.status(404).send(err.message)
      } else if (result.length > 0) {
          res.send({data: result})
      } 
    })
  } catch (error) {
    res.status(500).send(error)
  }
  
});

router.get('/name/:name', (req, res) => {
  try {
    db.query('SELECT * FROM projects WHERE name = ?', [req.params.name], (err, result)=>{
      if (err) {
        console.log(err.message)
        res.status(404).send(err.message)
      } else if (result.length > 0) {
          res.send({data: result})
      } 
    })
  } catch (error) {
    res.status(500).send(error)
  }
  
});

router.post('/', (req, res) => {
  try {
    db.query('INSERT INTO projects (id, name, description, createdAt, manager, assignedTo, status) VALUES (?, ?, ?, ?, ?, ?, ?)', [null, req.body.name, req.body.description, req.body.createdAt, req.body.manager, req.body.assignedTo, req.body.status], (err, result)=>{
      if (err) {
        console.log(err.message)
        res.status(404).send(err.message)
      } else if (result.length > 0) {
          res.send({data: result})
      } 
    })
  } catch (error) {
    res.status(500).send(error)
  }
  
});

router.patch('/:id', (req, res) => {
  try {
    db.query("UPDATE projects SET name = ?, description = ?, manager= ?, assignedTo = ?, status = ?  WHERE id = ?", [req.body.name, req.body.description,  req.body.manager, req.body.assignedTo, req.body.status, req.params.id ], (err, result)=>{
      if (err) {
        console.log(err.message)
        res.status(404).send(err.message)
      } else if (result.length > 0) {
          res.send({data: result})
      } 
    })
  } catch (error) {
    res.status(500).send(error)
  }
  
});

router.delete('/:id', (req, res) => {
  try {
    db.query('DELETE FROM projects WHERE id = ?', [req.params.id], (err, result)=>{
      if (err) {
        console.log(err.message)
        res.status(404).send(err.message)
      } else if (result.length > 0) {
          res.send({data: result})
      } 
    })
  } catch (error) {
    res.status(500).send(error)
  }
  
});

module.exports = router;
