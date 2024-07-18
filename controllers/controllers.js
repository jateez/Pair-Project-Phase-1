class Controller {
  static async home(req, res) {
    try {
      res.send(req.session.userId);
    } catch (error) {
      res.send(error);
    }
  }
  // static async home() {
  //   try {
  //     res.send("Home");
  //   } catch (error) {
  //     res.send(error);
  //   }
  // }
  // static async home() {
  //   try {
  //     res.send("Home");
  //   } catch (error) {
  //     res.send(error);
  //   }
  // }
}

module.exports = Controller;