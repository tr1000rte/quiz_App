const quizModel = require('../model/quizModel');

//create and save new quiz
exports.createQuiz = (req, res) => {
    if(!req.body) {
        res.status(400).send({message: '這裡要填'});
        return;
    }

    const  quizData = new quizModel({
        questioner: req.body.questioner,
        major: req.body.major,
        minor: req.body.minor,
    })

    quizData.save(quizData)
    .then(() => {
        res.redirect('add_question')
    })
    .catch(err => {
        res.status(500).send({
            message: err || 'Create fail'
        });
    });
}

//find all/single quiz
exports.findQuiz = (req, res) => {  
    
    if(req.query.id) {
        const quizId = req.query.id;

        quizModel.findById(quizId)
        .then(quiz => {
            if(!data){
                res.status(404).send({message: 'cannot find this data with id' + quizid })
            } else {
                res.send(quiz)
            }
        })
        .catch(err => {
            res.status(500).send({message: 'acammot find data by this id ' + quizid})
        })

    } else {
        quizModel.find()
        .then(quiz => {
            res.status(200).send(quiz)
        })
        .catch(err => {
            resstatus(500).send({
                message: err || 'Error while find data'
            });
        })
    }
}

//update quiz by id
exports.updateQuiz = (req, res) => {
    if(!req.body) {
        res.status(400).send({message: '這邊要填'})
    }

    const id = req.params.id;
    quizModel.findByIdAndUpdate(id, req.body, {'useFindAndModify': false})
    .then(data => {
        if(!data) {
            res.status(404).send({message: 'data not found'})
        } else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(400).send({
            message: err || 'update data fail'
        })
    })
}

//delete quiz by id
exports.deleteQuiz = (req, res) => {
    const quizId = req.params.id
    quizModel.findByIdAndDelete(quizId).then(data => {
        if(!data) {
            res.status(404).send({message: `maybe ${quizId} is wrong`})
        } else {
            res.send({message: `QuizID -> (${quizId}) was deleted`})
        }
    })
    .catch(err => {
        res.status(500).send({
            message: quizId + "cannot delete"
        })
    })
}