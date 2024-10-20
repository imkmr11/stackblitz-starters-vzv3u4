const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3010;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addToCart(cart, productId, name, price, quantity) {
  const item = {
    productId: parseInt(productId),
    name,
    price: parseFloat(price),
    quantity: parseInt(quantity),
  };

  cart.push(item);
}

app.get('/cart/add', (req, res) => {
  const productId = parseInt(req.query.productId);
  const name = req.query.name;
  const price = parseFloat(req.query.price);
  const quantity = parseInt(req.query.quantity);

  addToCart(cart, productId, name, price, quantity);
  res.json(cart);
});

function updateQuantity(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  const productId = parseInt(req.query.productId);
  const quantity = parseInt(req.query.quantity);

  const updated = updateQuantity(cart, productId, quantity);

  res.json(cart);
});

function deleteProduct(item, productId) {
  return item.productId !== productId;
}

app.get('/cart/delete', (req, res) => {
  const productId = parseInt(req.query.productId);
  cart = cart.filter((item) => deleteProduct(item, productId));
  res.json(cart);
});

app.get('/cart', (req, res) => {
  res.json(cart);
});

function getTotalQuantity(cart) {
  let totalQuantity = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }

  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = getTotalQuantity(cart);
  res.json({ totalQuantity });
});

function getTotalPrice(cart) {
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }

  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  const totalPrice = getTotalPrice(cart);
  res.json({ totalPrice });
});
