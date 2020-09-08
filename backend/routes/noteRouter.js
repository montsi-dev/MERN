const router = require("express").Router();
const auth = require("../middleware/auth");
const Note = require("../models/noteModel");

router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ userId: req.user });
  res.json(notes);
});

router.post("/add", auth, async (req, res) => {
  try {
    const { title } = req.body;
    const { text } = req.body;

    // validation
    if (!title || !text)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const newNote = new Note({
      title,
      text,
      userId: req.user,
    });
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const note = await Note.findById(id);
  res.json(note);
});

router.post("/:id", auth, async (req, res) => {
  const id = req.params.id;

  const note = await Note.findById(id, (err, note) => {
    if (!note) {
      res.status(404).send("Note not found");
    } else {
      const { title, text } = req.body;
      note.title = title;
      note.text = text;
      note
        .save()
        .then((note) => {
          res.json(note);
        })
        .catch((err) => res.status(500).send(err.message));
    }
  });
});

router.delete("/:id", auth, async (req, res) => {
  const note = await Note.findOne({ userId: req.user, _id: req.params.id });
  if (!note)
    return res.status(400).json({
      msg: "No note found with this ID that belongs to the current user.",
    });
  const deletedNote = await Note.findByIdAndDelete(req.params.id);
  res.json(deletedNote);
});

module.exports = router;
