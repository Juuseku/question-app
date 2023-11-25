import { sql } from "../database/database.js";

const addTopic = async ( userId, name ) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${ name })`
};

const listTopics = async () => {
    const rows = await sql`SELECT * FROM topics ORDER BY name`;
    return rows;
};

const deleteTopic = async ( id ) => {
    const queIds = await sql`SELECT id FROM questions WHERE topic_id = ${id}`
    const qIds = queIds.map(row => row.id);

    const oIds = []
    await Promise.all(qIds.map(async qId => {
        const options = await sql`SELECT id FROM question_answer_options WHERE question_id = ${qId}`;
        const intOptions = options.map(row => row.id);
        intOptions.forEach(async optionId => {
            oIds.push(optionId);
        });
    }));

    oIds.forEach(async oId => {
        await sql`DELETE FROM question_answer_options WHERE id = ${oId}`;
    });

    await qIds.forEach(async qId => {
        await sql`DELETE FROM questions WHERE id = ${qId}`;
    });
    
    await sql`DELETE FROM topics WHERE id = ${id}`
};

const countTopics = async() => {
    const topics = await sql`SELECT COUNT(*) FROM topics`
    return topics[0]
};

export { addTopic, listTopics, deleteTopic, countTopics };