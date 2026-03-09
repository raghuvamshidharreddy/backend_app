// const productModel=[
//     {
//         id:1,
//         name:"Iphone 14 Pro Max",
//         price:999.99
//     },
//     {
//         id:2,
//         name:"Samsung Galaxy S23 Ultra",
//         price:899.99
//     },
//     {
//         id:3,
//         name:"Google Pixel 7 Pro",
//         price:799.99
//     }
// ];
import mongoose from "mongoose"
const productSchema=mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    desc:{type:String,required:true},
    image:{},
});
const productModel=mongoose.model("products",productSchema)
export default productModel;