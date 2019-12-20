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
    xhttp.send('title=' + title.value + '&description=' + description.value + '&price=' + price.value + '&stock=' + stock.value);
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
                    deleteButton.id = value.id;
                    deleteButton.innerText = 'DELETE';

                    var updateButton = document.createElement('button');
                    updateButton.id = value.id;
                    updateButton.innerText = 'UPDATE';
                    updateButton.style.marginRight = '10px';
                    updateButton.addEventListener("click", function() {
                        location.href = 'update.html';
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

function updateProduct() {
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
    xhttp.send('title=' + title.value + '&description=' + description.value + '&price=' + price.value + '&stock=' + stock.value);
}
