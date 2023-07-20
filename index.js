const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const appRoute = require('./src/routes/user');

app.use('/', appRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server Berjalan di Port : ${port}`);
});