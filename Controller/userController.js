const app = require("../app");
const User = require("../Model/user");
const sendEmail = require("../Controller/sendEmail/sendEmail");

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, a) => {
    console.log("a", a);
    if (a) {
      if (password == a.password) {
        res.send({ message: "Login successful", a: a });
      } else {
        res.send({ message: "Password didn`t Match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
};

const register = (req, res) => {
  // res.send("My API register")
  console.log(req.body);
  const { fistName, lastName, company, email, contact, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already registered" });
    } else {
      const user = new User({
        fistName: fistName,
        lastName: lastName,
        company: company,
        email: email,
        contact: contact,
        password: password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          console.log("userdata=>", user);
          console.log("userdata-Firstname=>", user.fistName);
          const obj = JSON.parse(JSON.stringify(user));
          console.log("obj=>", obj);

          let firstname = JSON.stringify(user.fistName);
          // let result = bold.capitalize();
          // console.log(bold);
          console.log("firstname", firstname);

          let capitalize = (firstname) =>
            firstname && firstname[0].toUpperCase() + firstname.slice(1);

          console.log("capitalize=>", capitalize);

          const message = `hello ${user.fistName}, You have Successfully Registered.`;

          try {
            sendEmail({
              email: user.email,
              subject: "Thank You! for Registering, Welcome to Our page.",
              message,
            });
            res.send({ message: `Successfully Email send to: ${user.email}` });
          } catch (error) {
            res.send(error);
          }
        }
      });
    }
  });
};

const webinar = (req, res) => {
  res.send({ message: "welcome to webinar" });
};

module.exports = { login, register, webinar };
