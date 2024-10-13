const express = require("express");
const cors = require("cors");
require("dotenv").config();
require('./conn/conn');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://book-store-h9go.vercel.app', // Replace with your frontend's URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

// Import routes
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
const CreateOrder = require("./routes/RazorPay");
const paymentRoutes = require("./routes/paymentRoutes");

// API routes
app.use("/api/v1/users", User);
app.use("/api/v1/books", Books);
app.use("/api/v1/favourites", Favourite);
app.use("/api/v1/cart", Cart);
app.use("/api/v1/orders", Order);
app.use("/api/v1/create-order", CreateOrder);
app.use("/api/v1/payments", paymentRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("Hello from Backend");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Server setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
