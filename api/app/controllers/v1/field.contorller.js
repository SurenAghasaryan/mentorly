const db = require("../../../models/index");

const { Field } = db;

const getFields = async (req, res) => {
    try {
        const { name, limit, offset } = req.query;
        const whereConditions = {}

        if (name) {
            whereConditions.name = name;
        }

        const allFields = await Field.findAndCountAll({
            where: whereConditions,
            attributes: ['id', 'name'],
            limit: limit || 10,
            offset: offset || 0,
            raw: true
        });

        return res.status(200).send({ sucess: true, data: allFields, success: true });
    } catch (error) {
        console.error('Error fields get failed:', error);
        return res.status(400).send({ message: 'Error while getting fields' });
    }
};


module.exports = {
    getFields,
};