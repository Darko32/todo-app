const tasksData = require('./../../pkg/tasks');
const validator  = require('../.././pkg/tasks/validator')

const getAll = async (req, res) => {
    try {
        let data = await tasksData.getAll();
        return res.status(200).send(data);
    } catch(err) { 
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};
const getOne = async (req, res) => {
    try {
        let data = await tasksData.getOne(req.params.id);
        if(data) {
            return res.status(200).send(data);
        }
        return res.status(404).send('Not Found');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const create = async (req, res) => {
    try {
        // req.body.user_id = req.auth.uid;
        await validator.validate(req.body, validator.tasksSchema);
        let data = await tasksData.save(req.body, req.auth.uid);
        return res.status(201).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const update = async (req, res) => {
    try {
        let data = await tasksData.update(req.params.id, req.body);
        if(data.nModified === 0) {
            return res.status(404).send('Not Found');
        }
        return res.status(204).send('');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const updatePartial = async (req, res) => {
    try {
        let data = await tasksData.update(req.params.id, req.body);
        if (data.nModified === 0) {
            return res.status(404).send('Not Found');
        }
        return res.status(204).send('');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

// const updateCurrentTask = async (req, res) => {
//     try {
//         let data = await tasksData.update(req.auth.uid, req.body);
//         if (data.nModified === 0) {
//             return res.status(404).send('Not Fount');
//         }
//         return res.status(204).send('');
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//     }
// };

const updateCurrentTask = async (req, res) => {
    try {

        let data = await tasksData.updateTasks(req.body);
        if (data.nModified === 0) {
            return res.status(404).send('Not Fount');
        }
        return res.status(204).send('Tasks list updated successfully');
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};
const remove = async (req, res) => {
    try {
        let data = await tasksData.remove(req.params.id);
        if(data.deletedCount === 0) {
            return res.status(404).send('Not Found');
        }
        return res.status(204).send('');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    updateCurrentTask,
    update,
    updatePartial,
    remove
};