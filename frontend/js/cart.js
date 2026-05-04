const BOOK_API = "http://localhost:8080/api/books";
const CART_API = "http://localhost:8080/api/cart";

/*
  Get logged in user safely
*/
function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}

/*
  Redirect to login if user not logged in
*/
function getUserIdOrRedirect() {
    const user = getLoggedInUser();

    if (!user || !user.id) {
        alert("Please login first");
        window.location.href = "login.html";
        return null;
    }

    return user.id;
}

/*
  Load selected book details
*/
async function loadBookDetails() {
    const bookId = localStorage.getItem("selectedBookId");

    if (!bookId) {
        document.getElementById("bookDetails").innerHTML =
            "<h3>No book selected</h3>";
        return;
    }

    try {
        const res = await fetch(`${BOOK_API}/${bookId}`);

        if (!res.ok) {
            throw new Error("Failed to fetch book");
        }

        const book = await res.json();

        const user = JSON.parse(localStorage.getItem("loggedInUser"));

        const addToCartSection =
            user?.role === "ADMIN"
                ? ""
                : `
                    <input type="number" id="qty" min="1" max="${book.stock}" value="1">
                    <button onclick="addToCart(${book.id})">Add to Cart</button>
                  `;

        document.getElementById("bookDetails").innerHTML = `
            <img src="${book.imageUrl}" width="300">
            <h2>${book.title}</h2>
            <p>${book.description}</p>
            <p><strong>Price:</strong> ₹${book.price}</p>
            <p><strong>Available:</strong> ${book.stock} in stock</p>

            ${addToCartSection}
        `;

    } catch (error) {
        document.getElementById("bookDetails").innerHTML =
            "<h3>Failed to load book details</h3>";

        console.error(error);
    }
}

/*
  Add book to cart
*/
async function addToCart(bookId) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        alert("Please login first");
        return;
    }

    const quantity = parseInt(document.getElementById("qty").value);

    await fetch(`${CART_API}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: user.id,
            bookId: bookId,
            quantity: quantity
        })
    });

    alert("Added to Cart!");
}

/*
  Logout Function
*/
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully");
    window.location.href = "login.html";
}

/*
  Run only on book-details page
*/
if (document.getElementById("bookDetails")) {
    loadBookDetails();
}