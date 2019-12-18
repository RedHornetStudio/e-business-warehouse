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
            alert(this.responseText);
        }
    };
    xhttp.open("POST", "includes/add.inc.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('title=' + title.value + '&description=' + description.value + '&price=' + price.value + '&stock=' + stock.value);
}