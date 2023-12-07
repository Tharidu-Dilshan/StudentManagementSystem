const express = require("express");
const router = express.Router();
const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

const sec = "kjktjtjtjt";

router.use(cookieparser());

// Signup route
router.post("/signup", async (req, res) => {
  const { name, password } = req.body;

  try {
    const admin = await Admin.create({
      name,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    res.json(admin);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const admin = await Admin.findOne({ name });

  const passwordOk = bcrypt.compareSync(password, admin.password);

  if (passwordOk) {
    // Generate a JWT token and set it as a cookie
    jwt.sign({ name, id: admin._id }, sec, {}, (err, token) => {
      if (err) throw err;

      res.cookie("token", token).json("You are successfully logged in");
    });
  } else {
    res.status(400).json("Wrong credentials");
  }
});

// View profile route
router.get("/profile", async (req, res) => {
  try {
    // Get the admin ID from the JWT token
    const decodedToken = jwt.verify(req.cookies.token, sec);
    const admin = await Admin.findById(decodedToken.id);

    // Return the admin's profile information
    res.json({
      name: admin.name,
    });
  } catch (err) {
    res.status(401).json("Unauthorized");
  }
});

// Update profile route
router.put("/profile", async (req, res) => {
  try {
    // Get the admin ID from the JWT token
    const decodedToken = jwt.verify(req.cookies.token, sec);

    // Find the admin by ID and update their profile information
    const admin = await Admin.findByIdAndUpdate(
      decodedToken.id,
      { $set: req.body },
      { new: true }
    );

    // Return the updated admin information
    res.json({
      name: admin.name,
    });
  } catch (err) {
    res.status(401).json("Unauthorized");
  }
});

// Delete profile route
router.delete("/profile", async (req, res) => {
  try {
    // Get the admin ID from the JWT token
    const decodedToken = jwt.verify(req.cookies.token, sec);

    // Find the admin by ID and delete their profile
    await Admin.findByIdAndDelete(decodedToken.id);

    // Clear the cookie
    res.clearCookie("token").json("Your account has been deleted");
  } catch (err) {
    res.status(401).json("Unauthorized");
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token").json("You have been logged out");
});

// Get all admins route
router.get("/admins", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a specific admin by ID route
router.delete("/admins/:id", async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (deletedAdmin) {
      res.json(`Admin with ID ${req.params.id} has been deleted`);
    } else {
      res.status(404).json(`Admin with ID ${req.params.id} not found`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;