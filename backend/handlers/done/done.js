const doneData = require('./../../pkg/done');

const getAll = async (req, res) => {
    try {
        let data = await doneData.getAll();
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};
const updateDone = async (req, res) => {
    try {
        const updatedTask = req.body;
        let data = await doneData.save(updatedTask);
        return res.status(204).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAll,
    updateDone
}