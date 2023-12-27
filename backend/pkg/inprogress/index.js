const mongoose = require('mongoose');

const Inprogress = mongoose.model(
    'inprogress',
    {
        tasks: Object
    },
    'inprogress',
);

const getAll = async () => {
    return await Inprogress.find({});
};

const save = async (updatedTasks) => {
    return await Inprogress.updateMany({}, { tasks: updatedTasks }, { upsert: true });
};

module.exports = {
    getAll,
    save
};


// const mongoose = require('mongoose');

// const Inprogress = mongoose.model(
//     'inprogress',
//     {
//         task_title: String,
//         user_id: String
//     },
//     'inprogress',
// );

// const getAll = async () => {
//     return await Inprogress.find({});
// };

// const save = async (id, updatedTasks) => {
//     return await Inprogress.updateOne({_id: id}, {$set: updatedTasks}, { upsert: true });
// };

// module.exports = {
//     getAll,
//     save
// };


