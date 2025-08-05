import { model, Schema } from "mongoose";


const noteSchema = new Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    publishDate: { type: Date, default: Date.now },
    category: {
        type: String,
        enum: ["Personal", "Work", "Study", "Otherr"],
        default: "Personal"
    },
    pinned: {
        type: Boolean,
        default: false,
    },
    tags: {
        label: { type: String, required: true },
        color: { type: String, default: "gray" }
    }
}, { versionKey: false, timestamps: true })

const Note = model("Note", noteSchema);

export default Note;