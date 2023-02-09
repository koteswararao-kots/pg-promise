const db = require('../../db/pg/products');
const {pubsub, channels, redisPublish, redisClient}    = require('../../lib/pubsub');
let SPECIAL_KEY = 'PUBLISH_SUBSCRIBE|addProduct';

const addProduct = async (args) => {
    try {
        console.log("args@@@@@", args);
        let products = await db.one("INSERT INTO productsschema.productslist(name,imageUrl,price) VALUES($1, $2, $3) RETURNING *", [args.name, args.imageUrl, args.price]);
        redisPublish((SPECIAL_KEY), args)

        console.log(products);
        products.msg = 'product added';
        // res.status(200).json({
        //     user,
        //     status:"success",
        //     message:"NEW USER UPDATED"
        // })
        return products;
    } catch (err) {
       console.log("error is ", err);
        
    }
}


  

module.exports = { addProduct };