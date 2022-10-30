import express from "express";

export const PORT = process.env.PORT || 3000;

const router = express.Router()

router.post("/login", (req, res) => {
    console.log("POST login", req.body);
    const {userName, password} = req.body;
    console.log("login", userName, password);
});

router.get("/users", (req, res) => {
    res.send("users");
})

export default router;