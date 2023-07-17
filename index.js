const express = require('express');

const server = express();

server.use(express.json());//quando enviamos um json na aplicação (POST), precisamos falar para o express que estamos enviando uma estrutura JSON.

// Query Params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'NodeJS', tipo: 'Backend' }

//CRUD> Create, Read, Update, Delete


//Middlewares = Todo tipo de função que está entre o pedido da requisição e entre a resposta final para o frontend. ex. tora dos cursos get."/cursos", (req, res)...
const cursos = ['Node JS', 'JavaScript', 'React Native'];

//exemplo De Middleware GLOBAL
server.use((req, res, next) => {
    //console.log('REQUISIÇÃO CHAMADA');
    console.log(`URL CHAMADA: ${req.url}`);
    return next();
});

function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({error: "Nome do curso é obrigatório!"});
    }
    return next();
}

function checkIndexCurso(req, res, next){
    const curso = cursos[req.params.index];
    if(!curso){
        return res.status(400).json({error: "O usuário não existe"})
    }
    req.curso = curso;
    return next();
}

server.get('/cursos', checkIndexCurso, (req, res) => {
    return res.json(req.curso);
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
server.post('/cursos', checkCurso, (req, res) => {
    const {name} = req.body;
    cursos.push(name);
    return res.json(cursos);
});

//Atualizando um curso
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
    const {index} = req.params;
    const {name} = req.body;
    cursos[index] = name;
    return res.json(cursos);
});

//Excluindo um curso
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const {index} = req.params;
    cursos.splice(index, 1);
    return res.json({message: "Curso deletado com sucesso!"});
});

server.listen(3000);