class Controller {
  static async home() {
    try {
      res.send("Home");
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