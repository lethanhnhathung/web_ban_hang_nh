

document.addEventListener('DOMContentLoaded', async function() {
    const path = window.location.pathname;
const id = path.split('/').pop();
const product = await fetch("http://localhost:3000/product/getProductById", { 
        method: 'post', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        _id: id
    }),})
        .then(response => response.json())
        .then(response => response.content)
        .catch(error => []);

        console.log(product)
        // lấy tham chiếu đến các phần tử trong form
const nameField = document.querySelector('.name');
const priceField = document.querySelector('.price');
const addressField = document.querySelector('.address');
const phoneField = document.querySelector('.phone');
const imgField = document.querySelector('.card-img-top');

imgField.setAttribute('src', product.image);

// thiết lập giá trị cho các phần tử
nameField.innerHTML = product.name;
priceField.innerHTML = product.price + "VNĐ" + '/' + product.unit;
addressField.innerHTML = product.address;
phoneField.innerHTML = product.users.phone;
});