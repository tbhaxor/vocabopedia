const router = require("express").Router();
const Word = require("../models/word");
const definer = require("word-definition");

router.get("/", async (req, res) => {
  try {
    if (req.session.uid) {
      let words = await Word.find(
        { addedBy: req.session.uid },
        { addedBy: false, createdOn: false }
      ).sort("-createdOn");
      res.json({ success: true, words });
    } else {
      res.json({ success: false, message: "Unauthorized Access" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.session.uid) {
      let _ = await Word.findOne({
        addedBy: req.session.uid,
        word: req.body.word
      });

      if (_) {
        res.json({ success: false, message: "Already Exists" });
        return;
      }

      let word = new Word();
      definer.getDef(req.body.word, "en", null, async data => {
        if (data.err && data.err == "not found") {
          res.json({ success: false, message: "No Such Word Found" });
        } else {
          word.word = req.body.word;
          word.stem = data.word;
          word.category = data.category;
          word.definition = data.definition;
          word.addedBy = req.session.uid;
          await word.save();
          res.json({
            success: true,
            message: "New Word Created",
            data: {
              _id: word._id,
              word: req.body.word,
              definition: word.definition,
              category: word.category
            }
          });
        }
      });
    } else {
      res.json({ success: false, message: "Unauthorized Access" });
    }
  } catch (error) {
    res.json({ success: false, message: "Unauthorized Access" });
  }
});

router.get("/random", async (req, res) => {
  try {
    let wc = await Word.count();

    let random = Math.floor(Math.random() * wc);

    let word = await Word.findOne(
      {},
      { word: true, category: true, definition: true }
    ).skip(random);

    res.json({ success: true, word });
  } catch (error) {
    res.json({ success: false, message: "Unauthorized Access" });
  }
});

module.exports = router;
