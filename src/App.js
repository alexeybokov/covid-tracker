import React, { Component } from "react";

import { Header, Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./services/covid-api-service";
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, ThemeProvider} from "@material-ui/core";

import styles from "./App.module.css";
import coronaImage from "./images/corona.png";

export default class App extends Component {

  state = {
    data: {},
    country: '',
    theme: 'dark'
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData});
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  }

  switchTheme = () => {
    this.setState({theme: (this.state.theme === 'dark' ? 'light' : 'dark')})
  };

  render() {
    const { data, country } = this.state;

    const theme = createMuiTheme({
      palette: {type: this.state.theme}
    });

    console.log(this.state)

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header switchTheme={this.switchTheme}/>
        <div className={styles.container} >
          <img className={styles.image} src={coronaImage} alt="COVID-19"/>
          <Cards data={data}/>
          <CountryPicker handleCountryChange={this.handleCountryChange}/>
          <Chart data={data} country={country}/>
        </div>
      </ThemeProvider>
    );
  }
}
