

const user = JSON.parse(localStorage.getItem("loggedInUser"));
const userId = user?.id;
const CART_URL = "http://localhost:8080/api/cart";
const ORDER_URL = "http://localhost:8080/api/orders";

if (!userId) {
    alert("Please login first");
    window.location.href = "login.html";
}

async function loadCart() {
    const res = await fetch(`${CART_URL}/${userId}`);
    const cartItems = await res.json();

    let total = 0;

    const cartDiv = document.getElementById("cartItems");

    cartDiv.innerHTML = "";

    cartItems.forEach(item => {
        total += item.book.price * item.quantity;

        cartDiv.innerHTML += `
    <div class="cart-item">
        <img src="${item.book.imageUrl}" alt="${item.book.title}" class="cart-img">

        <div class="cart-info">
            <h3>${item.book.title}</h3>
            <p>Price: ₹${item.book.price}</p>
            <p>Available: ${item.book.stock}</p>

            <div class="qty-controls">
                <button onclick="changeQty(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${item.id}, ${item.quantity + 1})">+</button>
            </div>

            <button class="remove-btn" onclick="removeItem(${item.id})">
                Remove
            </button>
        </div>
    </div>
`;
    });

    document.getElementById("totalPrice").innerText = `Total: ₹${total}`;
}

async function removeItem(cartId) {
    await fetch(`${CART_URL}/${cartId}`, {
        method: "DELETE"
    });

    loadCart();
}

async function checkout() {
    await fetch(`${ORDER_URL}/checkout/${userId}`, {
        method: "POST"
    });

    alert("Order Placed Successfully!");
    window.location.reload();
}

async function changeQty(cartId, quantity) {
    if (quantity < 1) return;

    await fetch(`${CART_URL}/${cartId}/quantity/${quantity}`, {
        method: "PUT"
    });

    loadCart();
}

loadCart();