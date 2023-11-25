import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const addQuestion = async ({ render, request, response, params, user }) => {
    const body = request.body({type: "form"});
    const info = await body.value;

    if(info.get("question_text").length < 1) {
        
        const errorData = {
            errors: ["Question has to be at least one character long."],
            questions: await questionService.listQuestions(params.id),
            question: info.get("question_text"),
            topic: params.id,
        };
        render("questions.eta", errorData);
    } else {
        await questionService.addQuestion(
            user.id,
            params.id,
            info.get("question_text"),
        );
        response.redirect(`/topics/${ params.id }`)
    };

    
};

const listQuestions = async ({ render, params }) => {
    const questions = await questionService.listQuestions(params.id);
    const options = await optionService.getAllOptions();
    const qOptions = []
    options.forEach(option => {
        qOptions.push(option.question_id);
    })
    render("questions.eta", { 
        questions: questions,
        topic: params.id,
        options: qOptions,
    });
};

const showQuestion = async ({ render, params }) => {
    render("question.eta", { 
        question: await questionService.getQuestion(params.qId),
        options: await optionService.showOptions(params.qId),
    });
   
};

const deleteQuestion = async ({ params, response}) => {
    questionService.deleteQuestion(params.qId);
    response.redirect(`/topics/${params.id}`);

};




export { addQuestion, listQuestions, showQuestion, deleteQuestion };
    