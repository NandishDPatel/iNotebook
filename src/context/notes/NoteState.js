import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //get all notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhNGRlYzBiYmZkMmJiODk5ODY4NWQxIn0sImlhdCI6MTczODk1NDAxOX0.XKtkh4zYWHdM_GQLgTbNvGcbJWzN1iVMYjvrQfpvWEw",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

 // create a new note
const addNote = async (title, description, tag) => {
  try {
    const response = await fetch(`${host}/api/notes/add-note`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhNGRlYzBiYmZkMmJiODk5ODY4NWQxIn0sImlhdCI6MTczODk1NDAxOX0.XKtkh4zYWHdM_GQLgTbNvGcbJWzN1iVMYjvrQfpvWEw",
      },
      body: JSON.stringify({title, description, tag})
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const note = await response.json();
    setNotes(notes.concat(note));
    return note;
  } catch (error) {
    console.error("Error adding note:", error);
  }
}


  //update an existing note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/update-note/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhNGRlYzBiYmZkMmJiODk5ODY4NWQxIn0sImlhdCI6MTczODk1NDAxOX0.XKtkh4zYWHdM_GQLgTbNvGcbJWzN1iVMYjvrQfpvWEw",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
      }
     
    }
    setNotes(newNotes);
  };

  //delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/delete-note/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhNGRlYzBiYmZkMmJiODk5ODY4NWQxIn0sImlhdCI6MTczODk1NDAxOX0.XKtkh4zYWHdM_GQLgTbNvGcbJWzN1iVMYjvrQfpvWEw",
      },
    });
    const json = await response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
