function createExperienceDTO(rawData) {
    return {
        id: rawData.dataValues.id,
        startDate: rawData.dataValues.startDate,
        endDate: rawData.dataValues.endDate,
        companyName: rawData.dataValues.companyName,
    };
}

module.exports = createExperienceDTO;
