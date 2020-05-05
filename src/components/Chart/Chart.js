import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { fetchDailyData, fetchDailyDelta } from "../../services/covid-api-service";
import styles from "./Chart.module.css";

const Charts = ({ data: { confirmed, recovered, deaths }, country, chartOption }) => {
  const [dailyData, setDailyData] = useState([]);
  const [dailyDelta, setDailyDelta] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
      setDailyDelta(await fetchDailyDelta());
    }

    fetchAPI();
  }, []);

  const lineChart = (
    dailyData.length !== 0
      ? (
        <Line
          data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [{
              data: dailyData.map(({ confirmed }) => confirmed ),
              label: 'infected',
              borderColor: '#3333ff',
              fill: true
            }, {
              data: dailyData.map(({ deaths }) => deaths ),
              label: 'deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              fill: true
            }],
          }}
        />) : null
  );

  const barChart = (
    confirmed
      ? (
        <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths', 'Active'],
            datasets: [{
              label: 'People',
              backgroundColor: [
                'rgba(0, 0, 255, 0.5)',
                'rgba(0, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgb(227,86,21)'
              ],
              data: [
                confirmed.value,
                recovered.value,
                deaths.value,
                confirmed.value - recovered.value - deaths.value]
            }]

        }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },

          }}
        />
      ) : null

  );

  const dailyDeltaChart = (
      dailyDelta.length !== 0
      ? (
        <Line
          data={{
            labels: dailyDelta.map(({ date }) => date),
            datasets: [{
              data: dailyDelta.map(({ confirmed }) => confirmed ),
              label: 'infected',
              borderColor: '#3333ff',
              fill: true
            }]
          }}
        />) : null
  );

  return (
    <div className={styles.container}>
      {chartOption === "all" ? (country ? barChart : lineChart) : dailyDeltaChart}
    </div>
  )
}

export default Charts;
