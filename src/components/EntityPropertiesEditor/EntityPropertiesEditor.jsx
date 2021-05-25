import React, { useState, useEffect, useRef } from "react";
import styles from "./EntityPropertiesEditor.module.scss";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import { couldStartTrivia } from "typescript";
import { Button } from "@material-ui/core";

const EntityPropertiesEditor = (props) => {
  const didMountRef = useRef(false);
  // compared to props on every render to see if props has changed.
  const oldProps = useRef(props);
  useEffect(() => {
    if (didMountRef.current) {
      // the function has updated
      if (oldProps.current != props) UpdateFields();
    } else {
      // runs only on mount
      didMountRef.current = true;
    }
  });

  const canAddAndDeleteFields = false;
  const [inputFields, setInputFields] = useState([
    {
      property: {
        propertyName: "First Name",
        propertyType: "String",
        value: "",
      },
    },
    {
      property: {
        propertyName: "Middle Name",
        propertyType: "String",
        value: "",
      },
    },
    {
      property: {
        propertyName: "Last Name",
        propertyType: "String",
        value: "",
      },
    },
  ]);

  const [newFieldName, setNewFieldName] = useState("");

  const handleInputChange = (inputField, index, event) => {
    const values = [...inputFields];
    values[index].property.value = event.target.value;
    setInputFields(values);
    props.onChange(formatProperties());
  };

  // When the props changes, this updates inputFields to match the properties passed in
  const UpdateFields = () => {
    console.log("UPDATING FIELDS");
    oldProps.current = props;
    var result = [];
    if (!props.fields || props.fields === []) return;
    for (var field of props.fields) {
      var temp = { property: field };
      if (!temp.property.value) temp.property.value = "";
      result.push(temp);
    }
    setInputFields(result);
  };

  const handleAddField = () => {
    const values = [...inputFields];
    values.push({
      property: {
        propertyName: newFieldName,
        propertyType: "String",
        value: "",
      },
    });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleNewFieldNameInputChange = (evt) => {
    setNewFieldName(evt.target.value);
  };

  // takes inputFields and returns it as a list of properties ex [{propertyName:""...}]
  const formatProperties = () => {
    var result = [];
    for (var prop of inputFields) {
      result.push({
        propertyName: prop.property.propertyName,
        propertyType: prop.property.propertyType,
        value: prop.property.value,
      });
    }
    return result;
  };
  return (
    <>
      <h2>Entity Properties</h2>
      <div className="form-row">
        {inputFields.map((inputField, index) => (
          <React.Fragment key={`${inputField}~${index}`}>
            <div className="form-group col-sm-11">
              <label htmlFor={inputField.property.propertyName}>
                {inputField.property.propertyName}
              </label>
              <Row>
                <Col xs="1">
                  {canAddAndDeleteFields && (
                    <Button
                      className="btn btn-link"
                      type="button"
                      toolTip="Remove this field"
                      onClick={() => handleRemoveFields(index)}
                    >
                      -
                    </Button>
                  )}
                </Col>
                <Col xs="11">
                  <input
                    type="text"
                    className="form-control"
                    id={inputField.property.propertyName}
                    name={inputField.property.propertyName}
                    value={inputField.property.value}
                    onChange={(event) =>
                      handleInputChange(inputField, index, event)
                    }
                  />
                </Col>
              </Row>
            </div>
          </React.Fragment>
        ))}
        <br />
        {canAddAndDeleteFields && (
          <Row>
            <label htmlFor="newField">New Field Name</label>
            <Col xs="1">
              <Button
                className="btn btn-link"
                type="button"
                onClick={() => handleAddField()}
              >
                +
              </Button>
            </Col>
            <Col xs="10">
              <input
                type="text"
                className="form-control"
                id="newField"
                name="newField"
                value={newFieldName}
                onChange={(event) => handleNewFieldNameInputChange(event)}
              />
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default EntityPropertiesEditor;
