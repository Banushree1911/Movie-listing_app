require("dotenv").config();
const moviesRouter = require("./routes/movies/mv.js");
const ticketsRouter = require("./routes/ticket/tckt.js");
const express = require("express");  //import express

const app = new express();             //obj create //port-logical entity
const port = process.env.PORT || 8080;     //port: http :80 //https: 443

app.use("/movies",moviesRouter);
app.use("/tickets",ticketsRouter);

app.listen(port, ()=>{             //listen: fun//function call //app.listen-to start the server
    console.log(`Express app listening at http://localhost:${port}`);
});