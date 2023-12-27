const inprogressData = require('./../../pkg/inprogress');

const getAll = async (req, res) => {
    try {
        let data = await inprogressData.getAll();
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};
const updateInprogress = async (req, res) => {
    try {
        const updatedTask = req.body;
        let data = await inprogressData.save(updatedTask);
        return res.status(204).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAll,
    updateInprogress
}