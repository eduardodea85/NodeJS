const express = require('express');

const server = express();

server.use(express.json());//quando enviamos um json na aplicação (POST), precisamos falar para o express que estamos enviando uma estrutura JSON.

// Query Params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'NodeJS', tipo: 'Backend' }

//CRUD> Create, Read, Update, Delete

const cursos = ['Node JS', 'JavaScript', 'React Native'];

server.get('/cursos', (req, res) => {
    return res.json(cursos);
});

//localhost:3000/curso/2
//server.get('/curso/:id', (req, res) => {
    server.get('/cursos/:index', (req, res) => {
    //const nome = req.query.nome;
    //const id = req.params.id;
    const {index} = req.params;


    //return res.send('Hello Word')
    //return res.json({curso: `Aprendendo ${nome}`})
    //return res.json({ curso: `Curso ${id}`})
    return res.json(cursos[index]);
});

//Criando um novo curso
server.post('/cursos', (req, res) => {
    const {name} = req.body;
    cursos.push(name);
    return res.json(cursos);
});

//Atualizando um curso
server.put('/cursos/:index', (req, res) => {
    const {index} = req.params;
    const {name} = req.body;
    cursos[index] = name;
    return res.json(cursos);
});

//Excluindo um curso
server.delete('/cursos/:index', (req, res) => {
    const {index} = req.params;
    cursos.splice(index, 1);
    return res.json({message: "Curso deletado com sucesso!"});
});

server.listen(3000);