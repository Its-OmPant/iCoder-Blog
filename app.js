const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const Article = require("./models/article")
const Router = express.Router();

const app = express();


// mongoose db connection

mongoose.connect("mongodb://localhost:27017/BlogDB",{
    useNewUrlParser:true
})


//VIEW ENGINE
app.use(expressLayouts)
app.set('view engine','ejs')


//bodyparser

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//ROUTE

app.get("/", async(req,res)=>{
    const article = await Article.find();
    res.render("home",{article:article});
})
app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/contact',(req,res)=>{
    res.render('contact');
})
// app.post('/contact',(req,res)=>{
//     const email = req.body.email;
//     const option = req.body.option;
//     const intro = req.body.intro;
//     const concern = req.body.concern;
// })

app.get('/compose',(req,res)=>{
    res.render('compose');
})

app.get('/article/:slug',async(req,res)=>{
    const post =  await Article.findOne({slug:req.params.slug});
    if(post == null){res.redirect('/')}
    res.render('showArticle',{article:post})
})

app.post('/compose',(req,res)=>{
    const article = new Article({
        title: req.body.title,
        content:req.body.content,
    
    })
    article.save().then(()=>{
        res.redirect('/')
    })
})

// Public folder for css and js
app.use(express.static('public'))

//PORT
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('Server started on localhost 8000');
})