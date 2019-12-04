var express = require("express");

var chalk = require('chalk');

var path = require('path');

var bodyParser = require('body-parser');
//var cors = require('cors');


var app = new express(); //create object

var nav = [{
        link: '/login/signup',
        title: 'SignUp'
    },
    {
        link: '/login',
        title: 'Login'
    },
    {
        link: '/books',
        title: 'Books'
    },
    {
        link: '/authors',
        title: 'Authors'
    },
    {
        link: '/books/addBooks',
        title: 'addBooks'
    },
    {
        link:'/books/editbook',
        title:'Update Book'
    },
    {
        link:'/books/deletebook',
        title:'Delete Book'
    }
];

app.use(bodyParser.urlencoded({ extended: true }))

var BooksRouter = require('./src/routes/booksRouter')(nav); //function
var AuthorsRouter = require('./src/routes/authorsRouter')(nav);
var SignupLoginRouter = require('./src/routes/loginsignupRouter')(nav);


app.use('/login', SignupLoginRouter);
app.use('/books', BooksRouter);
app.use('/authors', AuthorsRouter);
app.use(express.static(path.join(__dirname, "/public"))); //css and js location is given in html page

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

    res.render('index.ejs', {
            nav,
            title: "Library"
        }

    )
});

app.get('/library', function(req, res) {
    res.send('Welcome to Library');
})
const port=process.env.PORT||3000
app.listen(port, function() {
    console.log("listening to port " + chalk.red('3000'));
}); //till it reaches the port3000
