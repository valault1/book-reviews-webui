import logo from "./logo.svg";
import "./App.scss";
import EntityEditor from "./components/EntityEditor/EntityEditor";
import { Navbar, Nav } from "react-bootstrap";
import EntityPropertiesEditor from "./components/EntityPropertiesEditor/EntityPropertiesEditor";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import FilterView from './components/FilterView';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div>
      <Header></Header>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Grid container alignItems="center" justify="center">
          <Switch>
          <Route path="/EntityEditor">
            <Grid item style={{"margin":"100px"}} xs={6} >
              <EntityEditor />
            </Grid>
          </Route>
          <Route path="/">
            <div style={{"margin":"100px"}}>
              <FilterView></FilterView>
            </div>
          </Route>
        </Switch>
        </Grid>
        
      </div>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
