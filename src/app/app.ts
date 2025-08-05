import express, { Application, Request, Response } from "express";
import { noteRouter } from "./controllers/notes.controller";
const app: Application = express()
app.use(express.json());

app.use("/note", noteRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

export default app;