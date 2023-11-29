const productButtons = document.getElementById('products');
const table = document.getElementsByTagName('table')
const thead = document.getElementsByTagName('thead');
const tbody = document.getElementsByTagName('tbody');
const tfoot = document.getElementsByTagName('tfoot');
let productsList = []
let productAmount = 0;

const tableHTML = `
<table>
    <thead>
        <tr>
            <td><h1>Byttepenge</h1></td>
            <td></td>
            <td><h1>kr 0.00</h1></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Beskrivelse</td>
            <td>antal</td>
            <td>Beløb</td>
        </tr>
        <tr>
            <td>Fadøl</td>
            <td>En</td>
            <td>30</td>
        </tr>
        <tr>
            <td>Bon total</td>
            <td></td>
            <td>30<br></td>
        </tr>
        <tr>
            <td>Beløb modtaget kreditkort</td>
            <td></td>
            <td>30</td>
        </tr>
        <tr>
            <td>Beløb at betale</td>
            <td></td>
            <td>-30</td>
        </tr>
        <tr>
            <td>Byttepenge</td>
            <td></td>
            <td>0<br></td>
        </tr>
        <tr>
            <td>Moms 25% af 30</td>
            <td></td>
            <td>7,5</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td><h2>Subtotal</h2></td>
            <td></td>
            <td><h2>0.00</h2></td>
        </tr>
    </tfoot>
</table>`;


 function addProduct(productBrand, productPrice) {
    let product = {productBrand, productPrice}
    productsList.push(product)
    console.log(productsList)
 }

 function productAmount(productBrand) {
    let amount;
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
        sum += product.productPrice;
    });
    return sum;
}

function createTable() {
  table.innerHTML = "";
  document.createElement('thead');
  document.createElement('tbody');
  document.createElement('tfoot');
  table.appendChild(thead);
  table.appendChild(tbody);
  table.appendChild(tfoot);
  

  let theadHTML = `<tr>
      <td><h1>Byttepenge</h1></td>
      <td></td>
      <td><h1>kr '${sumProducts()}'</h1></td>
  </tr>`
  thead.innerHTML = theadHTML;

let tbodyHTML1 = `<tbody>
<tr>
    <td>Beskrivelse</td>
    <td>antal</td>
    <td>Beløb</td>
</tr>`
tbody.innerHTML = tbodyHTML1
productsList.forEach(product => {
    tbody.innerHTML += `<tr>
    <td>'${product.productBrand}'</td>
    <td>${productAmount(product.productBrand)}</td>
    <td>${product.productPrice}</td>
</tr>`
})
}

function calculateMoms() {
    return (sumProducts()/100)*25
}

