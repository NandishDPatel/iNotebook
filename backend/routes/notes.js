const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE:1 -> Fetch all the notes : GET '/api/notes/fetch-all-notes' - login required
router.get("/fetch-all-notes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// ROUTE:2 -> add a new note : POST '/api/notes/add-note' - login required
router.post(
  "/add-note",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description can't be lesss than 5 chracters").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newNote = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await newNote.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE:3 -> update a note : PUT '/api/notes/update-note' - login required
router.put("/update-note/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new note to be updated
    const updateNote = {};
    if (title) {
      updateNote.title = title;
    }
    if (description) {
      updateNote.description = description;
    }
    if (updateNote.tag) {
      updateNote.tag = tag;
    }

    let findNote = await Note.findById(req.params.id);
    if (!findNote) {
      return res.status(404).send("Not Found!");
    }
    if (findNote.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed.");
    }
    findNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: updateNote },
      { new: true }
    );
    res.json(findNote);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// ROUTE:4 -> delete a note : DELETE '/api/notes/delete-note/:id' - login required
router.delete("/delete-note/:id", fetchUser, async (req, res) => {
  try {
    let deleteNote = await Note.findById(req.params.id);
    if (!deleteNote) {
      return res.status(404).send("Not Found!");
    }
    //allow deletion only if user owns this note
    if (deleteNote.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed.");
    }
    deleteNote = await Note.findByIdAndDelete(req.params.id);
    res.json("Successfully note has been deleted:)");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
