function createEducationDTO(rawData) {
    return {
        id: rawData.dataValues.id,
        startDate: rawData.dataValues.startDate,
        endDate: rawData.dataValues.endDate,
        institutionTitle: rawData.dataValues.institutionTitle,
    };
}

module.exports = createEducationDTO;
