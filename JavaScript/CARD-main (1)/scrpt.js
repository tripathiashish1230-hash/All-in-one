const fname = document.getElementById("FirstName");
const lname = document.getElementById("LastName");
const email = document.getElementById("Gmail");
const password = document.getElementById("Password");
const button = document.getElementById("button");
const tableBody = document.getElementById("tableBody");
const error = document.querySelectorAll(".error");

editindex = null;

let arr = JSON.parse(localStorage.getItem("userdata")) || [];

showData();

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailPattern.test(email);
}

function clearErrors() {
    error.forEach(e => e.innerHTML = "");
}

button.addEventListener("click", function (e) {
    e.preventDefault();

    clearErrors();

    if (fname.value.trim() === "") {
        error[0].innerHTML = "Enter the First Name";
        fname.focus();
        return;
    }

    if (lname.value.trim() === "") {
        error[1].innerHTML = "Enter the Last Name";
        lname.focus();
        return;
    }

    if (email.value.trim() === "") {
        error[2].innerHTML = "Enter the Email";
        email.focus();
        return;
    }

    if (!isValidEmail(email.value.trim())) {
        error[2].innerHTML = "Enter a valid Email";
        email.focus();
        return;
    }

    if (password.value.trim() === "") {
        error[3].innerHTML = "Enter the Password";
        password.focus();
        return;
    }

    if (password.value.trim().length < 8) {
        error[3].innerHTML = "Password must be at least 8 characters";
        password.focus();
        return;
    }

    let objdata = {
        F_Name: fname.value.trim(),
        L_Name: lname.value.trim(),
        Email: email.value.trim(),
        psd: password.value.trim(),
    };


    if (editindex === null) {
        arr.unshift(objdata);
    } else {
        arr[editindex] = objdata;
        editindex = null;
        button.innerText = "Submit";

    }

    localStorage.setItem("userdata", JSON.stringify(arr));

    showData();

    clear();
});

function showData() {
    let tabledata = "";

    arr.forEach((user, index) => {
        tabledata += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.F_Name}</td>
            <td>${user.L_Name}</td>
            <td>${user.Email}</td>
            <td>${user.psd}</td>
            <td>
                <button type="button" id="delete" onclick="deletedata(${index})">Delete</button>
                <button type="button" id="edit" onclick="editdata(${index})">Update</button>                                                                        </button>
            </td>
        </tr>`;
    });

    tableBody.innerHTML = tabledata;
}

function deletedata(index) {
    if (!confirm("Delete This Data")) return;

    arr.splice(index, 1);
    localStorage.setItem("userdata", JSON.stringify(arr));
    showData();
}

function editdata(index) {
    editindex = index;
    const edituser = arr[index];

    FirstName.value = edituser.F_Name;
    LastName.value = edituser.L_Name;
    email.value = edituser.Email;
    password.value = edituser.psd;

    button.innerText = "Update";
}
function clear() {
    fname.value = "";
    lname.value = "";
    email.value = "";
    password.value = "";
}