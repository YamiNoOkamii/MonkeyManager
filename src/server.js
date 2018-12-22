const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express()
const models = require('./models/index');

// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine' , 'pug');

// Add a bit of logging
app.use(morgan('short'))


// Get all the users defined
app.get('/Monkey', function (req, res) {
  models.Monkeys.findAll()
    .then((Monkeys) => {
      res.json(Monkeys)
    })
})
app.get('/',function(req,res) {
  res.render('home',{title:'Monkey Manager 3000'})
});
app.get('/Monkey/:id', function (req, res) {
	var p1=req.params.id
  models.Monkeys.findOne({ where: { id: p1}})
    .then((Monkeys) => {
      res.json(Monkeys)
    })
})
app.get('/addmonkey',function(req,res) {
  res.render('addmonkey',{title:'Monkey Manager 3000'})
});
app.get('/addenclos',function(req,res) {
  res.render('addenclos',{title:'Monkey Manager 3000'})
});
app.get('/liste', function(req, res) {
  models.Monkeys.findAll()
  .then((Monkeys) => {
    res.render('liste', {title : 'monkey manager', Monkeys : Monkeys})
  })
});
app.get('/info', function(req, res) {
  models.Monkeys.findAll()
  .then((Monkeys) => {
    res.render('info', {title : 'monkey manager', Monkeys : Monkeys})
  })
});
// Add a new user to the database
app.post('/Monkey', function(req, res) {
  models.Monkeys.create({
    Monkeyname: req.body.name,
	Monkeyage: req.body.age,
    Monkeyrace: req.body.race,
	Idenclos:req.body.id,
  })
    .then(() => {
      res.render('ajout',{title:'Monkey Manager 3000'})
    })
})
app.post('/Enclos',function(req,res){
	 models.Enclos.create({
	 Name:req.body.name
	 })
	 .then(()=>{
		 res.render('LE_PAIN_ISSOU',{title:'Monkey Manager 3000'})
	 })
})
app.get('/Enclos',function(req,res){
  models.Enclos.findAll()
  .then((Enclos) => {
	  res.json(Enclos)
  })

})

app.get('/Enclos/:id',function(req,res){
	var p1=req.params.id
	models.Monkeys.findAll({where: {Idenclos:p1}})
	.then((Monkeys) => {
      res.json(Monkeys)
    })
})
app.delete('/Enclos/:id',function(req,res){
	var p1=req.params.id
	models.Monkeys.update({Idenclos:""},{where: {Idenclos:p1}})
	models.Enclos.destroy({where:{id:p1}}).then((Enclos)=>{
	res.send('Monkey deleted')
	})
})
app.delete('/Enclos/:idenclos/:idsinge',function(req,res){
	var p1=req.params.idenclos
	var p2=req.params.idsinge
	models.Monkeys.update({Idenclos:""},{where: {
     Idenclos:p1,
	 id:p2
	}})
	.then((Enclos)=>{
		res.send('Monkey deleted')
	})
})
app.put('/ChangementEnclos/:idenclos/:idsinge',function(req,res){
	var p1=req.params.idenclos
	models.Monkeys.update({Idenclos:req.body.idenclos},{where: {Idenclos:p1}})
	.then((Enclos)=>{
		res.send('Monkey deleted')
	})
})
app.delete('/Monkey/:id',function(req,res){
	var p1=req.params.id
	models.Monkey.destroy({where: {id:p1}})
	.then(() =>{
	res.send('Monkey deleted')
	})
})
app.delete('/Enclos/:id',function(req,res){
	var p1=req.params.id
	models.Monkeys.update({Idenclos:""},{where: {Idenclos:p1}})
	models.Enclos.destroy({where:{id:p1}}).then((Enclos)=>{
	res.send('Monkey deleted')
	})
})

app.put('/Monkey/:id',function(req,res){
    var p1=req.params.id
	models.Monkeys.update(req.body,{ where: { id: p1}})
	.then((Monkeys) => {
		 res.json(Monkeys)
	 })
	
})
app.delete('/Monkey',function(req,res){
	models.Monkey.destroy({where: {id:'1'},truncate: true})
	.then(() =>{
	res.send('Monkey deleted')
	})
})
// Synchronize models
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   * 
   * Listen only when database connection is sucessfull
   */
  app.listen(3000, function() {
    console.log('Express server listening on port 3000');
  });
});
