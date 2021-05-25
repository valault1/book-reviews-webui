import React, { useState } from "react";
import styles from "./EntityEditor.module.scss";
import { EntityService } from "../../services/entityService";
import EntityPropertiesEditor from "../EntityPropertiesEditor/EntityPropertiesEditor";
import TagsEditor from "../TagsEditor/TagsEditor";
import { EntityTypeService } from "../../services/entityTypeService";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  TextField,
} from "@material-ui/core";

const EntityEditor = (prop) => {
  React.useEffect(() => {
    getAvailableEntityTypeIds();
  }, []);
  const [entityTypeId, setEntityTypeId] = useState("");
  const [properties, setProperties] = useState({});
  const [tags, setTags] = useState([]);
  const [entityTypes, setEntityTypes] = useState([]);
  const [entityType, setEntityType] = useState({});
  const [name, setName] = useState({});

  const handleSubmit = () => {
    EntityService.createEntity(getEntity());
  };
  const getEntity = () => {
    return {
      name: name,
      entityTypeId: entityTypeId,
      properties: properties,
      tags: tags,
    };
  };
  const handleEntityTypeIdChange = (event) => {
    setEntityTypeId(event.target.value);
    var targetId = event.target.value;
    for (var et of entityTypes) {
      if (et.id === targetId) {
        setEntityType(et);
      }
    }
  };
  const tagsEventHandler = (data) => {
    setTags(data);
  };
  const propertiesEventHandler = (data) => {
    setProperties(data);
  };
  const getAvailableEntityTypeIds = async () => {
    var entities = await EntityTypeService.getEntityTypes();
    await setEntityTypes(entities);
    console.log("done fetching entity types!");
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  //getAvailableEntityTypeIds();
  return (
    <div className={styles.EntityEditor} data-testid="EntityEditor">
      <Card>
        <br></br>

        <FormControl variant="filled">
          <InputLabel id="demo-simple-select-filled-label">
            Select Entity Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            onChange={(event) => handleEntityTypeIdChange(event)}
          >
            <MenuItem value=""></MenuItem>
            {entityTypes.map((entityType, index) => (
              <MenuItem value={entityType.id}>
                {entityType.entityTypeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="filled-basic"
          label="Name"
          variant="filled"
          onChange={(event) => handleNameChange(event)}
        />

        <EntityPropertiesEditor
          onChange={propertiesEventHandler}
          fields={entityType.properties}
        ></EntityPropertiesEditor>
        <TagsEditor onChange={tagsEventHandler}></TagsEditor>
        <div xs="6">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Card>
      <div>{JSON.stringify(getEntity())}</div>
      <div>{"----------------------------  " + JSON.stringify(entityType)}</div>
      <div>test</div>
    </div>
  );
};
export default EntityEditor;
