const router = require("express").Router();
const User = require("../models/user");
const mailer = require("@sendgrid/mail");
const { createHash } = require("crypto");

mailer.setApiKey(process.env.SENDGRID);

router.get("/login", async (req, res) => {
  try {
    res.json({ success: true, status: !!req.session.uid || false });
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({
      email: String(req.body.email),
      password: String(req.body.password)
    });

    if (!user) {
      res.json({ success: false, message: "Check email or password" });
      return;
    }

    req.session.uid = user._id;
    req.session.save(e => {
      if (e) {
        throw new Error();
      }
      res.json({ success: true, message: "Logged In" });
    });
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  try {
    let _ = await User.findOne({ email: String(req.body.email) });
    if (_) {
      res.json({ success: false, message: "Email already exists" });
      return;
    }

    await new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    }).save();

    res.json({ success: true, message: "Account created" });
  } catch (error) {
    console.warn(error);
    res.json({ success: false, message: "Something went wrong" });
  }
});

router.get("/profile", async (req, res) => {
  try {
    if (req.session.uid) {
      let prof = await User.findById(req.session.uid, { password: false });
      res.json({ success: true, profile: prof });
    } else {
      res.json({ success: false, message: "Unauthorized Access" });
    }
  } catch (er) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

router.put("/profile", async (req, res) => {
  try {
    if (req.session.uid) {
      let prof = await User.findById(req.session.uid);
      prof.name = req.body.name;
      if (req.body.password) prof.password = req.body.password;
      await prof.save();
      res.json({ success: true, message: "Updated" });
    } else {
      res.json({ success: false, message: "Unauthorized Access" });
    }
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

router.delete("/login", async (req, res) => {
  req.session.destroy(e => {
    if (e) {
      res.json({ success: false, message: "Something went wrong" });
    } else {
      res.json({ success: true, message: "Logged in" });
    }
  });
});

router.post("/forgot-password", async (req, res) => {
  try {
    let user = await User.findOne({ email: String(req.body.email) });
    res.json({
      success: true,
      message:
        "If this email is correct, you will recieve password reset instruction"
    });
    if (user) {
      let password = Math.random()
        .toString(36)
        .substr(2);
      user.password = createHash("sha256")
        .update(password)
        .digest("base64");

      await user.save();
      await mailer.send({
        to: user.email,
        subject: "[Vocabopedia] New Password",
        from: "Vocabopedia Bot <no_reply@vocabopedia.io>",
        text: `Hi, ${user.name},\n\nIt seems you have requested for new password.\n\nPassword: ${password}`
      });
    }
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});
module.exports = router;
