//segundo commit
const express = require ('express');
//creamos una instancia de express en la const app
const app = express();  

app.listen(3000);

app.get('/', (req, res) => {
    // se agrega {root:__dirname} xq express debe saber de donde viene el ruteo relativo
    // le dejamos en claro que el directotrio actual es el raiz
    res.sendFile('./views/index.html',{root:__dirname});
});

app.get('/add-item', (req, res) => {
    res.sendFile('./views/add-item.html',{root:__dirname});
});

app.use((req, res) => {
    res.sendFile('./views/error.html',{root:__dirname});
});