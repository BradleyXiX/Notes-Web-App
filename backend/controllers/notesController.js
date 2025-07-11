import Note from "../model/note.js"

export async function getAllNotes (_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1});
        res.status(200).send(notes)
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "interal server error"});
    }
}

export async function getNote (req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message : "Note not found"})
        res.status(200).send(note)
    } catch (error) {
        console.error("Error in getNote controller", error);
        res.status(500).json({ message: "interal server error"});
    }
}

export async function createNote (req, res) {
    try {
      const {title, content} = req.body
      const note = new Note({title, content})
      const savedNote = await note.save()
      res.status(201).json({savedNote})
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({ message: "interal server error"});
    }
}

export async function updateNote (req, res) {
    try {
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content});
        if(!updatedNote) return res.status(404).json({message: "note not found"})
        res.status(200).json(updatedNote)
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "interal server error"});
    }
}

export async function deleteNote (req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: "note not found"})
        res.status(200).json({message: "Note deleted successfully"})
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({ message: "interal server error"});
    }
}