import productModel from "../models/productModel";

const showProducts = (req, res) => {
    res.render('home', {productModel });
}
export { showProducts };