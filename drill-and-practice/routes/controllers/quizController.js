import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as answerService from "../../services/answerService.js";

const showTopics = async ({ render }) => {
    render("quiz.eta", { topics: await topicService.listTopics()});
};

const getQuestion = async ({ params, response }) => {
    const questions = await questionService.listQuestions(params.tId);
    const listLenght = questions.length;
    const random = Math.floor(Math.random() * listLenght);
    const question = questions[random];
    const qId = question.id;
    response.redirect(`/quiz/${params.tId}/questions/${qId}`)
};

const showQuestion = async({render, params }) => {
    const qId = params.qId;
    const question = await questionService.getQuestion(qId);
    const options = await optionService.showOptions(qId);
    render("quizQuestion.eta", {
                                question: question,
                                options: options
                                });
};

const manageAnswers = async({response, render, params }) => {
    const isCorrect = await optionService.checkIfCorrect(params.oId);
    let result = "";
    
    if (!isCorrect) {
        result = "incorrect";
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/${result}`);
    } else {
        result = "correct"
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/${result}`);
    };
};

const showResult = async({render, request, params}) => {
    
    const result = params.result;
    const qId = params.qId;
    const rightAnswer = await optionService.getCorrect(qId);
    const answer = rightAnswer[0].option_text;
    render("result.eta", {
                        result: result,
                        answer: answer,
                        tId: params.tId,
                        })
    
};

export { showTopics, getQuestion, showQuestion, manageAnswers, showResult };