/*
 *
 * Author: Guoqin Sun
 *
 */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const login = () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  axios
    .post("http://134.209.68.221:5000/user/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      // console.log(res.data);
      let loginVal = res.data.val;
      if (loginVal == 1) {
        // console.log("login success");
        // set localstorage
        window.localStorage.setItem("email", email);
        // redirect to mainlist
        let currentURL = window.location;
        // console.log(currentURL);
        window.location = currentURL + "./html/mainList.html";
      } else {
        // console.log("login failed");
        document.getElementById("messages").style.display = "block";
        // console.log(res.data.comment);
      }
    })
    .catch((e) => {
      // console.log(e);
    });
};

const createUser = (e) => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // console.log(email, password);

  axios
    .post("http://134.209.68.221:5000/user/signup", {
      email: email,
      password: password,
    })
    .then((res) => {
      // console.log(res.data);
      let loginVal = res.data.val;
      if (loginVal == 1) {
        // console.log("created success");
        window.location.replace("../");
        //I like the style of your login/signup page with all the features work prefectly.
        //I'd expect it to navigate me to the home page or something, rather than redirecting me to the login page

        window.localStorage.setItem("newly-created", true);
        let ele = document.getElementById("newUserMsg");
        // console.log(ele);
        document.getElementById("newUserMsg").style.display = "block";
        //alert: user already registered
      } else {
        // console.log("created failed");
        document.getElementById("createUserMsg").style.display = "block";
        // console.log(res.data.err);
      }
    })
    .catch((e) => {
      // console.log(e);
    });
};

const displayInfomation = () => {
  // 1. get storage value
  let ifNewUser = window.localStorage.getItem("newly-created");
  if (ifNewUser) {
    let ele = document.getElementById("newUserMsg");
    if (ele) {
      document.getElementById("newUserMsg").style.display = "block";
    }
    window.localStorage.removeItem("newly-created");
  }
};

displayInfomation();
