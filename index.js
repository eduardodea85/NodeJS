const express = require('express');

const server = express();

// Query Params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'NodeJS', tipo: 'Backend' }

//localhost:3000/curso/2
server.get('/curso/:id', (req, res) => {
    //const nome = req.query.nome;
    const id = req.params.id;


    //return res.send('Hello Word')
    //return res.json({curso: `Aprendendo ${nome}`})
    return res.json({ curso: `Curso ${id}`})
})

server.listen(3000);