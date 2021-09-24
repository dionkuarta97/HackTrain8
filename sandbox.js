const { User, Doctor, Day, DoctorDay, Specialist } = require("./models");

// Day.findByPk(16, {
//   include: [{ model: Doctor, include: [Specialist] }],
// })
//   .then((data) => {
//     console.log(data.Doctors[0]["DoctorDay"].id);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
