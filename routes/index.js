/*
 * Filename: /Users/alex/Developer/5610-p2/champListBack/routes/index.js
 * Path: /Users/alex/Developer/5610-p2/champListBack
 * Created Date: Tuesday, October 21th 2022, 10:27:34 am
 * Author: Tianchang WANG
 *
 */

const express = require("express");
const router = express.Router();

const db = require("../db/db.js");

router.post("/user/signup", async (req, res) => {
  let user = {};
  user.email = req.body.email;
  user.password = req.body.password;
  try {
    const dbRes = await db.createUser(user);
    console.log(dbRes);
    res.send({
      val: 1,
      comment: "signup success",
    });
    // res.redirect("/");
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({
      val: -1,
      err: e,
    });
  }
});

router.post("/user/login", async (req, res) => {
  console.log(req.body);
  let user = {};
  user.email = req.body.email;
  user.password = req.body.password;

  try {
    const dbRes = await db.userLogin(user);
    console.log(dbRes);
    res.send({
      val: 1,
      comment: "login success",
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({
      val: -1,
      comment: e,
    });
  }
});

router.post("/item/create", async (req, res) => {
  let title = req.body.title;
  let type = req.body.type;
  let email = req.body.email;
  try {
    let record = {};
    record.title = title;
    record.type = type;
    record.email = email;
    record.completed = false;
    record.createTime = Date();
    record.deleted = false;
    const dbRes = await db.createItem(record);
    console.log(dbRes);
    res.send({
      val: 1,
      comment: "create item success",
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({
      val: -1,
      err: e,
    });
  }
});

// this api only changes the status of completion
router.post("/item/complete", async (req, res) => {
  let query = {};
  query.id = req.body._id;
  console.log(query);
  try {
    const dbRes = await db.updateItemCompletion(query);
    console.log(dbRes);
    res.send({
      val: 1,
      comment: "update success",
      completed: dbRes,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({
      val: -1,
      err: e,
    });
  }
});

router.get("/item/retrieve", async (req, res) => {
  let paraStr = req.url.split("?")[1];
  let email = paraStr.split("=")[1];
  try {
    let items = await db.getItemList(email);
    res.send({ items: items });
    // res.send({ items: items.filter((item) => { item.deleted == true }) });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.get("/item/delete", async (req, res) => {
  let paraStr = req.url.split("?")[1];
  let id = paraStr.split("=")[1];
  console.log("id in route", id);
  try {
    const dbRes = await db.deleteItem(id);
    console.log(dbRes);
    res.send({
      val: 1,
      comment: "delete success",
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({
      val: -1,
      err: e,
    });
  }
});

// this api only updates item title
router.post("/item/edit", async (req, res) => {
  let query = {};
  query.id = req.body._id;
  query.newTitle = req.body.newTitle;
  query.newComment = req.body.newComment;
  console.log(query);
  try {
    let dbRes = await db.editItemTitle(query);
    console.log(dbRes);
    res.send({
      newTitle: query.newTitle,
      val: 1,
      comment: "update success",
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).send({
      val: -1,
      err: e,
    });
  }
});

module.exports = router;
