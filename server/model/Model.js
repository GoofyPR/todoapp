const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    taskNumber: {
        type: Number,
        required: false,
        
    },
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
});

// export default mongoose.model("todos",todoSchema);
const todos = mongoose.model("todos",todoSchema);
module.exports = todos;
