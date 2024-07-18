class Controller {
  static async home(req, res) {
    try {
      // res.send(req.session.userId);
      res.render('login1');
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
  static async home() {
    try {
      res.send("Home");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;