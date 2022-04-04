//segundo commit
const express = require ('express');
//creamos una instancia de express en la const app
const app = express();  

app.listen(3000);

app.get('/', (req, res) => {
    res.send('<p>Home page</p>')
})

app.get('/add-item', (req, res) => {
    res.send('<h1>Add items</h1>')
})