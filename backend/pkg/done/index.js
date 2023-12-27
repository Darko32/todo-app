const mongoose = require('mongoose');

const Inprogress = mongoose.model(
    'done',
    {
        tasks: Object
    },
    'done',
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





