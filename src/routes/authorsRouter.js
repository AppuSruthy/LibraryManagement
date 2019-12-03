const express = require("express");

const authorsRouter = express.Router();

var authors = [{
        Name: "Leo Tolstoy",
        Genere: "Fiction",
        Details: "In the 1860s, Russian author Leo Tolstoy wrote his first great novel, War and Peace. In 1873, Tolstoy set to work on the second of his best-known novels, Anna Karenina. He continued to write fiction throughout the 1880s and 1890s. One of his most successful later works was The Death of Ivan Ilyich.",
        image: "tolstoy.jpg"
    },
    {
        Name: "Dan Brown",
        Genere: "thriller novels",
        Details: "Daniel Gerhard Brown (born June 22, 1964) is an American author best known for his thriller novels, including the Robert Langdon novels Angels & Demons (2000), The Da Vinci Code (2003), The Lost Symbol (2009), Inferno (2013) and Origin (2017). His novels are treasure hunts that usually take place over a period of 24 hours.",
        image: "DanBrown.jpg"
    },

    {
        Name: "Chetan Bhagat",
        Genere: "	romance, realistic fiction, non-fiction",
        Details: "Chetan Bhagat (born 22 April 1974) is an Indian author and columnist, known for his Indian-English novels about young middle class Indians. Bhagat was included in Time magazine's list of World's 100 Most Influential People in 2010.",
        image: "chetanbagat.jpg"
    }

];

function router(nav) {
    authorsRouter.route('/')
        .get((req, res) => {
            res.render('authors.ejs', {
                nav,
                title: "Authors",
                authors
            });
        });
    authorsRouter.route('/:id')
        .get((req,res)=>{
            var i =req.params.id;
           res.render('author.ejs',{
            nav,
            title: "Author",
            authors:authors[i]
           })  ;
              });

    return authorsRouter;
}
module.exports = router;