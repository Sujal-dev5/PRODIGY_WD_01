const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

document.getElementById("username").innerText =
    "Welcome, " + localStorage.getItem("name");

function logout() {

    localStorage.clear();

    window.location.href = "login.html";

}