
document.addEventListener('DOMContentLoaded', () => {
    const elementosCarousel = document.querySelectorAll('.carousel');
    M.Carousel.init(elementosCarousel, {
        duration: 150,
        dist: -80,
        shift: 5,
        padding: 5,
        numVisible: 3,
        indicators: true,
        noWrap: false
    });
});
// Definition of the difents parameter
var productName = document.getElementById('productName');
var productDesc = document.getElementById('productDesc');
var productPrice = document.getElementById('productPrice');
var productBtn = document.getElementById('productBtn');
var productImg = document.getElementById('productImg');
var formControl = document.getElementsByClassName('form-control');
var myClose = document.getElementsByClassName('myClose');
var mySearchInp = document.getElementById('mySearchInp');
var productHeadline = document.getElementById('productHeadline');
var dataRow = document.getElementById('dataRow');
var productContainer;
var currentIndex = 0;

//check for local storage at begining
if (localStorage.getItem('productsStorage') == null) {
    productContainer = [];
    productHeadline.style.display = 'none';
    searchItem.style.display = 'none';
} else {
    productContainer = JSON.parse(localStorage.getItem('productsStorage'));
    showProducts();
}

//check for empty fields to disable button
disableBtn();

productBtn.addEventListener('click', function () {
    if (productBtn.innerHTML == 'Add product') {
        addProducts();
        showAlert();
        showProducts();
        emptyFields();
    } else {
        saveUpdate();
        emptyFields();
    }

});


function disableBtn() {
    for (var i = 0; i < formControl.length - 1; i++) {
        if (formControl[i].value == '') {
            productBtn.disabled = true;
        } else {
            productBtn.removeAttribute('disabled');
        }
    }
}

//Add product in the local storage
function addProducts() {

    var products = {
        productName: productName.value,
        productImg: productImg.value,
        productDesc: productDesc.value,
        productPrice: productPrice.value
    };
    productContainer.push(products);
    localStorage.setItem('productsStorage', JSON.stringify(productContainer));

}

//read list of products
function showProducts() {
    var rows = '<div class="carousel center-align">';
    for (var i = 0; i < productContainer.length; i++) {
        rows += ' <div class="carousel-item">     <div class="card p-1  m-auto" style="width: 100%;">          <div class="d-flex justify-content-between"><i class="fas fa-edit fa-2x"onclick="updateProduct(' + i + ')"></i><i class="fa fa-times-circle fa-2x "onclick="deleteItem(' + i + ')"></i></div></div>    <h2 class="subtitulo">' + productContainer[i].productName + '</h2>           <div class="linea-division"></div>                   <p class="sabor">' + productContainer[i].productDesc + '</p><img src=' + productContainer[i].productImg + ' alt="">                      </div>        ';
    }
    rows += '   </div>'
    document.getElementById('dataRow').innerHTML = rows;
    productContainer = JSON.parse(localStorage.getItem('productsStorage'));
    productHeadline.style.display = 'block';
    searchItem.style.display = 'block';
}

//Update de product in the local storage
function updateProduct(index) {
    productName.value = productContainer[index].productName;
    productDesc.value = productContainer[index].productDesc;
    productPrice.value = productContainer[index].productPrice;
    productImg.value = productContainer[index].productImg;
    productBtn.innerHTML = 'update product';
    currentIndex = index;
}

//save of update in the local storage
function saveUpdate() {
    var products = {
        productName: productName.value,
        productDesc: productDesc.value,
        productPrice: productPrice.value,
        productImg: productImg.value
    };
    productContainer[currentIndex] = products;
    localStorage.setItem('productsStorage', JSON.stringify(productContainer));
    showProducts();
    productBtn.innerHTML = 'Add product';
}

function emptyFields() {
    for (var i = 0; i < formControl.length; i++) {
        formControl[i].value = '';
    }
    disableBtn();
}

function deleteItem(item) {
    productContainer.splice(item, 1);
    localStorage.setItem('productsStorage', JSON.stringify(productContainer));
    showProducts();
}

mySearchInp.addEventListener('keyup', function (e) {

    var rows = '';
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].productName.toLowerCase().includes(e.target.value.toLowerCase())) {
            rows += '<div class="col-lg-4 col-md-6 col-sm-12 my-2 products"><div class="product"><div class="card p-1 text-center m-auto" style="width: 18rem;"><div class="d-flex justify-content-between"><i class="fas fa-edit fa-2x" onclick="updateProduct(' + i + ')"></i><i class="fa fa-times-circle fa-2x" onclick="deleteItem(' + i + ')"></i></div><img class="img-fluid" "   src=' + productContainer[i].productImg + ' class="card-img-top" alt="test"><div class="card-body"><h5 class="card-title">' + productContainer[i].productName + '</h5><p class="card-text">' + productContainer[i].productDesc + '</p></div></div></div></div>';
        }
    }
    document.getElementById('dataRow').innerHTML = rows;
});
