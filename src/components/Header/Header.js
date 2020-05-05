import React from "react";

import { AppBar, Toolbar } from "@material-ui/core";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';

import styles from "./Header.module.css";

const Header = ({ switchTheme, theme }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={styles.iconContainer}>
          {theme === 'light' ?
            <Brightness4Icon
              onClick={(e) => switchTheme()}/> :
            <Brightness5Icon
              onClick={(e) => switchTheme()}
              color="action" />}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
