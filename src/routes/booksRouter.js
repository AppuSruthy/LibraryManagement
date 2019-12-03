const express = require("express");
const mongoose=require("mongoose");
var booksmodel=require('../Models/books');
var url="mongodb://127.0.0.1:27017/booksdb";


const booksRouter = express.Router();

mongoose.connect(url,function(err){
    if (err) throw err
    else{
        console.log("connection established")
    }
})


var books = [{
        title: "War and peace",
        genere: "Historical Fiction",
        author: "Leo Tolstoy",
        image: "war.jpg"
    },

    {
        title: "Odissy",
        genere: "Historical Fiction",
        author: "William Shekspear",
        image: "odyssy.jpg"
    },
    {
        title: "Inferno",
        genere: "Historical Fiction",
        author: "Dan Brown",
        image: "inferno.jpg"
    },
    {
        title: "Five point Someone",
        genere: " Fiction",
        author: "Chetan Baghat",
        image: "five.jpg"
    },
];


function router(nav) {
    booksRouter.route('/')
        .get((req, res) => {
booksmodel.find({},function(err,result){
    if(err) throw err;
    else
    {
        res.render('books',{nav,books:result,title:books})
    }
});
}) ;         


    booksRouter.route('/addBooks')
        .get((req, res) => {
            res.render('addBooks.ejs', {
                nav,
                books
            });
        });

    booksRouter.route('/save')
        .post((req, res) => {
            var newbook = new booksmodel();
            newbook.BTitle=req.body.title;
newbook.BAuthor=req.body.author;
newbook.BGenere=req.body.genere;
newbook.save(function(err){
    if(err) throw err
    else{
        res.send("data added")
    }
})
           
        });

        booksRouter.route('/deletebook')
        .get((req,res)=>{
res.render('deletebook.ejs',{nav,books
});
        });

        booksRouter.route('/delete')
        .post((req,res)=>{
            booksmodel.deleteOne({BTitle:req.body.title},function(err){
                if(err) throw err
                else
                {
                    res.send("Data deleted");
                }
            });
        });
booksRouter.route('/editbook')
.get((req,res)=>{
    res.render('editbook.ejs',{
        nav,books
    });
});

booksRouter.route('/edit')
.post((req,res)=>{
    booksmodel.updateOne({'BTitle':req.body.title},{'BAuthor':req.body.author,'BGenere':req.body.genere},function(err){
        if(err) throw err
        else{
            res.send("data updated");
        }
    })
})
        booksRouter.route('/:id')
        .get((req, res) => {
            var i = req.params.id; //req.param["id"]
            booksmodel.find({},function(err,result){
if(err) throw err;
else{
    res.render('book.ejs',{nav,book:result[i]})
}
            })
            
        })
    return booksRouter;
}
module.exports = router;