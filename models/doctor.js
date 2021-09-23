'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.hasMany(models.Appointment)
      Doctor.belongsToMany(models.Day, {through: models.DoctorDay})
      Doctor.belongsTo(models.Specialist)
    }
  };
  Doctor.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Name cannot be empty.'
        }
      }
    },
    fotoDokter: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Photo cannot be empty.'
        }
      }
    },
    biaya: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Price cannot be empty.'
        }
      }
    },
    SpecialistId: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: 'Please Choose Speciality.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};