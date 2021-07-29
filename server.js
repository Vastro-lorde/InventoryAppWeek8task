const express = require('express');
const userRouter = require('./routes/userRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const mongodb = require('./utils/db.js');

require('dotenv').config()
const app = express();
app.use(express.json())

mongodb();

app.use('/user', userRouter);
app.use('/user/product', productRouter);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})