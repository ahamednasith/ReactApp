const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/user.router');
const app = express();
const port = 6733;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',userRoute);

app.listen(port,() => {
    console.log(`Server Is Running On ${port}`);
});