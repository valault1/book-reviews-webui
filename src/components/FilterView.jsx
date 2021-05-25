import React, { useState, useEffect, useRef, useCallback } from "react";
import { EntityService } from "../services/entityService";
import EntityViewer from "./EntityViewer";
import { Container, Row, Col } from "react-bootstrap";
import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useStateWithCallback from "use-state-with-callback";

const FilterView = () => {
  var [entities, setEntities] = useState([]);
  var [filteredEntities, setFilteredEntities] = useState([]);
  var [currentTags, setCurrentTags] = useState([]);
  var [possibleTags, setPossibleTags] = useState([]);
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      async function init() {
        didMountRef.current = true;
        await getEntities();
        await getTags();
      }
      init();
    } else {
      // runs every update
    }
  });

  const getEntities = async () => {
    console.log("getting entities...");
    var e = await EntityService.getAllEntities();
    console.log("GOT ENTITIES");
    console.log(e);
    setEntities(e);
    setFilteredEntities(e); // start the filtered list with everything
  };

  const getTags = async () => {
    console.log("getting tags...");
    var t = await EntityService.getAllTags();
    console.log(t);
    console.log(entities);
    setPossibleTags(t);
  };

  const onNameChange = (newName, index) => {
    var e = [...entities];
    e[index].name = newName;
    setEntities(e);
  };

  const handleFilterChange = (event, values) => {
    setCurrentTags(values);
  };

  const filterEntities = React.useCallback(() => {
    if (currentTags.length === 0) {
      setFilteredEntities([...entities]);
      return;
    }
    var entitiesTemp = JSON.parse(JSON.stringify(entities));
    // Strategy:
    // 1. Start with All entities.
    // 2. Go through each tag, deleting each entity that doesn't have that tag
    for (var tag of currentTags) {
      for (var entity of entitiesTemp) {
        if (!entity.tags.includes(tag)) {
          entity.invalid = true;
        }
      }
    }
    var result = [];
    for (var e of entitiesTemp) {
      if (!e.invalid) result.push(entity);
    }
    setFilteredEntities(result);
  }, [currentTags, entities]);

  useEffect(() => {
    filterEntities();
  }, [currentTags, filterEntities]);

  return (
    <div>
      <Autocomplete
        multiple
        options={possibleTags}
        getOptionLabel={(option) => option}
        defaultValue={[]}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Search Tags" />
        )}
        onChange={handleFilterChange}
      />
      <br></br>
      <Grid container spacing={5}>
        {filteredEntities.map((entity, index) => {
          return (
            <Grid item>
              <EntityViewer
                entity={entity}
                onNameChange={onNameChange}
                index={index}
                onTagsChange={getTags}
              ></EntityViewer>
            </Grid>
          );
        })}
      </Grid>
      <div>{JSON.stringify(filteredEntities)}</div>
    </div>
  );
};
export default FilterView;
