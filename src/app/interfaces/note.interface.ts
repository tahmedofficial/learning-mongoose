import { Types } from "mongoose";

interface INote {
    title: string,
    content: string,
    publishDate: Date,
    category: "Personal" | "Work" | "Study" | "Other",
    pinned: boolean,
    tags: {
        label: string,
        color: string
    },
    userId: Types.ObjectId
}

export default INote;