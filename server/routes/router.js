const express = require('express');
const route = express.Router();
const axios = require('axios');

const quizController = require('../controller/quiz')

route.get('/', (req, res) => {
    axios.get('http://localhost:8080/api/quizes')
    .then((response) => {
        console.log(response.data);
        res.render('index', {users:response.data});
    })
    .catch(err => {
        res.send(err)
    })
});

route.get('/add_question', (req, res) => {
    res.render('add_question');
});

route.get('/update_question', (req, res) => {
    axios.get('http://localhost:8080/api/quizes', { params: {id:req.query.id}})
    .then( quiz => {
        res.render("update_question", {user: quiz.data})
    })
    .catch(err => {
        res.send(err);
    })
});

//API
route.post('/api/quizes', quizController.createQuiz);
route.get('/api/quizes', quizController.findQuiz);
route.put('/api/quizes/:id', quizController.updateQuiz);
route.delete('/api/quizes/:id', quizController.deleteQuiz);

module.exports = route;