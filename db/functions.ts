import conn from "./connect";

export async function getQuizzes() {
    let results: any = await conn.query('SELECT * FROM quiz LIMIT 4');
    return results
}
