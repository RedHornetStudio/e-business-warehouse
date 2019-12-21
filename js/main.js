function openAddNewProductForm() {
    location.href = 'add.html';
}

function addProduct() {
    var title = document.getElementById('title');
    var description = document.getElementById('description');
    var price = document.getElementById('price');
    var stock = document.getElementById('stock');
    var titleError = document.getElementById('title-error');
    var descriptionError = document.getElementById('description-error');
    var priceError = document.getElementById('price-error');
    var stockError = document.getElementById('stock-error');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var errors = JSON.parse(this.responseText);
            if(errors['title'] != "" || errors['description'] != "" || errors['price'] != "" || errors['stock'] != "") {
                titleError.textContent = errors['title'];
                descriptionError.textContent = errors['description'];
                priceError.textContent = errors['price'];
                stockError.textContent = errors['stock'];
            } else if(errors['connection'] != "" || errors['query'] != "") {
                alert(errors['connection'] + errors['query']);
            } else {
                location.href = 'index.html';
            }
        }
    };
    xhttp.open("POST", "includes/add.inc.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('title=' + encodeURIComponent(title.value) + '&description=' + encodeURIComponent(description.value) +
        '&price=' + encodeURIComponent(price.value) + '&stock=' + encodeURIComponent(stock.value));
}

function addProductsInTable() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if(result.connectionError != '' || result.queryError != '') {
                alert(result.connectionError + result.queryError);
            } else {
                var productsTable = document.getElementById('products-table')
                result.products.forEach(function(value) {
                    var tr = document.createElement('tr');
                    tr.id = value.id;

                    var id = document.createElement('td');
                    id.innerText = value.id;
                    tr.appendChild(id);

                    var title = document.createElement('td');
                    title.innerText = value.title;
                    tr.appendChild(title);

                    var description = document.createElement('td');
                    description.innerText = value.descrip;
                    tr.appendChild(description);

                    var price = document.createElement('td');
                    price.innerText = value.price;
                    tr.appendChild(price);

                    var stock = document.createElement('td');
                    stock.innerText = value.stock;
                    tr.appendChild(stock);

                    var delTd = document.createElement('td');
                    var deleteButton = document.createElement('button');
                    deleteButton.addEventListener("click", function() {
                        deleteProduct(value.id);
                    });
                    deleteButton.innerText = 'DELETE';

                    var updateButton = document.createElement('button');
                    updateButton.innerText = 'UPDATE';
                    updateButton.style.marginRight = '10px';
                    updateButton.addEventListener("click", function() {
                        document.getElementById('input_update_row').value = value.id;
                        document.getElementById('form_update_row').submit();
                    });

                    delTd.style.backgroundColor = 'rgb(170, 170, 170)';
                    delTd.style.width = '145px';
                    delTd.appendChild(updateButton);
                    delTd.appendChild(deleteButton);
                    tr.appendChild(delTd);

                    productsTable.appendChild(tr);
                });
            }
        }
    };
    xhttp.open("POST", "includes/get.inc.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('get=all');
}

function updateProduct(id) {
    var title = document.getElementById('title');
    var description = document.getElementById('description');
    var price = document.getElementById('price');
    var stock = document.getElementById('stock');
    var titleError = document.getElementById('title-error');
    var descriptionError = document.getElementById('description-error');
    var priceError = document.getElementById('price-error');
    var stockError = document.getElementById('stock-error');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var errors = JSON.parse(this.responseText);
            if(errors['title'] != "" || errors['description'] != "" || errors['price'] != "" || errors['stock'] != "") {
                titleError.textContent = errors['title'];
                descriptionError.textContent = errors['description'];
                priceError.textContent = errors['price'];
                stockError.textContent = errors['stock'];
            } else if(errors['connection'] != "" || errors['query'] != "") {
                alert(errors['connection'] + errors['query']);
            } else {
                location.href = 'index.html';
            }
        }
    };
    xhttp.open("POST", "includes/update.inc.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('title=' + encodeURIComponent(title.value) + '&description=' + encodeURIComponent(description.value) +
        '&price=' + encodeURIComponent(price.value) + '&stock=' + encodeURIComponent(stock.value) + '&id=' + encodeURIComponent(id));
}

function getOneProduct(id) {

    if(id != '') {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                if(result.connectionError != '' || result.queryError != '' || result.requestError != '') {
                    alert(result.connectionError + result.queryError + result.requestError);
                } else {
                    if(result.products.length != 0) {
                        var title = document.getElementById('title');
                        title.value = result.products[0].title;
                        var description = document.getElementById('description');
                        description.value = result.products[0].descrip;
                        var price = document.getElementById('price');
                        price.value = result.products[0].price;
                        var stock = document.getElementById('stock');
                        stock.value = result.products[0].stock;
                    }
                }
            }
        };
        xhttp.open("POST", "includes/get.inc.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('get=' + encodeURIComponent(id));
    }
}

function deleteProduct(id) {
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                if(result.connectionError != '' || result.queryError != '' || result.requestError != '') {
                    alert(result.connectionError + result.queryError + result.requestError);
                } else {
                    var element = document.getElementById(id);
                    element.parentNode.removeChild(element);
                }
            }
        };
        xhttp.open("POST", "includes/delete.inc.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('delete=' + encodeURIComponent(id));
}
