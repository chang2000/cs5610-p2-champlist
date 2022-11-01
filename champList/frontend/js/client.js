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
