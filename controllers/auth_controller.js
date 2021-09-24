const { User } = require("../models");
var bcrypt = require("bcryptjs");
class auth_controller {
  static userLogin(req, res) {
    let message = req.flash();
    res.render("login", {
      tittle: "Log in",
      session: req.session,
      message: message,
    });
  }

  static cek_login(req, res) {
    let validate = [];
    for (const key in req.body) {
      if (req.body[key].length === 0) {
        validate.push(req.flash("error", `${key} Tidak Boleh Kosong !!`));
      }
    }
    if (validate.length > 0) {
      return res.redirect("/auth");
    }

    User.findAll({
      where: {
        email: req.body["email"],
        role: +req.body["role"],
      },
    })
      .then((data) => {
        if (data.length === 1) {
          if (
            bcrypt.compareSync(req.body["password"], data[0].password) === true
          ) {
            req.session.name = data[0].name;
            req.session.role = data[0].role;
            req.session.save();
            res.redirect("/Admin");
          } else {
            req.flash("error", "Email, Password, Atau Hak Akses Salah !!!");
            res.redirect("/auth");
          }
        } else {
          req.flash("error", "Email, Password, Atau Hak Akses Salah !!!");
          res.redirect("/auth");
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      res.redirect("/auth");
    });
  }

  static lupa_password(req, res) {
    let message = req.flash();
    res.render("lupa_password", {
      tittle: "Lupa Password",
      session: req.session,
      message: message,
    });
  }

  static ganti_password(req, res) {
    User.cek_email(req.body["email"])
      .then((data) => {
        if (data.length === 0) {
          req.flash("error", "Email tidak terdaftar");
          return res.redirect("/auth/lupa_password");
        } else {
          User.cek_hint(req.body["hint"])
            .then((data) => {
              if (data.length > 0) {
                if (req.body["password"] !== req.body["password2"]) {
                  req.flash("error", "Password Tidak Sama");
                  return res.redirect("/auth/lupa_password");
                } else {
                  User.update(
                    {
                      password: req.body["password"],
                    },
                    {
                      where: {
                        hint: req.body["hint"],
                      },
                      individualHooks: true,
                    }
                  )
                    .then(() => {
                      req.flash("success", "Password anda sudah di reset");
                      res.redirect("/");
                    })
                    .catch((err) => {
                      res.send(err);
                    });
                }
              } else {
                req.flash(
                  "error",
                  "hint anda salah, mohon cek email anda kembali"
                );
                return res.redirect("/auth/lupa_password");
              }
            })
            .catch((err) => {
              res.send(err);
            });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = auth_controller;
