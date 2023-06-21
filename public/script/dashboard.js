const logoutLink = document.getElementById('logout-link');
logoutLink.addEventListener('click', async function(event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
    try 
    {
        const response = await fetch( "http://localhost:3000/auth/logout", { method: 'post' })
        // Chuyển hướng đến trang khác nếu đăng nhập thành công
        window.location.href = '/login';
    } catch (error) {
        console.error(error);
        // Hiển thị thông báo lỗi nếu đăng nhập không thành công
        alert('Đang có lỗi xảy ra');
    }
});

document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch( "http://localhost:3000/auth/getUser", {
            method: 'post',
        })
        .then( response => response.json())
        .then( response => {
            //Trả về tất cả các tin tức
            return response;
        })
        .catch(( Error ) => {
            return  [];
        });
        console.log(response.content.name)
    document.getElementById('username').textContent = response.content.name;


    const perPage = 5; // số lượng bản ghi trên mỗi trang
    const tableBody = document.querySelector('#table-body');
    const paginationList = document.querySelector('.pagination');

    // Lấy toàn bộ danh sách sản phẩm
    const allProducts = await fetch("http://localhost:3000/product/getAllProduct")
        .then(response => response.json())
        .then(response => response.content)
        .catch(error => []);

    // Hiển thị trang đầu tiên
    showPage(1);

    // Tạo các nút phân trang
    for (let i = 1; i <= Math.ceil(allProducts.length / perPage); i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (i === 1) {
            li.classList.add('active');
        }
        const a = document.createElement('a');
        a.classList.add('page-link');
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', () => {
            showPage(i);
            const currentActive = paginationList.querySelector('.active');
            currentActive.classList.remove('active');
            li.classList.add('active');
        });
        li.appendChild(a);
        paginationList.insertBefore(li, paginationList.lastChild.previousSibling);
    }

    const nextButton = document.querySelector('.pagination .page-item:last-child .page-link');
    const prevButton = document.querySelector('.pagination .page-item:first-child .page-link');

    let currentPage = paginationList.querySelector('.active').textContent;

    nextButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(allProducts.length / perPage)) {
        currentPage++;
        showPage(currentPage);
        updatePagination();
    }
    });

    prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updatePagination();
    }
    });

    function updatePagination() {
    const pageLinks = document.querySelectorAll('.pagination .page-link');
    pageLinks.forEach(link => {
        if (link.textContent == currentPage) {
        link.parentElement.classList.add('active');
        } else {
        link.parentElement.classList.remove('active');
        }
    });
    }

    // Hiển thị bản ghi ở trang pageNum
    function showPage(pageNum) {
        const start = (pageNum - 1) * perPage;
        const end = pageNum * perPage;
        tableBody.innerHTML = allProducts.slice(start, end).map((item, index) => `
            <tr id=${item._id}>
                <th class="text-center" scope="row">${start + index + 1}</th>
                <td class="text-center">${item.name}</td>
                <td class="text-center">${item.price}</td>
                <td class="text-center">${item.unit}</td>
                <td class="text-center">
                    <span class="badge badge-${item.status == "Đang bán" ? "success" : "danger"} rounded-pill d-inline">${item.status}</span>
                </td>
                <td class="text-center">
                    <button type="button" class="btn btn-success" onclick="showModal('${item._id}')" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                        Xem chi tiết
                    </button>
                </td>
                <td class="text-center">
                    <button id = ${item._id} type="button" onclick="updateForm('${item._id}')" class="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal2">
                        Sửa
                        <i class="far fa-pen-to-square"></i>
                    </button>
                    ${item.status == "Đang bán" ? `<button id = ${item._id} type="button" onclick="deleteBtn('${item._id}')" class="btn btn-danger">Gỡ</button>` : ""}
                </button>
                </td>
            </tr>
        `).join('');
    }

});

// lấy giá trị của tham số "success" từ query string
const urlParams = new URLSearchParams(window.location.search);
const success = urlParams.get('success');

// nếu success = "true", hiển thị thông báo thành công
if (success === 'true') {
  const message = urlParams.get('message');
  alert(message);
}

async function showModal(itemId) {
    // Lấy thông tin của item từ server bằng itemId
    const product = await fetch("http://localhost:3000/product/getProductById", { 
        method: 'post', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        _id: itemId
    }),})
        .then(response => response.json())
        .then(response => response.content)
        .catch(error => []);

    // Hiển thị modal và truyền nội dung vào
    var modal = document.getElementById('exampleModal');

    var tenMatHang = modal.querySelector('#nameProduct');
    tenMatHang.value = product.name;

    var gia = modal.querySelector('#priceProduct');
    gia.value = product.price;

    var donVi = modal.querySelector('#unitProduct');
    donVi.value = product.unit;

    var trangThai = modal.querySelector('#statusProduct');
    trangThai.value = product.status;

    var image = modal.querySelector('img');
    image.src = product.image;
}

async function updateForm(itemId) {
    // Lấy thông tin của item từ server bằng itemId
    const product = await fetch("http://localhost:3000/product/getProductById", { 
        method: 'post', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        _id: itemId
    }),})
        .then(response => response.json())
        .then(response => response.content)
        .catch(error => []);

    // Hiển thị modal và truyền nội dung vào
    var modal = document.getElementById('exampleModal2');

    var tenMatHang = modal.querySelector('#_id');
    tenMatHang.value = itemId;

    var tenMatHang = modal.querySelector('#nameProduct');
    tenMatHang.value = product.name;

    var gia = modal.querySelector('#priceProduct');
    gia.value = product.price;

    var donVi = modal.querySelector('#unitProduct');
    donVi.value = product.unit;

    var trangThai = modal.querySelector('#statusProduct');
    trangThai.value = product.status;

    var image = modal.querySelector('img');
    image.src = product.image;
}

async function deleteBtn(itemId) {
    // Lấy thông tin của item từ server bằng itemId
    const response = await fetch("http://localhost:3000/product/updateStatus", { 
        method: 'post', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        _id: itemId
    }),})
        .then(response => response.json())
        .then(response => response.content)
        .catch(error => []);

        window.location.reload();
}

