import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
const app: Application = express()

const noteSchema = new Schema({
    title: String,
    content: String,
    publishDate: Number
})

const Note = model("Note", noteSchema);

app.post('/create-post', async (req: Request, res: Response) => {
    const myNote = new Note({
        title: "Learnint mongoose",
        content: "I am learning mongoose",
        publishDate:"abcd"
    })
    await myNote.save();
    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note: "myNote"
    })
})

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

export default app;