const express = require("express");
const Sequelize = require("sequelize");
const app = express();

app.use(express.json());

const sequelize = new Sequelize("database","username","password",{
    host: "localhost",
    dialect: "sqlite",
    Storage: "./Database/SQBooks.sqlite"

});

const Book = sequelize.define("book",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
},
title:{
    type: Sequelize.STRING,
    allowNull: false
},
author: {
    type: Sequelize.STRING,
    allowNull: false
}
});

sequelize.sync();

app.get("/books", (req, res) =>{
    Book.findAll().then(books => {
        res.status(500).send(err);
    });
});

//route to get a book by id
app.get("/books/:id", (req, res)=> {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send("Book not found");
        }else{
            res.json(book);
        }
    }).catch(err =>{
        res.status(500).send(err);
    });
});

//route to create a new book ไปดูบรรทัด60กว่า
app.post("/books",(req, res) => {
    Book.create(req.body).then(book =>{
        res.send(book);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//route to update a book
app.put("/books/:id", (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send("Book not found");
        }else{
            book.update(req.body).then(() => {
                res.send(book);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

//route to delete a book
app.delete("/books/:id", (req, res) => {
    Book.findByPk(req.params.id).then(book =>{
        if (!book) {
            res.status(404).send("Book not found");
        }else{
            book.destroy().then(() =>{
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

//start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));