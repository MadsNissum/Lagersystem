import XLSX from 'xlsx';
import { getProducts } from '../database/productDB.js';
import { getTransactions } from '../database/transactionDB.js';

/**
 * Exports all product to an excel file
 * @author Kasper
 */
async function createProductsXLSX() {
    let products = await getProducts();
    let workSheet = XLSX.utils.json_to_sheet(products); 
    var workBook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(workSheet, [["Brand", "Price", "Expiration Date", "Location",  "Quantity" ]], { origin: "A1" });

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Products');
    workSheet["!cols"] = [ { wch: 10 }, { wch: 5 }, { wch: 15 }, ];

    XLSX.writeFile(workBook, 'Products.xlsx');
}

createProductsXLSX();

/**
 * Exports all transactions to an excel file
 * @author Kasper
 */
async function createTransactionXLSX() {
    let transactions = await getTransactions();
    let workSheet = XLSX.utils.json_to_sheet(transactions); 
    var workBook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(workSheet, [["Amount Sold", "Brand", "Expiration Date", "Location", "Price", "Quantity", "Transaction Date"]], { origin: "A1" });

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Transactions');
    
    workSheet["!cols"] = [ { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 5 }, { wch: 10 }, { wch: 10 } ];

    XLSX.writeFile(workBook, 'Transactions.xlsx');
}

createTransactionXLSX();