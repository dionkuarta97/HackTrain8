"use strict";
const encryptPass = require("../helper/encryptPass");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Appointment);
    }

    static cek_email(pram) {
      return User.findAll({
        where: {
          email: pram,
        },
      });
    }

    static cek_hint(pram) {
      return User.findAll({
        where: {
          hint: pram,
        },
      });
    }

    hint_reset_password(nik, phone, name, email) {
      let nama = name.substr(0, 1).toUpperCase();
      let em = email.substr(0, 1);
      let newName = name.substr(-1).toUpperCase();
      let nohp = phone.substr(-3);
      let em1 = email.substr(2, 4).toLowerCase();
      let noik = nik.substr(-4);
      return `${nama}${em}_${nohp}_${noik}${newName}${em1}`;
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email cannot be empty.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty.",
          },
        },
      },
      birthDate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: "Please select birth date.",
          },
        },
      },
      nik: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "nik cannot be empty.",
          },
        },
      },
      handphone: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Phone number cannot be empty.",
          },
        },
      },
      role: DataTypes.INTEGER,
      hint: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (instances, options) => {
          instances.hint = instances.hint_reset_password(
            instances.nik,
            instances.handphone,
            instances.name,
            instances.email
          );
          // console.log(instances.hint);
          instances.password = encryptPass(instances.password);
          // console.log(instances.password,"sesudah")
          instances.role = 2;
        },
        beforeUpdate: (instances, options) => {
          instances.password = encryptPass(instances.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
