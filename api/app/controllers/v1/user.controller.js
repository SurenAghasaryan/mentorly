const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../../models/index");
const { Op } = require("sequelize");
const createEducationDTO = require("../../dto/education.dto")
const createExperienceDTO = require("../../dto/experience.dto")

const { User, UserInfo, Education, Experience, Field, Position, UserField } = db;
const { sequelize } = db

const userAttributes = ['id', 'name', 'surname', 'type', 'description', 'about', 'createdAt', 'updatedAt'];

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = {
      email,
      password: await bcrypt.hash(password, 10),
    };

    const user = await User.create(data);

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie(
        "access_token",
        token,
        {
          maxAge: 1 * 24 * 60 * 60,
          httpOnly: process.env.NODE_ENV !== 'development',
          secure: process.env.NODE_ENV === 'production'
        }
      );

      return res.status(201).send({ sucess: true, message: 'Sucess' });
    } else {
      return res.status(409).send({ message: "Details are not correct" });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie("access_token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production'
        });

        res.status(201).send({ sucess: true, message: 'Successfully authenticated' });
      } else {
        res.status(401).send({ message: "Authentication failed" });
      }
    } else {
      res.status(401).send({ message: "Authentication failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const { name, surname, type, limit, offset, sort } = req.query;

    const whereConditions = {
      id: {
        [Op.ne]: userId
      },
    }

    if (name) {
      whereConditions.name = name;
    }
    if (surname) {
      whereConditions.surname = surname;
    }
    if (type) {
      whereConditions.type = type;
    }

    const allUsers = await UserInfo.findAndCountAll({
      where: whereConditions,
      attributes: userAttributes,
      limit: limit || 10,
      offset: offset || 0,
      order: sort,
    });

    return res.status(200).send({ sucess: true, data: allUsers });
  } catch (error) {
    return res.status(400).send({ message: 'Error while getting users' });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id ?? req.user.id

    const user = await User.findByPk(userId, {
      include: [
        {
          model: UserInfo,
          as: 'info',
          attributes: ['name', 'surname', 'type', 'description', 'about'],
          include: [
            {
              model: Position,
              as: 'position',
              attributes: ['title']
            }
          ]
        },
        {
          model: Education,
          as: 'educations',
          attributes: ['id', 'startDate', 'endDate', 'institutionTitle']
        },
        {
          model: Experience,
          as: 'experiences',
          attributes: ['id', 'startDate', 'endDate', 'companyName']
        },
        {
          model: Field,
          as: 'fields',
          through: { attributes: [] },
          attributes: ['id', 'name']
        },
      ],
      attributes: ['email']
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send({ sucess: true, data: user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(404).send('User not found');
  }
};

const updateProfile = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const dataForUpdate = req.body.data;

    const user = await UserInfo.findOne({
      where: { userId }
    });

    for (const key in dataForUpdate) {
      user[key] = dataForUpdate[key];
    }

    const updatedUser = await user.save();
    res.status(200).send({ sucess: true, data: updatedUser, message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(400).send({ message: 'User profile update failed' });
  }
};

const addEducation = async (req, res) => {
  const { id: userId } = req.user;
  const { data: { startDate, endDate, institutionTitle } } = req.body;

  try {
    const createdEducation = await Education.create({
      startDate, endDate, institutionTitle, userId
    });

    res.status(201).send({ sucess: true, data: { ...createEducationDTO(createdEducation) }, message: 'Eductaion added successfully' });
  } catch (error) {
    console.error('Error education adding failed:', error);
    res.status(400).send({ message: 'Adding education failed' });
  }
};

const deleteEducation = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  try {
    const deletededucationsCount = await Education.destroy({
      where: { id, userId },
    })
    if (deletededucationsCount > 0) {
      return res.status(201).send({ sucess: true, message: 'Eductaion removed successfully' });
    }

    res.status(201).send({ message: 'Education removing failed' });
  } catch (error) {
    console.error('Error education removing failed:', error);
    res.status(400).send({ message: 'Education removing failed' });
  }
};

const addExperience = async (req, res) => {
  const { id: userId } = req.user;
  const { data: { startDate, endDate, companyName } } = req.body;

  try {
    const createdExperiance = await Experience.create({
      startDate, endDate, companyName, userId
    });

    res.status(201).send({ sucess: true, data: { ...createExperienceDTO(createdExperiance) }, message: 'Experiance added successfully' });
  } catch (error) {
    console.error('Error experiance adding failed:', error);
    res.status(400).send({ message: 'Adding education failed' });
  }
};

const deleteExperience = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  try {
    const deletExperiencesCount = await Experience.destroy({
      where: { id, userId },
    })
    if (deletExperiencesCount > 0) {
      return res.status(201).send({ sucess: true, message: 'Experience removed successfully' });
    }

    res.status(201).send({ message: 'Experience removing failed' });
  } catch (error) {
    console.error('Error Experience removing failed:', error);
    res.status(400).send({ message: 'Experience removing failed' });
  }
};

const attachPosition = async (req, res) => {
  const { id: userId } = req.user;
  const { data: { title } } = req.body;

  try {
    const [position, created] = await Position.findOrCreate({
      where: { title },
      defaults: { title },
      raw: true
    })

    await UserInfo.update(
      { positionId: position.id },
      { where: { userId } }
    );

    res.status(200).send({ sucess: true, message: created ? 'Position created and attached successfully' : 'Position attached successfully', });
  } catch (error) {
    console.error('Error Experience removing failed:', error);
    res.status(400).send({ message: 'Experience removing failed' });
  }
};

const attachFields = async (req, res) => {
  const { id: userId } = req.user;
  const { fieldIds } = req.body.data;

  try {
    const transaction = await sequelize.transaction();

    try {
      await UserField.destroy({
        where: { userId },
        transaction
      });

      const userFields = fieldIds.map(fieldId => ({
        userId,
        fieldId
      }));

      await UserField.bulkCreate(userFields, { transaction });

      await transaction.commit();

      res.status(200).send({ sucess: true, message: 'Fields attached successfully' });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error attaching fields:', error);
    res.status(400).send({ message: 'Fields attaching failed' });
  }
};


module.exports = {
  signin,
  login,
  getUsers,
  getSingleUser,
  updateProfile,
  addEducation,
  deleteEducation,
  addExperience,
  deleteExperience,
  attachPosition,
  attachFields,
};