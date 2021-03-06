import React, { Component } from "react";
import { Header, Cards, Chart, CountryPicker, ErrorIndicator } from "./components";
import { fetchData } from "./services/covid-api-service";
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, ThemeProvider, Typography} from "@material-ui/core";
import ScrollableAnchor, { goToAnchor } from 'react-scrollable-anchor'
import styles from "./App.module.css";
import coronaImage from "./images/corona.png";

export default class App extends Component {

  state = {
    data: {},
    country: '',
    chartOption: 'all',
    theme: 'dark',
    hasError: false,
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData});
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
    if(country) {
      goToAnchor('chart');
    }
  }

  switchTheme = () => {
    this.setState({theme: (this.state.theme === 'dark' ? 'light' : 'dark')})
  };

  switchChartOption = () => {
    this.setState({chartOption: (this.state.chartOption === 'all' ? 'daily' : 'all')})
  }

  componentDidCatch() {
    this.setState({hasError: true});
  }

  render() {
    const { data, country, chartOption, hasError } = this.state;

    const theme = createMuiTheme({
      palette: {type: this.state.theme}
    });

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header
          switchTheme={this.switchTheme}
          theme={this.state.theme} />
        {hasError ? <ErrorIndicator /> :
          <div className={styles.container} >
            <img className={styles.image} src={coronaImage} alt="COVID-19"/>
            <Cards data={data}/>
            {chartOption === "all" ? <CountryPicker handleCountryChange={this.handleCountryChange}/> : null }
            {country ? null :
              <Typography
                variant="h6"
                className={styles.dailyOption}
                onClick={(e) => this.switchChartOption()}>
                {chartOption === 'all' ? 'Show daily dynamic of new cases in world' : 'Show cases in countries'}
              </Typography>}
            <Chart data={data} country={country} chartOption={chartOption} />
            <ScrollableAnchor id={'chart'}><div /></ScrollableAnchor>
          </div>}
      </ThemeProvider>
    );
  }
}
