import conn from "./connect";

export async function getMainQuizzes() {
    const results: any = await conn.query('SELECT * FROM quiz LIMIT 4');
    return results
}

export async function getSingleQuiz(quizId) {
    const results: any = await conn.query('SELECT * FROM quiz INNER JOIN question on quiz.id = question.quiz_id and quiz_id =' + quizId)
    return results
}

export async function getAllQuizzesIds() {
    const results: any = await conn.query('SELECT id FROM quiz');
    return results
}