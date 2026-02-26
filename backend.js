const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
let posts = [];
let id = 1;
app.get('/api/posts', (req,res)=> res.json(posts));
app.post('/api/posts',(req,res)=>{
  const p={id:id++,title:req.body.title||'Untitled',body:req.body.body||''};
  posts.push(p); res.status(201).json(p);
});
app.get('/api/posts/:id',(req,res)=>{
  const p=posts.find(x=>x.id==req.params.id); if(!p) return res.status(404).end(); res.json(p);
});
app.put('/api/posts/:id',(req,res)=>{
  const p=posts.find(x=>x.id==req.params.id); if(!p) return res.status(404).end(); p.title=req.body.title; p.body=req.body.body; res.json(p);
});
app.delete('/api/posts/:id',(req,res)=>{ posts=posts.filter(x=>x.id!=req.params.id); res.status(204).end();});
const port=process.env.PORT||4000; app.listen(port,()=>console.log('Backend running',port));
