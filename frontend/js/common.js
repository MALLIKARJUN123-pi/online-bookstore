function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

function renderNavbar() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const currentPage = window.location.pathname.split("/").pop();

    let navHtml = "";

    // Home link except on homepage
    if (currentPage !== "index.html" && currentPage !== "") {
        navHtml += `<a href="index.html">Home</a>`;
    }

    // Cart ONLY for normal users
    if (user && user.role === "USER" && currentPage !== "cart.html") {
        navHtml += `<a href="cart.html">Cart</a>`;
    }

    // Admin link ONLY for admins
    if (user && user.role === "ADMIN") {
        navHtml += `<a href="admin.html">Admin</a>`;
    }

    // Login / Logout
    if (user) {
        navHtml += `<a href="#" onclick="logout()">Logout</a>`;
    } else {
        navHtml += `<a href="login.html">Login</a>`;
    }

    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
        navLinks.innerHTML = navHtml;
    }
}

renderNavbar();