const productButtons = document.getElementById('products');
const tableBon = document.getElementById('bonTable');
let productsList = [];

createTable();

function addProduct(productBrand, productPrice, productId) {
    let boo = true;

    productsList.forEach(line => {
        if (line.id == productId) {
            line.amount++;
            boo = false;
        }
    });

    if (boo) {
        productsList.push({ productBrand, productPrice: parseInt(productPrice), id: productId, amount: 1 });
    }

    createTable();
}

function addProductAmount(productBrand) {
    let amount = 0;
    productsList.forEach(product => {
        if (product.productBrand == productBrand) {
            amount++;
        }
    })
    return amount;
}

function sumProducts() {
    let sum = 0;
    productsList.forEach(product => {
        sum += product.productPrice * product.amount;
    });
    return sum;
}

function createTable() {
    bonTable.innerHTML = "";

    let tHead = document.createElement('thead');
    let tBody = document.createElement('tbody');
    let tFoot = document.createElement('tfoot');
    bonTable.appendChild(tHead);
    bonTable.appendChild(tBody);
    bonTable.appendChild(tFoot);

    // thead 
    let theadHTML = `<tr>
      <td><h1>Byttepenge</h1></td>
      <td></td>
      <td><h1>kr 0</h1></td>
  </tr>`
    tHead.innerHTML = theadHTML;

    // tbody 
    let tbodyHTML1 = `<tbody>
<tr>
    <td>Beskrivelse</td>
    <td>Antal</td>
    <td>Beløb</td>
</tr>`
    tBody.innerHTML = tbodyHTML1

    let newProductList = new Set();

    productsList.forEach(product => {
        if (!newProductList.has(product.productBrand)) {
            newProductList.add(product.productBrand);

            tBody.innerHTML += `<tr>
            <td>${product.productBrand}</td>
            <td>${product.amount}</td>
            <td>${product.productPrice}</td>
        </tr>`;
        }
    });

    let tbodyHTML2 = `<tr>
<td>Bon total</td>
<td></td>
<td>0<br></td>
</tr>
<tr>
<td>Beløb modtaget kreditkort</td>
<td></td>
<td>${sumProducts()}</td>
</tr>
<tr>
<td>Beløb at betale</td>
<td></td>
<td>-${sumProducts()}</td>
</tr>
<tr>
<td>Byttepenge</td>
<td></td>
<td>0<br></td>
</tr>
<tr>
<td>Moms 25% af ${totalwithoutVAT()}</td>
<td></td>
<td>${vatOTotal()}</td>
</tr>`
    tBody.innerHTML += tbodyHTML2

    // tfoot
    tFoot.innerHTML =
        ` <tr>
<td><h2>Subtotal</h2></td>
<td></td>
<td><h2>${sumProducts()}</h2></td>
</tr>`
}

function vatOTotal() {
    return Math.round((sumProducts() / 100) * 25)
}

async function addBon() {
    try {
        await request('/sales', productsList, 'POST');
        alert("Gennemført salg!")
    } catch (error) {
        errorCodeAlert(error)
    }
    productsList = []
    createTable();
}

function totalwithoutVAT() {
    return Math.round(sumProducts() - vatOTotal());
}
