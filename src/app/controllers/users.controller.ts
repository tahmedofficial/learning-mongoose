import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import z from "zod";
import bcrypt from "bcryptjs";


const userRouter = express.Router();

const createUserZodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    age: z.number(),
    role: z.string().optional()
})


userRouter.get("/", async (req: Request, res: Response) => {
    const userEmail = req.query.email;
    console.log(userEmail, "T");

    const user = await User.find({ email: userEmail })
    res.send(user);
})

userRouter.post("/create-user", async (req: Request, res: Response) => {
    try {

        const userInfo = req.body;
        // const body = await createUserZodSchema.parseAsync(userInfo);
        // console.log("Zood body", body);

        const password = await User.hashPassword(userInfo.password);
        userInfo.password = password;
        const user = await User.insertOne(userInfo);
        res.send(user);

    } catch (error) {
        res.send(error)
    }


})

userRouter.patch("/update-user/:id", async (req: Request, res: Response) => {
    const updatedData = req.body;
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
    res.send(updatedUser);
})




export default userRouter;