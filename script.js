document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const showReceiptBtn = document.getElementById('show-receipt-btn');
    const receiptModal = document.getElementById('receipt-modal');
    const closeModal = document.getElementById('close-modal');
    const customerNameInput = document.getElementById('customer-name');
    const customerAddressInput = document.getElementById('customer-address');
    const customerPhoneInput = document.getElementById('customer-phone');
    const notaTotal = document.getElementById('nota-total');
    const notaItems = document.getElementById('nota-items');
    const generateQrBtn = document.getElementById('generate-qr-btn');
    const downloadReceiptBtn = document.getElementById('download-receipt-btn');
    const downloadQrBtn = document.getElementById('download-qr-btn');
    const qrDisplay = document.getElementById('qr-display');

    // Contoh fungsi untuk menambahkan item ke keranjang
    function addToCart(menuItem, price, quantity) {
        const total = parseInt(totalAmount.innerText) || 0;

        // Membuat baris baru untuk keranjang
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${menuItem}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>${price * quantity}</td>
        `;
        cartItems.appendChild(row);

        // Memperbarui total amount
        totalAmount.innerText = total + (price * quantity);
    }

    // Contoh: Simulasikan menambahkan item menu ke keranjang
    addToCart("Ayam Penyet", 30000, 2); // Menambahkan item menu dengan nama, harga, dan kuantitas

    showReceiptBtn.addEventListener('click', () => {
        const rows = cartItems.querySelectorAll('tr');
        notaItems.innerHTML = '';
        rows.forEach(row => {
            notaItems.appendChild(row.cloneNode(true));
        });
        notaTotal.innerText = totalAmount.innerText;
        receiptModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        receiptModal.style.display = 'none';
    });

    generateQrBtn.addEventListener('click', () => {
        const total = totalAmount.innerText;
        const qrCode = document.createElement('img');
        qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?data=Total%20Pembayaran%3A%20${total}&size=200x200`;
        qrDisplay.innerHTML = '';
        qrDisplay.appendChild(qrCode);
        qrDisplay.style.display = 'block';
    });

    downloadReceiptBtn.addEventListener('click', () => {
        html2canvas(document.querySelector("#receipt-modal")).then(canvas => {
            const link = document.createElement('a');
            link.download = 'nota.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    downloadQrBtn.addEventListener('click', () => {
        const qrCodeImg = qrDisplay.querySelector('img');
        if (qrCodeImg) {
            const link = document.createElement('a');
            link.download = 'qr_code.png';
            link.href = qrCodeImg.src;
            link.click();
        }
    });
});
