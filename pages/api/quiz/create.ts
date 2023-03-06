import conn from "../../../db/connect";

export default async function handler(req: Request, res: Response) {
    // Needs to get Img file
    const { title, description } = JSON.parse(req.body);
    try {
        const dbResponse = await conn.query(`INSERT INTO quiz(title, description, image_url) VALUES ('${title}', '${description}', 'https://picsum.photos/500')`)
        console.log(dbResponse)
        res.status(201).json(dbResponse)
    } catch {
        res.status(400).json({
            message: "Could not save Quiz. Please Try Again"
        })
    }
    
}