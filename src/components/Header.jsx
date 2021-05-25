import * as React from "react";
import {
  AppBar,
  Link,
  ListItem,
  ListItemText,
  Toolbar,
} from "@material-ui/core";

const Header = () => {
  const navlinks = [
    { title: `Editor`, path: `/EntityEditor` },
    { title: `Viewer`, path: `/` },
  ];
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {navlinks.map(({ title, path }) => (
          <Link
            href={path}
            key={title}
            color="secondary"
            style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
