// Person class
class Person {
    constructor(name, address, email, phone) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }

    displayInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Address: ${this.address}`);
        console.log(`Email: ${this.email}`);
        console.log(`Phone: ${this.phone}`);
    }
}

// Validate Name
function validateName(name) {
    return /^[a-zA-Z\s]+$/.test(name);
}

// Validate Address
function validateAddress(address) {
    return address.trim().length > 0;
}

// Validate Phone Number
function validatePhoneNumber(phone) {
    return /^\d{10}$/.test(phone) && !phone.startsWith('0');
}

// Validate Email
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate Form
function validateForm(event) {
    const form = document.getElementById('order-form');
    const name = form['recipient-name'].value;
    const address = form['address'].value;
    const email = form['email'].value;
    const phone = form['phone'].value;

    if (!validateName(name)) {
        alert("Please enter a valid name containing only letters and spaces.");
        event.preventDefault();
        return false;
    }

    if (!validateAddress(address)) {
        alert("Address cannot be empty.");
        event.preventDefault();
        return false;
    }

    if (!validatePhoneNumber(phone)) {
        alert("Please enter a valid 10-digit phone number without leading zeros.");
        event.preventDefault();
        return false;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
        return false;
    }

    return true;
}

// Calculate T-Shirt Price based on material and quantity
function calculatePrice() {
    const material = document.getElementById('material').value;
    const quantity = document.getElementById('quantity').value;
    let pricePerShirt;

    switch (material) {
        case 'cotton':
            pricePerShirt = 600;
            break;
        case 'polyester':
            pricePerShirt = 400;
            break;
        case 'blend':
            pricePerShirt = 500;
            break;
        default:
            pricePerShirt = 0;
    }

    const totalPrice = pricePerShirt * quantity;
    document.getElementById('price').textContent = totalPrice.toFixed(2);
}

// Update price when material or quantity changes
document.getElementById('material').addEventListener('change', calculatePrice);
document.getElementById('quantity').addEventListener('input', calculatePrice);

// Process Order
function processOrder(event) {
    event.preventDefault();
    if (!validateForm(event)) return;

    const form = document.getElementById('order-form');
    const name = form['recipient-name'].value;
    const address = form['address'].value;
    const email = form['email'].value;
    const phone = form['phone'].value;
    const quantity = form['quantity'].value;
    const price = document.getElementById('price').textContent;

    const person = new Person(name, address, email, phone);
    person.displayInfo();

    const date = new Date();
    const receipt = `
        <h1>Receipt</h1>
        <p>Thank you for your order, ${name}!</p>
        <p>Order Details:</p>
        <ul>
            <li>Address: ${address}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phone}</li>
            <li>Quantity: ${quantity}</li>
            <li>Total Price: $${price}</li>
        </ul>
        <p>Receipt generated on: ${date.toDateString()}</p>
    `;

    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
        <html>
        <head>
            <title>Order Receipt</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #28a745; }
                p, ul { font-size: 16px; }
            </style>
        </head>
        <body>${receipt}</body>
        </html>
    `);
    receiptWindow.document.close();
    receiptWindow.print();

    form.reset();
    document.getElementById('price').textContent = "0.00";
}

// Attach validation and processing functions
document.getElementById('order-form').addEventListener('submit', processOrder);
