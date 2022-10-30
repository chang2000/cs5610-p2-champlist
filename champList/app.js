import express from "express";



// const express = require('express')
const app = express()


export const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/users", (req, res) => {
    res.send("users hello");
});

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Listening for connections on port ${PORT}`);
  });
  