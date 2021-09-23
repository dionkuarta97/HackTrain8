'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorDay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DoctorDay.init({
    name: DataTypes.STRING,
    DoctorId: DataTypes.INTEGER,
    DayId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DoctorDay',
  });
  return DoctorDay;
};