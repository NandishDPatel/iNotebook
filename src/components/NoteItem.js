import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {

  const { note,updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

    // const handleDelete = () => {
    //     deleteNote(note._id)
    // }

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">
            <div className="d-flex align-items-center">
              {note.title}
              <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
              <i className="fa-regular fa-trash-can" onClick={()=> {deleteNote(note._id);props.showAlert("Deleted successfully", "danger");}}></i>
            </div>
          </h5>

          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
