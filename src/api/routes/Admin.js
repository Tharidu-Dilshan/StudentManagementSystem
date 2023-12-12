const express = require("express");
const router = express.Router();
const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { default: config } = require("../../configs");

const sec = config.SECRET;

router.use(cookieParser());
router.use(express.json());

// Signup route
router.post("/signup", async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Validate input
    if (!userName || !password) {
      return res
        .status(400)
        .json({ error: "User Name and password are required." });
    }

    // Check if admin with the given User Name already exists
    const existingAdmin = await Admin.findOne({ userName });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Admin with this User Name already exists." });
    }

    // Create a new admin
    const admin = await Admin.create({
      userName,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });

    res.json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message || "Error creating admin." });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Validate input
    if (!userName || !password) {
      return res
        .status(400)
        .json({ error: "User Name and password are required." });
    }

    const admin = await Admin.findOne({ userName });

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Generate a JWT token and set it as a cookie
    jwt.sign({ userName, id: admin._id }, sec, {}, (err, token) => {
      if (err) {
        return res.status(500).json({ error: "Error generating token." });
      }

      res
        .cookie("token", token)
        .json({ message: "You are successfully logged in" });
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Error during login." });
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
      userName: admin.userName,
    });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
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
      userName: admin.userName,
    });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
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
    res.clearCookie("token").json({ message: "Your account has been deleted" });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "You have been logged out" });
});

// Get all admins route
router.get("/admins", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message || "Error fetching admins" });
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
    res.status(500).json({ error: err.message || "Error deleting admin" });
  }
});

module.exports = router;
