class Controller {
  static async home(req, res) {
    try {
      // res.send(req.session.userId);
      res.render('home');
    } catch (error) {
      res.send(error);
    }
  }
  static async ifLogin(req, res) {
    try {

      res.send("postHome");
    } catch (error) {
      res.send(error);
    }
  }
  // static async home() {
  //   try {
  //     res.render("Home");
  //   } catch (error) {
  //     res.send(error);
  //   }
  // }
}

module.exports = Controller;