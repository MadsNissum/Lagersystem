const productButtons = document.getElementById('products');
const tableBon = document.getElementById('bonTable');
let productsList = []

createTable(); 

 function addProduct(productBrand, productPrice) {
    let product = {productBrand, productPrice};
    productsList.push(product);
    createTable();
 }

 function addProductAmount(productBrand) {
    let amount = 0; 
    productsList.forEach(product => {
        if(product.productBrand == productBrand) {
            amount++;
        }
    })
    return amount;
 }

function sumProducts() {
    let sum = 0; 
    productsList.forEach(product => {
            sum += Number(product.productPrice);
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
      <td><h1>kr '${sumProducts()}'</h1></td>
  </tr>`
  tHead.innerHTML = theadHTML;

// tbody 
let tbodyHTML1 = `<tbody>
<tr>
    <td>Beskrivelse</td>
    <td>antal</td>
    <td>Beløb</td>
</tr>`
tBody.innerHTML = tbodyHTML1

let newProductList = new Set();

productsList.forEach(product => {
    if (!newProductList.has(product.productBrand)) {
        newProductList.add(product.productBrand);

        tBody.innerHTML += `<tr>
            <td>${product.productBrand}</td>
            <td>${addProductAmount(product.productBrand)}</td>
            <td>${product.productPrice}</td>
        </tr>`;
    }
});

let tbodyHTML2 = `<tr>
<td>Bon total</td>
<td></td>
<td>'${sumProducts()}'<br></td>
</tr>
<tr>
<td>Beløb modtaget kreditkort</td>
<td></td>
<td>'${sumProducts()}'</td>
</tr>
<tr>
<td>Beløb at betale</td>
<td></td>
<td>-'${sumProducts()}'</td>
</tr>
<tr>
<td>Byttepenge</td>
<td></td>
<td>0<br></td>
</tr>
<tr>
<td>Moms 25% af '${sumProducts()}'</td>
<td></td>
<td>'${calculateMoms()}'</td>
</tr>`
tBody.innerHTML += tbodyHTML2

// tfoot
tFoot.innerHTML = 
` <tr>
<td><h2>Subtotal</h2></td>
<td></td>
<td><h2>0.00</h2></td>
</tr>`
}

function calculateMoms() {
    return (sumProducts()/100)*25
}

