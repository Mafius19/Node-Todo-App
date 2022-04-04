const express = require ('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
//creamos una instancia de express en la const app
const app = express(); 
// Usamos la libreria de ejs
app.set('view engine', 'ejs')

// Returns middleware that only parses urlencoded bodies and only looks at requests 
//where the Content-Type header matches the type option.
app.use(express.urlencoded({ extended: true}))
 
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
    res.redirect('/get-items')
});

// url para la obtencion de items en mongo por medio del browser
app.get('/get-items', (req, res) => {
    Item.find().then(results => {
        res.render('index',{items: results});
    }).catch(error => console.log(error) )
})

app.get('/add-item',(req,res) => {
    res.render('add-item');
});

app.post('/items', (req, res) => {
    console.log(req.body);
    const item = Item(req.body);
    item.save().then(() => {
        res.redirect('/get-items');
    }).catch(err => console.log(err));
})
// Seteamos la respuesta para cuando se quiere acceder a una ruta inexistente
// Es importante colocar este seteo al finally, luego de definidos todas las otras rutas
app.use((req,res) => {
    res.render('error');
})