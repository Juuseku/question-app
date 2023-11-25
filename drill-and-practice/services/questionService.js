import { sql } from "../database/database.js";

const addQuestion = async ( userId, topicId, questionText) => {
    await sql`INSERT INTO questions (user_id, topic_id, question_text)
     VALUES (${userId}, ${topicId}, ${questionText})`
};

const listQuestions = async (topicId) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${ topicId }`;
    return rows;
};

const getQuestion = async (qId) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${ qId }`
    return rows[0];
};

const listAllQuestions = async () => {
    const rows = await sql`SELECT * FROM questions`;
    return rows;
};

const countQuestions = async () => {
    const count = await sql`SELECT COUNT(*) FROM questions`;
    return count[0];
};

const deleteQuestion = async ( qId ) => {
    const options = await sql`SELECT * FROM question_answer_options WHERE question_id = ${ qId}`;
    const intOptions = options.map(row => row.id);
    intOptions.forEach(async option => {
        await sql`DELETE FROM question_answer_options WHERE id = ${option}`;
    })
    await sql`DELETE FROM questions WHERE id = ${ qId }`
};



export { addQuestion, listQuestions, getQuestion, deleteQuestion, listAllQuestions, countQuestions };
