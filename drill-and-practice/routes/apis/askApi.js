import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const listQuestions = async ({ response }) => {

    const questions = await questionService.listAllQuestions();
    const count = await questionService.countQuestions();
    const question = Math.floor(Math.random() * (count["count"] - 1 - 0 + 1)) + 0;
    const qId = questions[question].id;
    const options = await optionService.showOptions(qId);

    options.forEach(option => {
        delete option.question_id;
        delete option.is_correct;

    });

    const data = {
        questionId: qId,
        questionText: questions[question].question_text,
        answerOptions: options,
    };

    response.body = data
};

const listAnswers = async ({ response, request }) => {

    const body = request.body({ type: "json" });
    const document = await body.value;
    const qId = document.questionId;
    const oId = document.optionId;


    const correct = await optionService.checkIfCorrect(oId);
    response.body = { "correct": correct };



}

export { listQuestions, listAnswers };