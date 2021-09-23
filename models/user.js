'use strict';
const encryptPass = require("../helper/encryptPass")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Appointment)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Name cannot be empty.'
        }
      }
    },
    email:  {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Email cannot be empty.'
        }
      }
    },
    password:  {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Password cannot be empty.'
        }
      }
    },
    birthDate: {
      type: DataTypes.DATE,
      validate:{
        notEmpty:{
          msg: 'Please select birth date.'
        }
      }
    },
    nik:  {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'nik cannot be empty.'
        }
      }
    },
    handphone:  {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Phone number cannot be empty.'
        }
      }
    }
  }, {hooks:{
    beforeCreate: (instances, options) => {
      // console.log(instances.password,"sebelum")
      instances.password = encryptPass(instances.password);
      // console.log(instances.password,"sesudah")
    }
  },
    sequelize,
    modelName: 'User',
  });
  return User;
};