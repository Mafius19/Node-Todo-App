//segundo commit
const express = require ('express');

// Usamos la libreria de ejs
app.set('view engine', 'ejs')

const mongoose = require('mongoose');
const Item = require('./models/items');
//creamos una instancia de express en la const app
const app = express();  
//enlace a la db
const mongodb = 'mongodb+srv://ckmobile:ckmobile@item.ebuz7.mongodb.net/item-database?retryWrites=true&w=majority'
// Usamos mongoose para conectarnos con la base de datos mongo
mongoose.connect(mongodb).then(() => {
    app.listen(3000);
    console.log('conected');
}).catch(err => console.log(err))

// Asi era original antes de aplicar ejs
// app.get('/',(req,res) => {
//     res.sendFile('./views/index.html', {root:__dirname});
// });

app.get('/',(req,res) => {
    const items = [
        {name:'mobile phone', price:100},
        {name:'book', price:30},
        {name:'computer', price:2000}
    ]
    res.render('index',{items});
});

// url para la creacion de un item en mongo por medio del browser
app.get('/create-item', (req, res) => {
    const item = new Item({
        name: 'computer',
        price: 2000
    })
    item.save().then(results => res.send(results))
})

// url para la obtencion de items en mongo por medio del browser
app.get('/get-items', (req, res) => {
    Item.find().then(results => res.send(results)).catch(error => console.log(error) )
})

// url para la obtencion de un item en especifico en mongo por medio del browser
app.get('/get-item', (req, res) => {
    Item.findById('6244bbcd4e62021b20d92d22').then(results => res.send(results)).catch(error => console.log(error) )
})

app.get('/add-item',(req,res) => {
    res.render('add-item');
});

// Seteamos la respuesta para cuando se quiere acceder a una ruta inexistente
// Es importante colocar este seteo al finally, luego de definidos todas las otras rutas
app.use((req,res) => {
    res.render('error');
})