const { User } = require("../models");

const sendMail = require("../helper/sendMail");

const htmlspecialchars = require("htmlspecialchars");

class register_controller {
  static userRegister(req, res) {
    let message = req.flash();
    res.render("registerUser", {
      tittle: "Register",
      session: req.session,
      message: message,
    });
  }

  static userRegisterPost(req, res) {
    if (req.body["password"] !== req.body["password2"]) {
      req.flash("error", "Password Tidak Sama");
      return res.redirect("/register");
    }
    User.cek_email(req.body["email"])
      .then((data) => {
        if (data.length > 0) {
          req.flash("error", "email pernah di masukan");
          return res.redirect("/register");
        } else {
          let { nama, birthDate, nik, phone, email, password } = req.body;
          // console.log(req.body)
          // res.send('terdater')
          User.create({
            name: htmlspecialchars(nama),
            email: htmlspecialchars(email),
            password: htmlspecialchars(password),
            birthDate: htmlspecialchars(birthDate),
            nik: htmlspecialchars(nik),
            handphone: htmlspecialchars(phone),
          })
            .then((data) => {
              sendMail(data.hint, data.email);
              req.flash("success", "Selamat anda sukses daftar");
              res.redirect("/");
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
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = register_controller;
