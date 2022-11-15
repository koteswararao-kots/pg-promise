const db = require('../../db/products');

const getProducts = async () => {
    try {
        let products = await db.any("SELECT * FROM productsschema.productslist");
        return products;
    } catch (err) {
        console.log("error is", err)
    }
}


  

module.exports = { getProducts };