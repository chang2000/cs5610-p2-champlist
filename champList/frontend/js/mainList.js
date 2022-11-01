let todoItem = document.getElementById("newTask");
let list1 = document.getElementById("todoList1");

let itemCount = 0;

async function addTodoList() {
  let inputText = todoItem.value.trim();

  if (inputText) {
    list1.innerHTML += ` <li class="col px-1 mx-0 d-flex align-items-center" id="list1Item${itemCount}">
                            <div class="col px-1 m-2 d-flex align-items-center">
                            <input class="" type="checkbox" id="list1Check${itemCount}" onclick="done(${itemCount})">
                                
                                <div class="col-6">
                                    <span class="form-control form-control-lg border-0  bg-transparent  px-3 " id="list1Text${itemCount}"> ${inputText} </span>
                                </div>
                                <div class="col-4">
                                
                                <button class="btn btn-primary" onclick="editList(${itemCount})">Edit</button>
                                <button class="btn btn-primary" onclick="commentList()">Comment</button>
                                <button class="btn btn-dark" onclick="deleteItem(${itemCount})">
                                    Delete
                                </button>
                                </div>
                            </div>
                        </li>`;
    todoItem.value = " ";
    itemCount++;

    axios.get("http://134.209.68.221:5000/item/create", {
        params: {
            title: inputText,
            type: 0, // 0, 1, 2, 3
            email: "sungrqin@gmail.com"
        }
    })
    .then(res=>{
        console.log(res.data.title)
    })
  }
}

function done(listId) {
  let checkbox = document.getElementById(`list1Check${listId}`);
  let current = document.getElementById(`list1Text${listId}`);
  let classExit = current.classList.contains("text-decoration-line-through");
  if (classExit == true) {
    current.classList.remove("text-decoration-line-through");
  } else {
    current.classList.add("text-decoration-line-through");
  }
}

function editList(listId) {
  let currentText = document.getElementById(`list1Text${listId}`);
  let newText = prompt("Wanna Change list?", currentText.innerText);
//   if (filterList(newText)) {
    currentText.innerText = newText;
//   }
};

deleteItem = (listId) => {
    let current = document.getElementById(`list1Text${listId}`).innerHTML;
    let deleteComfirm = confirm(`Are you sure to delete ${current}`);
    if (deleteComfirm) {
      let p = document.getElementById("todoList1");
      let c = document.getElementById(`list1Item${listId}`);
      console.log(p);
      console.log(c);
      p.removeChild(c);
    } else {
      console.log("deleted");
    }
  };