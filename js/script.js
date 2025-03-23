
window.onload = () => {
    let person = prompt("Please Enter Your Name");
  if (person != null) {
    document.getElementById("person").innerHTML =
    "Hi, <b>" + person+" !</b>" ;
  }
  
  showTodo()
}

// ----year---
var now = new Date();
var year = now.getFullYear();
document.getElementById("year").innerText = year;

// ----timer----
let rightNowDate = new Date()

// day
var daysNames = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday"]
let theDay = rightNowDate.getDay();
let nameOfToday = daysNames[theDay];
console.log(nameOfToday)
// month name
var month = rightNowDate.toLocaleString('default', { month: 'long' });
console.log(month);
// date
let date = rightNowDate.getDate();
// time
let hours = rightNowDate.getHours();
let minutes = rightNowDate.getMinutes();
let seconds = rightNowDate.getSeconds()
const ampm = hours >= 12 ? 'PM' : 'AM';

hours %= 12;
hours = hours || 12;
minutes = minutes < 10 ? `0${minutes}` : minutes;

const time = `${hours}:${minutes}:${seconds} ${ampm}`;
console.log(time)
// overall
let timerData = nameOfToday + "," + month + " " + date + " " + year + "," + time;
// console.log(day)
document.getElementById('timer').innerHTML = timerData;

// ---------show toastify-----
const showToastify = (msg, color) => {
  Toastify({
    text: msg,
    duration: 3000,
    // destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color, //"linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () { } // Callback after click
  }).showToast();
}

// --------get the fieldVale 
const getValue = (id) => {
  return document.getElementById(id).value
}
// --------set the fieldVale (for update)
const setValue = (id, Val) => {
  return document.getElementById(id).value = Val
}
//---------output function
const showOutput = (output) => {
  document.getElementById('output').innerHTML = output;
}
//-------- clear inputfields
const clearInput = () => {
  document.getElementById("title").value = "",
    document.getElementById("location").value = "";
  document.getElementById("discription").value = "";

}
// const todos = JSON.parse(localStorage.getItem("Todos")) || [];

// ----------handle submit----------
const handleSubmit = () => {
  event.preventDefault();
  let title = getValue("title"), location = getValue("location"), discription = getValue("discription");

  title = title.trim();
  location = location.trim();
  discription = discription.trim();

  if (title.length < 3) return showToastify("Please Enter your Title Correctly", "linear-gradient(to right, pink, red)")
  if (location.length < 3) return showToastify("Please Enter your Location Correctly", "linear-gradient(to right, pink, red)")
  if (discription.length < 15) return showToastify("Your Discription is too short", "linear-gradient(to right, pink, red)")
  // console.log(title)
  // const todos = JSON.parse(localStorage.getItem("Todos")) || [];

  var todo = { title, location, discription }
  todo.id = Math.random().toString(36).slice(2);
  todo.dateCreated = new Date().getTime();
  todo.status = 'Active'

  var todos = JSON.parse(localStorage.getItem("Todos")) || []
  
    todos.push(todo);
  // console.log(todos);
  localStorage.setItem("Todos", JSON.stringify(todos));
  // todos.push(todo)

  // console.log("user has been adedd")
  swal("Poof! Your Todo/Task has been added!", {
    icon: "success",buttons: false,
    timer: 2000,
  });
  showToastify("A new task has been added", "linear-gradient(to right, aqua, #38ef7d")
  clearInput();
  showTodo()

}


//-------- show Todo------
function showTodo() {
  // var todos= JSON.parse(localStorage.getItem("Todos")) 
  var todos = JSON.parse(localStorage.getItem("Todos")) || []


  if (!todos.length) {
    showOutput("<h5 style=color:#001c55;margin-top:10px>HURRAY! No Task available,Add a task button to add your task</h5>")
    // showToastify("There is no single user available." ,"linear-gradient(to right, pink, red)");
    return;
  }

  let tabStringCode = '<div style="color:red" class="table-responsive"><table class="table">';
  let tableHead = '<thead style="color:#001c55" ><tr ><th scope="col">#</th><th scope="col">Title</th><th scope="col">Location</th><th scope="col">Discription</th><th scope="col">Actions</th></tr></thead>';
  let tabEndCode = '</table></div>';

  let tableBody = "";
  for (let i = 0; i < todos.length; i++) {
    // tableBody +='<tr><th scope="row">'+(i+1)+ '</th><td>'+(todos[i].title)+'</td><td>'+(todos[i].location)+'</td><td>'+(todos[i].discription)+'</td><td><class=btn btn-small></td><tr>'

    // OR USE THE TEMP LITERAL
    let todo = todos[i];
    tableBody += `<tr><th scope="row">${i + 1}</th><td>${todo.title}</td><td>${todo.location}</td><td>${todo.discription}</td><td><button class="btn btn-sm btn-info mb-2 mb-md-0 me-0 me-md-1 data-value="${todo.id} " onclick="editTodo(event)" ><i data-value="${todo.id}" class="fa-solid fa-pen"></i></button><button class="btn btn-sm btn-danger mb-2 mb-md-0 me-0 me-md-1 " data-value="${todo.id}" onclick="deleteTodo(event)"  ><i data-value="${todo.id}" class="fa-solid fa-trash"></i></button></td><tr>`


  }
  let table = tabStringCode + tableHead + '<tbody style="color:#001c55">' + tableBody + '</tbody>' + tabEndCode;
  showOutput(table)
}
// editTodo
const editTodo = (event) => {
  swal({
    title: "Update!",
    text: "Do you want to update this Todo/Task?",
    icon: "info",
    buttons: ["cancel", "Yes"],
    // button: "cancel",

    // buttons: true,
    infoMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      let todoId = event.target.getAttribute('data-value')
      // console.log(todoId)
      const todos = JSON.parse(localStorage.getItem("Todos"));
    
      let todo = todos.find((todo) => {
        return todo.id === todoId;
      })
      // console.log(todo)
      const { title, location, discription } = todo
      // console.log(todo)
      setValue("title", title)
      setValue("location", location)
      setValue("discription", discription)
    
      localStorage.setItem("editTodo", JSON.stringify(todo))
      document.getElementById("addButton").style.display = "none"
      document.getElementById("updateButton").style.display = "block"
      swal("Poof! Portal is open for updating", {
        icon: "success",
        buttons: false,timer: 2000,
      });
    } else {
      swal({text:"Your Todo/Task is not updated!",
        icon: "error",buttons: false,
        timer: 2000,})
      };
    
  });
}

// handleEdit
const handleEdit = () => {
  const editTodo = JSON.parse(localStorage.getItem("editTodo"));
  let updatedTitle = getValue("title")
  let updatedLocation = getValue("location")
  let updatedDiscription = getValue("discription")

  const updatedTodo = { ...editTodo, title: updatedTitle, location: updatedLocation, discription: updatedDiscription }
  updatedTodo.dataModified = new Date().getTime();
  console.log(updatedTodo)

  const todos = JSON.parse(localStorage.getItem("Todos"));
  let todosAfterUpdated = todos.map((todo) => {
    if (todo.id === editTodo.id)
      return updatedTodo
    return todo
  })
  localStorage.setItem("Todos", JSON.stringify(todosAfterUpdated))
  // showToastify("A new task has been updated", "linear-gradient(to right, aqua, #38ef7d")
  swal({text:"Your task is updated successfully",
  icon:"success",buttons: false,
  timer: 2000,})
  clearInput();
  showTodo()
  document.getElementById("addButton").style.display = "block"
  document.getElementById("updateButton").style.display = "none"
}


// ---Deletodo
  const deleteTodo=(event)=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Todo/Task!",
      icon: "warning",
      buttons: ["cancel", "Delete"],
      // button: "cancel",

      // buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        let todoId=event.target.getAttribute('data-value')
             // console.log(todoId)
                  const todos= JSON.parse(localStorage.getItem("Todos"));
              
                  let todoAfterDelete=todos.filter((todo) => {
                    return todo.id !==todoId;
                  })
                  localStorage.setItem("Todos",JSON.stringify(todoAfterDelete))
                  // showToastify("A Todo has been deleted successfully ","linear-gradient(to right, aqua, #38ef7d")
                  showTodo()
        swal("Poof! Your Todo/Task has been deleted!", {
          icon: "success",buttons: false,
          timer: 2000,
        });
      } else {
        swal("Don't Worry!Your Todo/Task is safe!",{
          button: false,timer: 3000,
        });
      }
    });
  }
  
  
