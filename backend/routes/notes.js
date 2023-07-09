const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Router 1: Get All the notes using: GET "/api/notes/fetchallnote" .  login required
router.get('/fetchallnote', fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message),
        res.status(500).send("Internal Server Error");
    }
})

//Router 2: Add a notes using: POST "/api/notes/addnote" .  login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be of atleast 5 character').isLength({ min: 5 }),
], async (req,res)=>{ 
    const {title, description, tag} = req.body;
    const errors = validationResult(req);

    // If there are errors, return Bad request and the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = new Notes({
          title, description, tag, user: req.user.id
        })
        const savedData = await note.save();
        res.json(savedData);
    } catch (error) {
        console.error(error.message),
        res.status(500).send("Internal Server Error")
    }
})

//Router 3: Update a existing note using: PUT "/api/notes/updatenote" .  login required
router.put('/updatenote/:id', fetchuser, async (req,res)=>{ 
    
   const {title, description, tag} = req.body;
   // update a note
   const newNote = {};
   if(title){ newNote.title = title;}
   if(description){ newNote.description = description;}
   if(tag){ newNote.tag = tag;}
//    console.log(newNote)
    try {
        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){
         // console.log(req.params.id);
         return res.status(404).send('Not Found');
        }
     
        if(note.user.toString()!==req.user.id){
         return res.status(401).send('Not Allowed');
        }
     
        note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote}, {new: true});
        res.json({note})
    } catch (error) {
        console.error(error.message),
        res.status(500).send("Internal Server Error")
    }
    
})


//Router 4: Delete a existing note using: DELETE "/api/notes/deletenote" .  login required
router.delete('/deletenote/:id', fetchuser, async (req,res)=>{ 
     
    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){
        //  console.log(req.params.id);
         return res.status(404).send('Not Found');
        }
        //Allow deletion only if user owns this note
        if(note.user.toString()!==req.user.id){
         return res.status(401).send('Not Allowed');
        }
     
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note})
    } catch (error) {
        console.error(error.message),
        res.status(500).send("Internal Server Error")
    }
 })
 
 

module.exports = router;
