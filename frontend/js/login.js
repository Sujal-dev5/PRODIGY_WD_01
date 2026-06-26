const API_URL = "http://localhost:5000/api/auth";

async function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(`${API_URL}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.name);

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        alert("Server Error");

    }

}

function togglePassword() {
    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}