const express = require("express");

const router = express.Router();

// POST : /user

router.post("/", async (req, res) => {});

// POST : /user/profile
router.post("/profile", async (req, res) => {});
// GET  : /user/profile
router.get("/profile", async (req, res) => {});
// PUT  : /user/profile
router.put("/profile", async (req, res) => {});
