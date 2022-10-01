import React, { useState } from "react";
import { GymPlot } from "../components/GymPlot";
import { CONFIG } from "../runconfig";

function SimpleCheckbox(props) {
  return (
    <div>
      <input
        type="checkbox"
        checked={props.checked}
        onClick={props.onclick}
        onChange={props.onchange}
      ></input>&nbsp;
      {props.name}
    </div>
  );
}

const MAX_DAY_TIME = 24;
const MAX_WEEK_TIME = 7;

const TimeMode = {
  DAY: 0,
  WEEK: 1,
};

const getDayId = (day) => {
  const dayMap = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
    "all",
  ];
  return day >= 0 && day < 8
    ? dayMap[day]
    : (() => {
        alert("don't know what day " + day + " is");
        return null;
      })();
};

let gymData = undefined;

const Gym = () => {
  const [weeklyMode, setWeeklyMode] = useState(false);
  const [plotData, setData] = useState(undefined);
  const [lineChart, setLineChart] = useState(true);

  // this is really bad decoupling really the plotting 
  // aspect should be separated from the data parsing aspect
  // oh well
  const updateChart = () => {
    if (!gymData) { return; }
    setData(parseData(gymData, lineChart))
  }

  if (!gymData) {
    fetch(CONFIG.serverLocation + "/gym-population")
      .then((response) =>
        response
          .json()
          .then((data) => {
            // console.log("data received, parsing...");
            gymData = data;
            updateChart()
          })
          .catch((e) => {
            // json parse error
            console.error(e);
          })
      )
      .catch((error) => {
        // alert("It appears an error has occurred while fetching the data. Sorry :/")
        console.error(error);
      });
  }
  return (
    <div className="h-full">
      <h1>Gym Population!</h1>
      <a href="https://github.com/veggiebob/gym-data-recorder">Source</a>
      <br />
      <p>
        This is a historical record of the values found at <a href='https://recreation.rit.edu/facilityoccupancy'>the RIT recreation website</a>. 
        <br />
        Data collection started at approximately 10:00am on August 24th, 2022.  
      </p>
      <div>
        <SimpleCheckbox name="Line Chart" onchange={e => {
          setLineChart(e.target.checked);
          updateChart()
        }}/>
      </div>
      <GymPlot
        data={plotData}
        layout={{
          width: 1200,
          height: 800,
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          yaxis: {
            range: [0, 160]
          }
        }}
        config={{
          displayModeBar: false
        }}
      />
    </div>
  );
}



const maximum_time_value = (mode) => {
  switch (mode) {
    case TimeMode.DAY:
      return MAX_DAY_TIME;
    case TimeMode.WEEK:
      return MAX_WEEK_TIME;
    default:
      return 0;
  }
}

const add_minutes = (time, delta) => {
  let hours = time[0];
  let minutes = time[1];
  minutes += delta;
  // not necessary to do while loop
  if (minutes >= 60) {
    hours += 1;
    minutes -= 60;
  }
  // if (hours >= 24) {
  // hours -= 24;
  // }
  return [hours, minutes];
}

const time_from_float = (ftime) => {
  return [Math.floor(ftime * 24), 0] // Math.floor(ftime * 24 * 60) % 24]
}

const time_to_string = (time) => {
  let hours = time[0];
  let minutes = time[1];
  let hours_string = hours.toString();
  let minutes_string = minutes.toString();
  // if (hours < 10) {
  // hours_string = "0" + hours_string;
  // }
  if (minutes < 10) {
    minutes_string = "0" + minutes_string;
  }
  return hours_string + ":" + minutes_string + ":00";
}

const time_as_float = (time) => {
  let ftime = (time[0] + time[1] / 60) / 24;
  switch (timeMode) {
    case TimeMode.DAY:
      return ftime * MAX_DAY_TIME;
    case TimeMode.WEEK:
      return ftime * MAX_WEEK_TIME;
    default:
      return 0;
  }
}

const use_data = (continuation_f) => {
  if (this.cached_data !== undefined) {
    continuation_f(this.cached_data);
  } else {
    fetch(CONFIG.serverLocation + "/gym-population")
      .then((response) =>
        response
          .json()
          .then((data) => {
            // console.log(data)
            this.cached_data = data;
            continuation_f(this.cached_data);
          })
          .catch((e) => {
            // json parse error
            console.error(e);
          })
      )
      .catch((error) => {
        // alert("It appears an error has occurred while fetching the data. Sorry :/")
        console.error(error);
      });
  }
}

const parseData = (data, lineChart) => {
  // some test data
  if (!data.week_mode) {
    // day mode (right now, never used)
    console.log("it's week mode???")
  } else {
    // alert("data retrieved is in week-mode, can only plot day-mode data")
    let days = [];
    for (let i = 0; i < 7; i++) {
      days.push({x: [], y: []});
    }

    let date = new Date();
    let dayDate = date.toISOString().slice(0, 10);
    let currentTime = date.toLocaleTimeString('en-GB').slice(0, 8);
    let maxY = 0;
    for (let i in data.data) {
      // p.x = p.x % 1 // truncate
      // console.log("from " + data.data[i].x + " to " + data.data[i].x % 1)
      let day = Math.floor(data.data[i].x);
      days[day].x.push(dayDate + ' ' + time_to_string(time_from_float(data.data[i].x % 1)));
      days[day].y.push(data.data[i].y);
      maxY = Math.max(maxY, data.data[i].y);
    }
    for (let i = 0; i < days.length; i++) {
      days[i].name = getDayId(i)
      days[i].type = lineChart ? 'bar' : 'line'
    }
    let currentX = dayDate + ' ' + currentTime;
    days.push({x: [currentX, currentX], y: [0, maxY], name:'current time', marker:{color:'red'}})
    return days;
  }
}

  // var trace1 = {
  //   x: [1, 2, 3, 4],
  //   y: [10, 15, 13, 17],
  //   mode: 'markers',
  //   type: 'scatter'
  // };
  
  // var data = [trace1];

  // Plotly.newPlot('plot', data, 
  //   {
  //    paper_bgcolor: 'rgba(0,0,0,0)',
  //     plot_bgcolor: 'rgba(0,0,0,0)'
  //   },
  //   {
  //     displayModeBar: false
  //     // modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d'],
  //   }
  // );

  /*
      JSON Spec:
      {
          week_mode: bool,
          data: [
              {
                  x: float, // [0, 1) if in day mode, [0, 7) if in week mode
                  y: float // population!
              }
          ]
      }
      */
  

export default Gym;
