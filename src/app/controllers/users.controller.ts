import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import z from "zod";

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

})

userRouter.post("/create-user", async (req: Request, res: Response) => {
    try {

        const userInfo = req.body;
        // const body = await createUserZodSchema.parseAsync(userInfo);
        // console.log("Zood body", body);

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