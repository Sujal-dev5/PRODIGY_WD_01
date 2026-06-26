const API_URL = "http://localhost:5000/api/auth";

async function register() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check empty fields
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill all fields");
        return;
    }

    // Check password match
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Enter a valid email");
        return;
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordPattern.test(password)) {
        alert(
            "Password must contain:\n\n" +
            "• Minimum 8 characters\n" +
            "• One uppercase letter\n" +
            "• One lowercase letter\n" +
            "• One number"
        );
        return;
    }

    try {

        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.name);

            alert("Registration Successful");

            window.location.href = "dashboard.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);
        alert("Server Error");

    }

}

function togglePassword() {

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    if (password.type === "password") {
        password.type = "text";
        confirmPassword.type = "text";
    } else {
        password.type = "password";
        confirmPassword.type = "password";
    }

}