const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const { title } = require('process');

app.set ("view engine","ejs");

app.get("/",function(req,res){
  fs.readdir('./notes',function(err, data){

res.render("index",{notes:data})
  console.log(data)
  })
  
})
app.get("/new",function(req,res){
  res.render("new")
})
app.get("/new-note",function(req,res){
  fs.writeFile(`./notes/${req.query.title}.txt`, req.query.description,(err)=>{
   
    res.redirect('/')
  })
 
})
app.get("/notes/:title",(req,res)=>{
  fs.readFile(`./notes/${title}`,'utf8',(err,data)=>{
  // res.send("noteDetail",{notes:data})
  })
})

app.get("/edit/:title",(req,res)=>{
  const title = req.params.title
  fs.readFile(`./notes/${title}.txt`, 'utf-8',(err,data)=>{
    res.render("edit",{
      title:title,
      description:data
    })
   
  })
})


app.get('/edit-notes/:oldTitle',(req,res)=>{
  const oldTitle = req.params.oldTitle
  const title = req.query.title
  const description = req.query.description
fs.rename(`./notes/${oldTitle}`,`./notes/${title}`,(err)=>{


  fs.writeFile(`./notes/${title}.txt`, description,(err)=>{
    res.redirect('/')
})

 

})
})


app.get("/delete/:notes", function(req, res) {
  const title = req.params.notes; 
  fs.unlink(`./notes/${title}`, (err) => {
    res.redirect('/');
  });
});

app.get("/view/:notes",function(req,res){
  const title = req.params.notes; 
  fs.readFile(`./notes/${title}`,'utf-8',(err,data)=>{
  res.send(data)
 })
})

app.get("/home",function(req,res){
  
   res.redirect("/")
  
})

app.listen(3500,function(){
    console.log('Server is running on port 3500')
})


