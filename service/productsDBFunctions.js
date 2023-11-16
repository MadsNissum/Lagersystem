import db from './firestore.js'

const deleteProduct = async (id) => {
    const deletedProduct = await deleteDoc(db, 'products, id')
}

