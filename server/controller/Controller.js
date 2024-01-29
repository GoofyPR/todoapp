const todos = require("../model/Model.js");



// const create = async (req, res) => {
//     try {
//         const todoData = new todos(req.body);

//         if (!todoData.task) {
//             return res.status(400).json({ msg: "Task is required" });
//         }

//         const savedData = await todoData.save();
//         console.log("Task created successfully:", savedData);
//         res.status(200).json(savedData);
//     } catch (error) {
//         console.error("Error creating task:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

const create = async (req, res) => {
    try {
        const todoData = new todos(req.body);

        if (!todoData.task) {
            return res.status(400).json({ msg: "Task is required" });
        }
        const totalTasks = await todos.countDocuments();
        todoData.taskNumber = totalTasks + 1;

        const savedData = await todoData.save();
        console.log("Task created successfully:", savedData);
        res.status(200).json(savedData);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: error.message });
    }
};


const getALL = async(req,res)=>{
    try {
        
        const TodoData = await todos.find();
        if(!TodoData){
            return res.status(404).json({msg:"data not found.."});
        }
        res.status(200).json(TodoData);


    } catch (error) {
        res.status(500).json({error: error});
    }
}

const get1 = async(req,res)=>{
    try {
        
        const id = req.params.id;
        const todoExist = await todos.findById(id);
        if(!todoExist){
            return res.status(404).json({msg: "data not found.."});
        }
        res.status(200).json(todoExist);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

const update = async(req,res)=>{
    try {
        
        const id = req.params.id;
        const TodoExist = await todos.findById(id);
        if(!TodoExist){
            return res.status(404).json({msg: "data not found.."});
            
        }
        
        const updatedData = await todos.findByIdAndUpdate(id,req.body,{new:true});

        const updatedTasks = await todos.find();
        res.status(200).json(updatedTasks);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

const delete1 = async(req,res)=>{
    try {
        
        const id = req.params.id;
        const Exist = await todos.findById(id);
        if(!Exist){
            return res.status(404).json({msg: "data not found.."});

        }
        const taskNumberToDelete = Exist.taskNumber;

        await todos.findByIdAndDelete(id);

        await todos.updateMany(
            { taskNumber: { $gt: taskNumberToDelete } },
            { $inc: { taskNumber: -1 } }
        );

        const updatedTodoList = await todos.find();
        // res.status(200).json({msg: "Deleted Successfully."});
        res.status(200).json(updatedTodoList);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: error});
    }
}

module.exports = { create, getALL, get1, update, delete1 };

