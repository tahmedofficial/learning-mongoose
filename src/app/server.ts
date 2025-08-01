import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const port = 3000

async function main() {
    try {
        const uri = "mongodb+srv://mongodb:tanvir237@cluster0.ufkobjs.mongodb.net/advance-note-app?retryWrites=true&w=majority&appName=Cluster0"
        await mongoose.connect(uri);

        server = app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log(error);

    }
}

main();











// import express, { Application, Request, Response } from "express";
// const app: Application = express()
// const port = 3000

// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello World!')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
