document.getElementById('show-receipt-btn').addEventListener('click', function() {
    // Gather customer information and total
    const total = document.getElementById('total-amount').innerText;
    const customerName = prompt("Masukkan Nama Pelanggan:");
    const customerAddress = prompt("Masukkan Alamat Pelanggan:");
    const customerPhone = prompt("Masukkan Nomor Telepon Pelanggan:");

    // Populate the receipt modal
    document.getElementById('nota-total').innerText = total;
    document.getElementById('customer-name').innerText = customerName;
    document.getElementById('customer-address').innerText = customerAddress;
    document.getElementById('customer-phone').innerText = customerPhone;

    // Populate nota items
    const cartItems = document.getElementById('cart-items').children;
    const notaItems = document.getElementById('nota-items');
    notaItems.innerHTML = ''; // Clear previous items

    for (let item of cartItems) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.children[0].innerText}</td>
            <td>${item.children[1].innerText}</td>
            <td>${item.children[2].innerText}</td>
            <td>${item.children[3].innerText}</td>
        `;
        notaItems.appendChild(row);
    }

    // Show the receipt modal
    document.getElementById('receipt-modal').style.display = 'block';
});

// Close modal
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('receipt-modal').style.display = 'none';
});

// Download receipt as image
document.getElementById('download-receipt-btn').addEventListener('click', function() {
    html2canvas(document.querySelector('.modal-content')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'nota_pembayaran.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

// Download QR code (assuming you have generated a QR code and added it to #qr-display)
document.getElementById('download-qr-btn').addEventListener('click', function() {
    const qrCode = document.getElementById('qr-display').firstChild; // Assuming the QR code is the first child
    const link = document.createElement('a');
    link.download = 'qr_code.png';
    link.href = qrCode.src;
    link.click();
});

// Example QR code generation (add your QR code generation logic here)
document.getElementById('generate-qr-btn').addEventListener('click', function() {
    // Replace this with actual QR code generation logic
    const qrDisplay = document.getElementById('qr-display');
    qrDisplay.innerHTML = ''; // Clear previous QR code
    const qrCodeImg = document.createElement('img');
    qrCodeImg.src = 'https://api.qrserver.com/v1/create-qr-code/?data=YourDataHere'; // Replace with your data
    qrDisplay.appendChild(qrCodeImg);
    qrDisplay.style.display = 'block';
});
