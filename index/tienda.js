document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cart-button');
    const cart = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const alertModal = document.getElementById('alert-modal');
    const alertMessage = document.getElementById('alert-message');
    const alertClose = document.getElementById('alert-close');

    // Función para obtener datos del carrito desde el localStorage
    function getCartData() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    // Función para guardar datos del carrito en el localStorage
    function saveCartData(cartData) {
        localStorage.setItem('cart', JSON.stringify(cartData));
    }

    // Función para mostrar un mensaje de alerta en el centro de la pantalla
    function showAlert(message) {
        alertMessage.textContent = message;
        alertModal.style.display = 'flex';
    }

    // Función para ocultar la alerta
    function hideAlert() {
        alertModal.style.display = 'none';
    }

    // Función para actualizar el carrito en la interfaz
    function updateCart() {
        const cartData = getCartData();
        cartItems.innerHTML = '';
        let total = 0;

        cartData.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - $${item.price} 
                <span class="remove-item" data-name="${item.name}">Eliminar</span>`;
            cartItems.appendChild(li);
            total += item.price;
        });

        cartCount.textContent = cartData.length;
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Función para mostrar u ocultar el carrito
    function toggleCart() {
        cart.style.display = (cart.style.display === 'block') ? 'none' : 'block';
    }

    // Manejar el botón de mostrar/ocultar carrito
    cartButton.addEventListener('click', toggleCart);

    // Manejar el botón de agregar al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            if (isNaN(price) || !name) {
                console.error('Datos inválidos para agregar al carrito.');
                return;
            }

            let cartData = getCartData();
            cartData.push({ name, price });
            saveCartData(cartData);
            updateCart();
            showAlert(`"${name}" ha sido añadido al carrito por $${price.toFixed(2)}`);
        });
    });

    // Manejar la eliminación de ítems del carrito
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const name = e.target.getAttribute('data-name');
            if (!name) {
                console.error('Nombre del ítem no encontrado para eliminar.');
                return;
            }

            let cartData = getCartData();
            cartData = cartData.filter(item => item.name !== name);
            saveCartData(cartData);
            updateCart();
            showAlert(`"${name}" ha sido eliminado del carrito.`);
        }
    });

    // Manejar el cierre de la alerta
    alertClose.addEventListener('click', hideAlert);

    // Inicializar el carrito
    updateCart();
});
