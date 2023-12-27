const mongoose = require('mongoose');

// const taskSchema  = mongoose.model(
//     'task',
//     {
//         task_title: String,
//         user_id: String,
//     },
//     'tasks',
// );

const taskSchema = new mongoose.Schema({
    task_title: String,
    user_id: String,
});

const Task = mongoose.model('Task', {
    tasks: [taskSchema],
}, 'tasks');


const getAll = async () => {
    return await Task.find({});
};

const getOne = async (id) => {
    return await Task.findOne({ _id: id });
};


const save = async (data, uid) => {
    
    // let existingTask = await Task.findOne({ 'tasks.user_id': uid });
    let existingTask = await Task.findOne({ 'tasks.0': { $exists: true } });

       
        if (existingTask) {
            existingTask.tasks.push({ task_title: data.task_title, user_id: uid });
            return await existingTask.save();
        }

        
        let newTask = new Task({ tasks: [{ task_title: data.task_title, user_id: uid }] });
        return await newTask.save();
    
};



// const update = async (id, data) => {
//     return Task.updateOne({ 'tasks._id': id }, data);
// };

const update = async (id, data) => {
    return Task.updateOne({ 'tasks._id': id }, { $set: { 'tasks.$.task_title': data.task_title } });
};


const updateTasks = async (updatedTasks) => {
    return await Task.updateMany({}, {tasks: updatedTasks }, { upsert: true });
};

// const remove = async (id) => {
//     return Task.deleteOne({ 'tasks._id': id });
// };

const remove = async (id) => {
    return Task.updateOne({ 'tasks._id': id }, { $pull: { 'tasks': { '_id': id } } });
};


module.exports = {
    getAll,
    getOne,
    save,
    update,
    updateTasks,
    remove
};