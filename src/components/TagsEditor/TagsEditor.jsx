import React, { useState } from "react";
import styles from "./TagsEditor.module.scss";
import { Card, ListGroup } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "@material-ui/core";

const TagsEditor = (props) => {
  const [tags, setTags] = useState(props.initialTags);
  const handleTagChange = (index, event) => {
    var tagsCopy = [...tags];
    tagsCopy[index] = event.target.value;
    setTags(tagsCopy);
    props.onChange(tagsCopy);
  };
  const handleAddTag = () => {
    if (tags[tags.length - 1] !== "") {
      var tagsCopy = [...tags];
      tagsCopy.push("");
      setTags(tagsCopy);
      props.onChange(tagsCopy);
    }
  };
  const handleRemoveTag = (index) => {
    var tagsCopy = [...tags];
    tagsCopy.splice(index, 1);
    setTags(tagsCopy);
    props.onChange(tagsCopy);
  };
  return (
    <div>
      <Container>
        <h2>Tags</h2>
        <ListGroup>
          {tags.map((tag, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="btn "
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                  >
                    Remove
                  </Button>
                </Col>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    id={tag}
                    name={tag}
                    value={tag}
                    onChange={(event) => handleTagChange(index, event)}
                  ></input>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button
          variant="contained"
          color="primary"
          className="btn"
          type="button"
          onClick={() => handleAddTag()}
        >
          Add new Tag
        </Button>
      </Container>
    </div>
  );
};
export default TagsEditor;
