function MyClientModule() {
  const msgDiv = document.querySelector("div#messages");
  //   const msgDivUser = document.querySelector("div#createUserMsg");

  function checkForErrors() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    console.log("error urlParams", params.msg);
    console.log("div user", msgDiv);
    // console.log("msg div user", msgDivUser);

    if (params.msg && params.msg == "notauthenticated") {
      console.log("here in not", params.msg);
      msgDiv.querySelector("#content").innerHTML = "Wrong email or password";
      msgDiv.style.display = "block";
    }

    if (params.msg && params.msg == "usercreated") {
      // console.log("here in not", params.msg);
      msgDiv.querySelector("#content").innerHTML = "User created";
      msgDiv.style.display = "block";
      //   msgDiv.class = "alert alert-success";
    }

    // if (params.msgCreate && params.msgCreate == "userexists") {
    //     // msgDivUser.querySelector("#contentUser").innerHTML = "user here";
    //     msgDivUser.style.display = "block";
    //   }
  }

  checkForErrors();
}

MyClientModule();

const login = (e) => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  axios
    .post("http://134.209.68.221:5000/user/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      console.log(res.data);
      let loginVal = res.data.val;
      if (loginVal == 1) {
        console.log("login success");
        // set localstorage
        window.localStorage.setItem("email", email);
        // redirect to mainlist
        let currentURL = window.location;
        console.log(currentURL);
        window.location = currentURL + "./html/mainList.html";
      } else {
        console.log("login failed");
        console.log(res.data.comment);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const createUser = (e) => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

    console.log(email, password)

  axios
    .post("http://134.209.68.221:5000/user/signup", {
      email: email,
      password: password,
    })
    .then((res) => {
      console.log(res.data);
      let loginVal = res.data.val;
      // if (loginVal == 1) {
      //     console.log('login success')
      //     // set localstorage
      //     window.localStorage.setItem('email', email)
      //     // redirect to mainlist
      //     let currentURL = window.location
      //     console.log(currentURL);
      //     window.location = currentURL + "./html/mainList.html"
      // } else {
      //     console.log('login failed')
      //     console.log(res.data.comment)
      // }
    })
    .catch((e) => {
      console.log(e);
    });
};
