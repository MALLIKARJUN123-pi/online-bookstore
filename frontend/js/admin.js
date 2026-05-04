const BOOK_API = "http://localhost:8080/api/books";

const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user || user.role !== "ADMIN") {
    alert("Access Denied");
    window.location.href = "index.html";
}

async function loadBooks() {
    const res = await fetch(BOOK_API);
    const books = await res.json();

    const container = document.getElementById("adminBookList");
    container.innerHTML = "";

    books.forEach(book => {
        container.innerHTML += `
            <div class="book-card">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>₹${book.price}</p>

                <button onclick='editBook(${JSON.stringify(book)})'>
                    Edit
                </button>

                <button onclick='deleteBook(${book.id})'>
                    Delete
                </button>
            </div>
        `;
    });
}

function editBook(book) {
    document.getElementById("bookId").value = book.id;
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("description").value = book.description;
    document.getElementById("price").value = book.price;
    document.getElementById("imageUrl").value = book.imageUrl;
    document.getElementById("stock").value = book.stock;
}

async function saveBook() {
    const id = document.getElementById("bookId").value;

    const book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        imageUrl: document.getElementById("imageUrl").value,
        stock: document.getElementById("stock").value
    };

    if (id) {
        await fetch(`${BOOK_API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)
        });
    } else {
        await fetch(BOOK_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)
        });
    }

    clearForm();
    loadBooks();
}

async function deleteBook(id) {
    await fetch(`${BOOK_API}/${id}`, {
        method: "DELETE"
    });

    loadBooks();
}

function clearForm() {
    document.getElementById("bookId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("imageUrl").value = "";
    document.getElementById("stock").value = "";
}

loadBooks();