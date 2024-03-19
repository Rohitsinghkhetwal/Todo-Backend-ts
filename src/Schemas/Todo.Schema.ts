import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    Items: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)

const todos = mongoose.model("todos", todoSchema);

export default todos;