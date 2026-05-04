const API_URL = "http://localhost:8080/api/books";

let books = [];

async function fetchBooks() {
    const res = await fetch(API_URL);
    books = await res.json();
    displayBooks(books);
}

function displayBooks(bookList) {
    const bookContainer = document.getElementById("bookList");

    bookContainer.innerHTML = "";

    bookList.forEach(book => {
        bookContainer.innerHTML += `
            <div class="book-card">
                <img src="${book.imageUrl}" 
     onerror="this.src='https://via.placeholder.com/300x400?text=No+Image'">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>₹${book.price}</p>
                <button onclick="viewBook(${book.id})">View Details</button>
            </div>
        `;
    });
}

function viewBook(id) {
    localStorage.setItem("selectedBookId", id);
    window.location.href = "book-details.html";
}

document.getElementById("search").addEventListener("input", function() {
    const keyword = this.value.toLowerCase();

    const filtered = books.filter(book =>
        book.title.toLowerCase().includes(keyword)
    );

    displayBooks(filtered);
});

fetchBooks();