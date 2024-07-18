const { Persona } = require("../models/index.js");

class PersonaController {
  static async home(req, res) {
    try {
      res.render("communities-page")
    } catch (error) {
      res.send(error)
    }
  }
  static async showProfile(req, res) {
    try {

    } catch (error) {
      res.send(error)
    }
  }
  static async updateProfile(req, res) {
    try {

    } catch (error) {
      res.send(error)
    }
  }
  static async showUpdateProfile(req, res) {
    try {

    } catch (error) {
      res.send(error)
    }
  }
  static async createPost(req, res) {
    try {

    } catch (error) {
      res.send(error)
    }
  }
  static async showPost(req, res) {
    try {
      let { postId } = req.params;
    } catch (error) {
      res.send(error)
    }
  }
}
module.exports = PersonaController;