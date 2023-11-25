import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import * as answerService from "../../services/answerService.js";

const showMain = async ({ render }) => {
  const topicsJSON = await topicService.countTopics()
  const questionsJSON = await questionService.countQuestions()
  const answersJSON = await answerService.countAnswers()

  const data = {
    topics: topicsJSON["count"],
    questions: questionsJSON["count"],
    answers: answersJSON["count"],
  };

  render("main.eta", data);
};

export { showMain };
