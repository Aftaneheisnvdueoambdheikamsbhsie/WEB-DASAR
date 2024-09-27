const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// Fungsi untuk memperbarui total harga di keranjang
function updateCartDisplay() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = ''; // Kosongkan isi sebelumnya
    let total = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        const totalPrice = item.price * item.quantity;
        total += totalPrice;

        row.innerHTML = `
            <td>${item.item}</td>
            <td>Rp ${item.price}</td>
            <td>${item.quantity}</td>
            <td>Rp ${totalPrice}</td>
        `;
        cartBody.appendChild(row);
    });

    document.getElementById('total').textContent = `Rp ${total}`;
    
    // Menampilkan tombol generate jika ada item di keranjang
    const generateQRButton = document.getElementById('generate-qr');
    const generateReceiptButton = document.getElementById('generate-receipt');
    if (cart.length > 0) {
        generateQRButton.style.display = 'inline-block';
        generateReceiptButton.style.display = 'inline-block';
    }
}

// Menghasilkan QR code
function generateQRCode() {
    const total = document.getElementById('total').textContent.replace('Rp ', '');
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=Total%20Pembayaran%3A%20Rp%20${total}&size=150x150`;
    const qrCodeImg = document.getElementById('qr-code');
    qrCodeImg.src = qrCodeUrl;
    
    document.getElementById('qr-container').style.display = 'block';
    document.getElementById('download-qr').href = qrCodeUrl;
    document.getElementById('download-qr').download = 'qr_code.png';
    document.getElementById('download-qr').style.display = 'inline-block';
}

// Menghasilkan nota
function generateReceipt() {
    let receiptText = 'Nota Belanja:\n\n';
    cart.forEach(item => {
        const totalPrice = item.price * item.quantity;
        receiptText += `${item.item} - Rp ${item.price} x ${item.quantity} = Rp ${totalPrice}\n`;
    });
    receiptText += `\nTotal: Rp ${document.getElementById('total').textContent.replace('Rp ', '')}`;
    
    document.getElementById('receipt').textContent = receiptText;
    document.getElementById('receipt-container').style.display = 'block';
    document.getElementById('download-receipt').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(receiptText);
    document.getElementById('download-receipt').download = 'nota.txt';
    document.getElementById('download-receipt').style.display = 'inline-block';
}

// Menyimpan informasi pelanggan dan mengupdate tampilan keranjang
document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah refresh halaman
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;
    
    alert(`Informasi Pelanggan Disimpan:\nNama: ${customerName}\nTelepon: ${customerPhone}\nAlamat: ${customerAddress}`);
});

// Menampilkan daftar item ketika halaman dimuat
window.onload = function() {
    updateCartDisplay();

    document.getElementById('generate-qr').addEventListener('click', generateQRCode);
    document.getElementById('generate-receipt').addEventListener('click', generateReceipt);
};
