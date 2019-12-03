var mongoose=require('mongoose');
var bookschema=new mongoose.Schema({
    BID:String,
    BTitle:String,
    BAuthor:String,
BGenere:String
});

var booksmodel=new mongoose.model("books",bookschema,"books");

module.exports=booksmodel;