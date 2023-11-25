import { sql } from "../database/database.js";

const addOption = async ( qId, optionText, isCorrect ) => {
    await sql `INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${qId}, ${optionText}, ${isCorrect})`;
};

const showOptions = async (qId) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${ qId }`;
    return rows;
};

const deleteOption = async ( id ) => {
    await sql`DELETE FROM question_answer_options WHERE id = ${ id }`
};

const checkIfCorrect = async ( oId ) => {
    const option = await sql`SELECT * FROM question_answer_options WHERE id = ${oId}`;

    if (option && option.length > 0) {
        
        const isCorrect = option[0].is_correct;
        return isCorrect;  
    } else {
        return;
    }
    
};

const getCorrect = async (qId) => {
    const correct = await sql`SELECT * FROM question_answer_options WHERE question_id = ${qId} AND is_correct = true`
    return correct;
};

const getAllOptions = async (qId) => {
    const rows = await sql`SELECT * FROM question_answer_options`
    return rows;
}


export { addOption, showOptions, deleteOption, checkIfCorrect, getCorrect, getAllOptions };