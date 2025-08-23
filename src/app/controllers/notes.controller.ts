import { Request, Response } from "express";
import Note from "../models/notes.model";
import express from "express";


export const noteRouter = express.Router();

noteRouter.post('/create-post', async (req: Request, res: Response) => {

    const body = req.body;
    
    const note = await Note.create(body)
    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note
    })
})

noteRouter.get("/", async (req: Request, res: Response) => {
    const note = await Note.find().populate("userId");
    res.send(note);
})

noteRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const singleNote = await Note.findById(id);
    // const singleNote = await Note.findOne({ title: "Learning database" })
    res.send(singleNote);
})

noteRouter.patch("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedBody = req.body;
    const note = await Note.findByIdAndUpdate(id, updatedBody);
    res.send("Updated")
})

