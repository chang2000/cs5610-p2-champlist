/*
 * Filename: /Users/alex/Developer/5610-p2/champListBack/routes/index.js
 * Path: /Users/alex/Developer/5610-p2/champListBack
 * Created Date: Tuesday, October 21th 2022, 10:27:34 am
 * Author: Tianchang WANG
 * 
 */

var express = require("express");
var router = express.Router();

const db = require("../db.js");

router.get('/user/signup', async (req, res) => {
  let user = {};
  user.email = req.body.email
  user.password = req.body.password
  try {
    const dbRes = await db.createUser(user);
    // res.send({ done: dbRes });
    res.send({
      val: 1,
      comment: "signup success"
    })
    // res.redirect("/");
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
})

router.get('/user/login', async (req, res) => {
  let user = {}
  user.email = req.body.email
  user.password = req.body.password

  try {
    const dbRes = await db.userLogin(user);
    res.send({
      val: 1,
      comment: "login success"
    })
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
})

router.get('/item/create', async (req, res) => {
  let title = req.body.title
  let type = req.body.type
  let email = req.body.email
  try {
    let record = {}
    record.title = title
    record.type = type
    record.email = email
    record.completed = false
    record.createTime = Date()
    const dbRes = await db.createItem(record);
    res.send({
      val: 1,
      comment: "create item success"
    })
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
})

// this api only changes the status of completion
router.get('/item/update', async (req, res) => {
  let query = {}
  query.id = req.body._id
  query.completed = req.body.completed
  console.log(query)
  try {
    const dbRes = await db.updateItemCompletion(query);
    res.send({
      val: 1,
      comment: "update success"
    })
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
})

router.get('/item/retrieve', async (req, res) => {
  let email = req.body.email

  try {
    console.log("db", db);
    const items = await db.getItemList(email)
    res.send({ items: items });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
})

router.get('/item/delete', async (req, res) => {
  let id = req.body._id
  try {
    const dbRes = await db.deleteItem(id);
    res.send({
      val: 1,
      comment: "delete success"
    })
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
})

module.exports = router;