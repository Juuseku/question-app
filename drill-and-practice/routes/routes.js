import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as topicController from "./controllers/topicController.js";
import * as optionController from "./controllers/optionController.js";
import * as loginController from "./controllers/loginController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as quizController from "./controllers/quizController.js"
import * as askApi from "./apis/askApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);

router.get("/topics/:id", questionController.listQuestions);
router.post("/topics/:id", questionController.addQuestion);
router.post("/topics/:id/delete", topicController.deleteTopic);

router.post("/topics/:id/questions", questionController.addQuestion)


router.get("/topics/:id/questions/:qId", questionController.showQuestion);

router.get("/topics/:id/questions/:qId/options", optionController.showOptions);
router.post("/topics/:id/questions/:qId/options", optionController.addOption);
router.post("/topics/:id/questions/:qId/options/:oId/delete", optionController.deleteOption);

router.post("/topics/:id/questions/:qId/delete", questionController.deleteQuestion);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.attemptLogin);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.addUser);

router.get("/quiz", quizController.showTopics);
router.get("/quiz/:tId", quizController.getQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.showQuestion);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.manageAnswers);


router.get("/quiz/:tId/questions/:qId/:result", quizController.showResult);

router.get("/api/questions/random", askApi.listQuestions);
router.post("/api/questions/answer", askApi.listAnswers);


export { router };
