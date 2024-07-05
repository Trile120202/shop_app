const Product = require("../models/Product");
const Cart = require("../models/Cart");

module.exports = {
  addCart: async (req, res) => {
    const userId = req.user.id;
    const { cartItem, quantity } = req.body;

    try {
      const cart = await Cart.findOne({ userId });

      if (cart) {
        const existingProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem
        );

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({ cartItem, quantity });
        }

        await cart.save();
        res.status(200).json("Product added to cart");
      } else {
        const newCart = new Cart({
          userId,
          products: [{ cartItem, quantity }],
        });

        await newCart.save();
        res.status(200).json("Product added to cart");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getCart: async (req, res) => {
    const userId = req.user.id;

    try {
      const cart = await Cart.findOne({ userId })
        .populate('products.cartItem', "_id name imageUrl price category");

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json(cart.products);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteCartItem: async (req, res) => {
    const cartItemId = req.params.cartItem;

    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.user.id },
        { $pull: { products: { cartItem: cartItemId } } },
        { new: true }
      );

      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart item not found' });
      }

      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete cart item' });
    }
  },

  resetCart: async (req, res) => {
    try {
      await Cart.findOneAndDelete({ userId: req.user.id });
      res.status(200).json("Cart has been reset");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
