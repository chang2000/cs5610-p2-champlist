import express from "express";

export const PORT = process.env.PORT || 3000;

import myDB from "../db/MyMongoDB.js";

const router = express.Router()

router.post("/login", async (req, res) => {
    
    const user = req.body;
    const {email, password} = req.body;
    console.log("POST login", user);
    console.log("login", email, password);

    //TODO check if info is correct
    
    if (await myDB.authenticate(user)) {
        // res.redirect("/?msg=authenticated");
        console.log("authenticated");
        res.redirect("./html/mainList.html")
    } else {
        console.log("not authenticated");
        res.redirect("/?msg=notauthenticated");
    }
});

router.post("/createUser", async (req, res) => {
    
    const user = req.body;
    const {email, password} = req.body;
    console.log("POST createUser", user);
    console.log("login", email, password);

    // //TODO check if info is correct
    
    if (await myDB.createUser(user)) {
        //add some hint for successfully created user
        console.log("already succeed");
        // res.redirect("index.html");
        
        res.redirect("/?msg=usercreated");
    } else {
        console.log("failed");
        res.redirect("/?msgCreate=userexists");
    }
});

router.get("/users", (req, res) => {
    res.send("users");
})

export default router;