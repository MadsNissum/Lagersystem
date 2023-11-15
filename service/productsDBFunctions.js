import db from '.firestore.js'

const firebase_app = initializeApp(firebaseConfig)
const db = getFirestore(firebase_app)
const productCollections = collection(db,'lagersystem')

const getProducts = async () => {
    let productQueryDocs = await getDocs(productCollections)
    let products = productQueryDocs.docs.map(doc => {
        let data = doc.data()
        data.docID = doc.id
        return data
    })
    return products
}

const getProduct = async (id) => {
    const docRef = doc(db, 'products', id)
    const productQueryDoc = await getDoc(docRef)
    let product = productQueryDoc.data()
    product.docID = productQueryDoc.id
    return product
}

const deleteProduct = async (id) => {
    const deletedProduct = await deleteDoc(db, 'products, id')
}


  export default {getProduct, deleteProduct};