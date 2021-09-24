const { Day, Doctor, DoctorDay, Specialist, User } = require("../models");

class admin_controller {
  static ShowAdminHome(req, res) {
    res.render("adminHome", { tittle: "Dashboard", session: req.session });
  }

  static showDoctorList(req, res) {
    // res.send("list")
    Doctor.findAll({
      include: Specialist,
    })
      .then((data) => {
        res.render("doctorList", {
          data: data,
          tittle: "List Dokter",
          session: req.session,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addDoctorGet(req, res) {
    Specialist.findAll()
      .then((data) => {
        res.render("formAddDoctor", {
          data: data,
          tittle: "Form Add",
          session: req.session,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addDoctorPost(req, res) {
    let { nama, foto, biaya, specialist } = req.body;
    // res.send("doctor added")
    Doctor.create({
      name: nama,
      fotoDokter: foto,
      biaya: biaya,
      SpecialistId: specialist,
    })
      .then((data) => {
        res.redirect("/Admin/doctors");
      })
      .catch((err) => {
        // console.log(err,"err msg")
        if (err.name === "SequelizeValidationError") {
          let errMsg = err.errors.map((el) => el.message);
          res.send(errMsg);
        } else {
          res.send(err);
        }
      });
  }

  static deleteDoctor(req, res) {
    let { doctorId } = req.params;

    Doctor.destroy({
      where: {
        id: doctorId,
      },
    })
      .then((data) => {
        res.redirect("/Admin/doctors");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static editFormGet(req, res) {
    let { doctorId } = req.params;
    // console.log(doctorId)
    // res.send("edit")
    let doctorData = null;
    Doctor.findOne({
      where: {
        id: doctorId,
      },
    })
      .then((data) => {
        doctorData = data;
        return Specialist.findAll();
      })
      .then((specialist) => {
        res.render("editDoctor", {
          doctorData: doctorData,
          specialist: specialist,
          tittle: "Form Edit",
          session: req.session,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static editFormPost(req, res) {
    let { nama, foto, biaya, specialist } = req.body;
    let { doctorId } = req.params;
    // console.log(req.body,req.params)
    // res.send("edit post")
    Doctor.update(
      {
        name: nama,
        fotoDokter: foto,
        biaya: biaya,
        SpecialistId: specialist,
      },
      {
        where: {
          id: doctorId,
        },
      }
    )
      .then((data) => {
        res.redirect("/Admin/doctors");
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          let errMsg = err.errors.map((el) => el.message);
          res.send(errMsg);
        } else {
          res.send(err);
        }
      });
  }

  static jadwal_docter(req, res) {
    Day.findAll({
      include: [Doctor],
      order: [["id"]],
    })
      .then((data) => {
        res.render("jadwal_dokter", {
          tittle: "Jadwal Dokter",
          session: req.session,
          data: data,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static add_jadwal(req, res) {
    Day.findAll()
      .then((day) => {
        Doctor.findAll()
          .then((docter) => [
            res.render("add_jadwal", {
              tittle: "Tambah Jadwal",
              session: req.session,
              day: day,
              docter: docter,
            }),
          ])
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static save_jadwal(req, res) {
    DoctorDay.create({
      DoctorId: +req.body["DoctorId"],
      DayId: +req.body["DayId"],
    })
      .then(() => {
        res.redirect("/admin/jadwal_dokter");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static detail_jadwal(req, res) {
    let id = Number(req.params.id);
    Day.findByPk(id, {
      include: [{ model: Doctor, include: [Specialist] }],
    })
      .then((data) => {
        res.render("detail_jadwal", {
          tittle: "Jadwal Hari",
          session: req.session,
          data: data,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static delete_jadwal(req, res) {
    let DayId = +req.params.DayId;
    let DoctorId = +req.params.DoctorId;

    DoctorDay.destroy({
      where: {
        DayId: DayId,
        DoctorId: DoctorId,
      },
    })
      .then(() => {
        res.redirect("/admin/jadwal_dokter/" + DayId);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = admin_controller;
