// <!-- Single item -->
//             <div class="carousel-item active">
//             <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp" class="d-block w-100" alt="Sunset Over the City"/>
//             <div class="carousel-caption d-none d-md-block">
//                 <h5>First slide label</h5>
//                 <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//             </div>
//             </div>


document.addEventListener('DOMContentLoaded', async function() {
    // Lấy toàn bộ danh sách sản phẩm
    const allProducts = await fetch("http://localhost:3000/product/getAllProduct2")
        .then(response => response.json())
        .then(response => response.content)
        .catch(error => []);  

    const cardRow = document.getElementById("cardRow");

    allProducts.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("col-4");
    card.innerHTML = `
        <div class="card" style="width:100%;height:400px;display: flex;align-items: center;">
            <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light" style="height:60%">
            <img src="${item.image}" class="img-fluid"/>
            <a href="#!">
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </a>
            </div>
            <div class="card-body" style="text-align: center;">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.price} VNĐ/${item.unit}</p>
            <a href="http://localhost:3000/detail/${item._id}" class="btn btn-primary">Xem chi tiết</a>
            </div>
        </div>
    `;
    cardRow.appendChild(card);
    });

});

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click",async () => {
    const allProducts = await fetch("http://localhost:3000/product/getAllProduct2")
    .then(response => response.json())
    .then(response => response.content)
    .catch(error => []);

  const nameValue = document.getElementById("name").value.toLowerCase();
  const addressValue = document.getElementById("address").value.toLowerCase();
  const filteredData = allProducts.filter((item) => {
    const nameMatch = nameValue == "" ? false : item.name.toLowerCase().includes(nameValue);
    const addressMatch = addressValue == "" ? false : item.address.toLowerCase().includes(addressValue);
    return nameMatch || addressMatch;
  });

  const cardRow = document.getElementById("cardRow");
  cardRow.innerHTML = "";

  filteredData.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("col-4");
    card.innerHTML = `
        <div class="card" style="width:100%;height:400px;display: flex;align-items: center;">
            <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light" style="height:60%">
            <img src="${item.image}" class="img-fluid"/>
            <a href="#!">
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </a>
            </div>
            <div class="card-body" style="text-align: center;">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.price} VNĐ/${item.unit}</p>
            <a href="http://localhost:3000/detail/${item._id}" class="btn btn-primary">Xem chi tiết</a>
            </div>
        </div>
    `;
    cardRow.appendChild(card);
});
});

const refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click",async () => {
    const allProducts = await fetch("http://localhost:3000/product/getAllProduct2")
    .then(response => response.json())
    .then(response => response.content)
    .catch(error => []);

    const cardRow = document.getElementById("cardRow");
    cardRow.innerHTML = "";
    allProducts.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("col-4");
    card.innerHTML = `
        <div class="card" style="width:100%;height:400px;display: flex;align-items: center;">
            <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light" style="height:60%">
            <img src="${item.image}" class="img-fluid"/>
            <a href="#!">
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </a>
            </div>
            <div class="card-body" style="text-align: center;">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.price} VNĐ/${item.unit}</p>
            <a href="http://localhost:3000/detail/${item._id}" class="btn btn-primary">Xem chi tiết</a>
            </div>
        </div>
    `;
    cardRow.appendChild(card);
    });


});