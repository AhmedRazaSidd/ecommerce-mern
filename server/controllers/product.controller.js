import Product from "../models/product.model.js";

export const getAllProducts = async () => {
  try {
    const products = await Product.findOne({}); // find all products
    res.status(200).json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
