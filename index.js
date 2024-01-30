const express = require('express');
const app = express();
const body_parser = require('body-parser');
const port = 5010;
const route = require('./routes/route')
const mongoose = require('./database/userData')
const path = require('path');
const { log } = require('console');

app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({extended: true}));

app.use('/', route);
app.use('/views/uploads', express.static('./views/uploads'))
app.use(express.static(path.join(__dirname, 'public/')));


app.listen(port, () => {
    console.log(`Server Run on Port ${port}`);
})
