import React, { useState } from "react";
import styles from "./EntityViewer.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card } from "react-bootstrap";
import { ResizableBox } from "react-resizable";
import { EntityService } from "../services/entityService";
import { Button, TextField } from "@material-ui/core";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import TagsEditor from "./TagsEditor/TagsEditor";

const EntityViewer = (props) => {
  var initNotes = props.entity.notes
    ? () =>
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.entity.notes))
        )
    : () => EditorState.createEmpty();
  const [editorState, setEditorState] = React.useState(initNotes);
  const [tags, setTags] = React.useState(props.entity.tags);


  const saveNote = () => {
    console.log(editorState);
    var e = getEntity();
    console.log(e);
    EntityService.updateEntity(e);
  };

  const getEntity = () => {
    var newEntity = props.entity;
    newEntity.notes = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    newEntity.tags = tags;
    return newEntity;
  };

  const handleNameChange = (event) => {
    props.onNameChange(event.target.value, props.index);
  };

  const handleEditorChange = (event) => {
    setEditorState(event);
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const onChange = (editorState) => this.setNotes(editorState);
  return (
    <div className="layoutRoot">
      <ResizableBox
        className="box"
        width={350}
        height={500}
        draggableOpts={{ grid: [20, 20] }}
        lockAspectRatio={false}
        axis="both"
      >
        <Card
          style={{
            height: "100%",
          }}
        >
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            value={props.entity.name}
            onChange={(event) => handleNameChange(event)}
          />
          <div className="scroll-container">
            <Editor editorState={editorState} onChange={handleEditorChange} />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => saveNote()}
          >
            save
          </Button>
          <TagsEditor
            initialTags={tags}
            onChange={handleTagsChange}
          ></TagsEditor>
        </Card>
        <br></br>
      </ResizableBox>
    </div>
  );
};
export default EntityViewer;
