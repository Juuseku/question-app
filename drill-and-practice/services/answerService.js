import { sql } from "../database/database.js";

const saveAnswer = async (qId, uId, oId) => {
    await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${uId}, ${qId}, ${oId})`
};

const countAnswers = async () => {
    const answers = await sql`SELECT COUNT(*) FROM question_answers`
    return answers[0];
};

export { saveAnswer, countAnswers };