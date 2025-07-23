let submit_btn = document.getElementById("addBtn");
let emp_name = document.getElementById("e_name");
let emp_salary = document.getElementById("e_salary");
let post = document.getElementById("post");
let manager = document.getElementById("manager");
let form = document.getElementById("form");
let emp_data = [];
let editIndex = null;
submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  let emp = {
    emp_name: emp_name.value,
    emp_salary: emp_salary.value,
    post: post.value,
    manager: manager.value,
  };
  emp_data.push(emp);
  display_emp_data();
  form.reset();
  alert("Employee added successfully!");
});
function display_emp_data() {
  let display = document.getElementById("tbody");
  display.innerHTML = "";
  emp_data.forEach((emp, index) => {
    let rows = `
   <tr>
        <td>${index + 1}</td>
        <td>${emp.emp_name}</td>
        <td>${emp.emp_salary}</td>
        <td>${emp.post}</td>
        <td>${emp.manager}</td>
        <td> <button class="btn btn-info btn-sm delete-btn" onclick="open_edit_modal(${index})">Edit</button>
        <button class="btn btn-danger btn-sm delete-btn" onclick="delete_data(${index})">Delete</button>
        </td>
   </tr>
   `;
    display.innerHTML += rows;
  });
}

function delete_data(index) {
  emp_data.splice(index, 1);
  display_emp_data();
}
function open_edit_modal(index) {
  editIndex = index;
  let emp = emp_data[index];
  let updateName = (document.getElementById("editName").value = emp.emp_name);
  let updateSalary = (document.getElementById("editSalary").value =
    emp.emp_salary);
  let updatePost = (document.getElementById("editPost").value = emp.post);
  let updateManager = (document.getElementById("editManager").value =
    emp.manager);

  let modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
}
function updateEmployee() {
  let updatedName = document.getElementById("editName").value;
  let updatedSalary = document.getElementById("editSalary").value;
  let updatedPost = document.getElementById("editPost").value;
  let updatedManager = document.getElementById("editManager").value;
  if (updatedName && updatedSalary && updatedPost && updatedManager) {
    emp_data[editIndex] = {
      emp_name: updatedName,
      emp_salary: updatedSalary,
      post: updatedPost,
      manager: updatedManager,
    };
    display_emp_data();

    let modalEl = document.getElementById("editModal");
    let modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}

function searchEmployee(e) {
  if (e) e.preventDefault(); // Prevent form submission
  let input = document.getElementById("searchBox").value.toLowerCase();
  let tableRow = document.querySelectorAll("#tbody tr");

  tableRow.forEach(function (row) {
    let name = row.cells[1].textContent.toLowerCase();
    if (name.includes(input)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}
