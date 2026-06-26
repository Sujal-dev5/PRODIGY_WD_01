const API_URL = "http://localhost:5000/api/auth";

async function register() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
    document.getElementById("confirmPassword").value;

      if(name==="" || email==="" || password===""){
         alert("Please fill all fields");
         return;
       }

       if(password!==confirmPassword){
         alert("Passwords do not match");
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

        alert("Server Error");

    }

}
const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){
    alert("Enter valid email");
    return;
}

const passwordPattern =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if(!passwordPattern.test(password)){
    alert(
"Password must contain:\n\
• 8 characters\n\
• Uppercase\n\
• Lowercase\n\
• Number"
);
    return;
}

function togglePassword() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const type = password.type === "password" ? "text" : "password";

    password.type = type;
    confirmPassword.type = type;
}