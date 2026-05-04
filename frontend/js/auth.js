const AUTH_API = "http://localhost:8080/api/auth";

async function signup() {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const res = await fetch(`${AUTH_API}/signup`, {
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

    const msg = await res.text();

    alert(msg);

    if (res.ok) {
        window.location.href = "login.html";
    }
}

async function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(`${AUTH_API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if (!res.ok) {
        alert("Invalid Credentials");
        return;
    }

    const user = await res.json();

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login Successful");

    if (user.role === "ADMIN") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "index.html";
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully");
    window.location.href = "login.html";
}