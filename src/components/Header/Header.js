import React from "react";
import { AppBar, IconButton, Toolbar, FormControlLabel } from "@material-ui/core";
import Brightness3Icon from '@material-ui/icons/Brightness4';

import styles from "./Header.module.css";

const Header = ({ switchTheme }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={styles.iconContainer}>
          <Brightness3Icon onClick={(e) => switchTheme()}/>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
