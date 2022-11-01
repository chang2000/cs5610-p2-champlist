/*
 *
 * Author: Guoqin Sun
 *
 */

let todoItem = document.getElementById("newTask");
let list1 = document.getElementById("todoList1");
let list2 = document.getElementById("todoList2");
let list3 = document.getElementById("todoList3");
let list4 = document.getElementById("todoList4");

const listArray = [];
listArray.push(list1);
listArray.push(list2);
listArray.push(list3);
listArray.push(list4);
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let itemCount = 0;
const apiUrl = "http://134.209.68.221:5000";
let email = window.localStorage.getItem("email");
// get all items from current use

const getItemList = async () => {
  let ifChecked = "";
  console.log("email", email);
  let curEmail = document.getElementById("curAccount");
  curEmail.innerText = email;
  console.log("current email:", curEmail.innerText);

  axios
    .get(`http://134.209.68.221:5000/item/retrieve?email=${email}`)
    .then((res) => {
      console.log(res.data.items);
      console.log(res.data.items.length);
      //todo: checkbox update after comment
      for (let i = 0; i < res.data.items.length; i++) {
        let curItem = res.data.items[i];

        if (curItem.completed) {
          ifChecked = "checked";
        } else if (curItem.completed == false) {
          ifChecked = "";
        }

        listArray[
          curItem.type
        ].innerHTML += ` <li class="col px-1 mx-0 d-flex align-items-center" id="${curItem._id}">
        <div class="col px-1 m-2 d-flex align-items-center">
        <input class="" type="checkbox" id="listCheck${curItem._id}" ${ifChecked} onclick="done('${curItem._id}', '${ifChecked}')">
            
            <div class="col-6">
                <span class="form-control form-control-lg border-0  bg-transparent  px-3 " id="listText${curItem._id}"> ${curItem.title} </span>
            </div>
            <div class="col-4">
            
            <button class="btn btn-primary" onclick="editList('${curItem._id}')">Edit</button>
            <button class="btn btn-dark" onclick="deleteItem('${curItem._id}')">
                Delete
            </button>
            </div>
        </div>
    </li>`;
      }
    });
};

async function addTodoList() {
  let type = document.getElementById("type-select");
  console.log(type.value);

  let inputText = todoItem.value.trim();

  if (inputText) {
    axios
      .post("http://134.209.68.221:5000/item/create", {
        title: inputText,
        type: type.value,
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      });

    todoItem.value = " ";
    itemCount++;
  }
}

async function done(itemId, ifChecked) {
  let checkbox = document.getElementById(`listCheck${itemId}`);
  let current = document.getElementById(itemId);

  console.log("curr box checked", checkbox);
  console.log("checked ", ifChecked);

  axios
    .post("http://134.209.68.221:5000/item/complete", {
      _id: itemId,
    })
    .then((res) => {
      console.log(res.data);
    });
}

async function editList(listId) {
  let currentText = document.getElementById(listId);
  let newText = prompt("Wanna Change list?", currentText.innerText);

  currentText.innerText = newText;

  axios
    .post("http://134.209.68.221:5000/item/edit", {
      _id: listId,
      newTitle: newText,
    })
    .then((res) => {
      console.log(res.data);
      window.location.reload();
    });
}

const deleteItem = async (itemId) => {
  let deleteComfirm = confirm("Are you sure to delete");
  if (deleteComfirm) {
    axios
      .get(`http://134.209.68.221:5000/item/delete?id=${itemId}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      });
  }
};

function logOut() {
  let logoutComfirm = confirm("Do you want to log out?");
  if (logoutComfirm) {
    window.localStorage.removeItem("email");
    window.location.replace("../");
  }
}

getItemList();
