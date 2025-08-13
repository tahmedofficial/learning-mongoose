import { model, Schema } from "mongoose";
import INote from "../interfaces/note.interface";


const noteSchema = new Schema<INote>({
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    publishDate: { type: Date, default: Date.now },
    category: {
        type: String,
        enum: ["Personal", "Work", "Study", "Other"],
        default: "Personal"
    },
    pinned: {
        type: Boolean,
        default: false,
    },
    tags: {
        label: { type: String, required: true },
        color: { type: String, default: "gray" }
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { versionKey: false, timestamps: true })

const Note = model("Note", noteSchema);

export default Note;