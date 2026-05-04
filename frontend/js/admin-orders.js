async function loadOrders() {
    const res = await fetch("http://localhost:8080/api/orders/admin/orders");
    const orders = await res.json();

    const ordersList = document.getElementById("ordersList");
    ordersList.innerHTML = "";

    for (const order of orders) {
        const itemsRes = await fetch(
            `http://localhost:8080/api/orders/${order.id}/items`
        );

        const items = await itemsRes.json();

        let itemsHtml = items.map(item => `
            <li>${item.book.title} x ${item.quantity}</li>
        `).join("");

        ordersList.innerHTML += `
            <div class="book-card">
                <h3>Order #${order.id}</h3>
                <p>User ID: ${order.userId}</p>
                <p>Total: ₹${order.totalAmount}</p>
                <p>Status: ${order.status}</p>
                <ul>${itemsHtml}</ul>
            </div>
        `;
    }
}

loadOrders();