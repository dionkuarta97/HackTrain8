class Controller {
  static showLandingPage(req, res) {
    let message = req.flash();
    res.render("landingPage", {
      tittle: "Home",
      session: req.session,
      message: message,
    });
  }

  static userLogin(req, res) {
    res.render("login");
  }
}

module.exports = Controller;
