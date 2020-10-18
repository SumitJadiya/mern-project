import mongoose from "mongoose";
const { Schema, OrderId } = mongoose;

const ProductCartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
  size: String,
});

const OrderSchema = new Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
    isCODAvailable: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const ProductCart = mongoose.model("ProductCartSchema", ProductCartSchema);
const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };