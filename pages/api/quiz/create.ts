import { NextApiResponse, NextApiRequest } from "next";
import { OkPacket } from "mysql";

import conn from "../../../db/connect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { title, description, questions } = JSON.parse(req.body);
    try {
        // Save Quiz
        const dbResponse: OkPacket = await conn.query(`INSERT INTO quiz(title, description, image_url) VALUES ('${title}', '${description}', 'https://picsum.photos/500')`)
        
        // Save Questions
        questions.forEach(async question => {
            await conn.query(`INSERT INTO question(text, options, correct, quiz_id) VALUES ('${question.text}', '${JSON.stringify(question.options)}', '${question.correct}', ${dbResponse.insertId})`)
        })
        res.status(201).json(dbResponse)
    } catch {
        res.status(400).json({
            message: "Could not save Quiz. Please Try Again"
        })
    }
    
}