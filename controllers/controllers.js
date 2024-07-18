class Controller {
  static async home(req, res) {
    try {
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
}

module.exports = Controller;