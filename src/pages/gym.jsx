import React from "react";
import { Link } from "react-router-dom";

function SimpleCheckbox(props) {
  return (
    <div>
      <input
        type="checkbox"
        checked={props.checked}
        onClick={props.onclick}
        onChange={props.onChange}
      ></input>
      {props.name}
    </div>
  );
}

class Gym extends React.Component {
  constructor(props) {
    super(props);
    this.rendered = false;
    this.state = {
      weekly_mode: false,
      days_shown: {
        all: true,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
    };
  }

  getDayId(day) {
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
  }

  getDay(dayString) {
    return (
      this.state.days_shown.all ||
      (dayString in this.state.days_shown
        ? this.state.days_shown[dayString]
        : false)
    );
  }

  render() {
    if (this.rendered) {
      this.updateGraph();
    } else {
      this.rendered = true;
    }
    return (
      <div>
        <h1>Gym Population!</h1>
        <a href="https://github.com/veggiebob/gym-data-recorder">Source</a>
        <br />
        <Link to="/">Homepage</Link>
        <p>
          More info coming soon. Historical records for gym population are being
          collected. Limited (2 weeks' worth) data is shown.
        </p>
        <div>
          {Object.keys(this.state.days_shown).map((key) => (
            <SimpleCheckbox
              name={key}
              key={key}
              checked={this.state.days_shown.all || this.state.days_shown[key]}
              onclick={() => {
                this.state.days_shown[key] = !this.state.days_shown[key];
                this.setState(this.state);
              }}
            />
          ))}
        </div>
        <canvas id="canvas" width="900" height="700" margin="10px"></canvas>
      </div>
    );
  }

  componentDidMount() {
    this.updateGraph();
  }

  updateGraph() {
    const gymContext = this;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // draw the background
    function background(color) {
      ctx.clearRect(0, 0, width, height);
    }

    const MAX_POP = 150;
    const MAX_DAY_TIME = 24;
    const MAX_WEEK_TIME = 7;

    const TimeMode = {
      DAY: 0,
      WEEK: 1,
    };

    function maximum_time_value(mode) {
      switch (mode) {
        case TimeMode.DAY:
          return MAX_DAY_TIME;
        case TimeMode.WEEK:
          return MAX_WEEK_TIME;
        default:
          return 0;
      }
    }

    function add_minutes(time, delta) {
      let hours = time[0];
      let minutes = time[1];
      minutes += delta;
      if (minutes >= 60) {
        hours += 1;
        minutes -= 60;
      }
      // if (hours >= 24) {
      // hours -= 24;
      // }
      return [hours, minutes];
    }

    function time_to_string(time) {
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
      return hours_string + ":" + minutes_string;
    }

    function time_as_float(time) {
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

    let timeMode = TimeMode.DAY;

    const TIME_INCREMENT = 60; // in minutes
    const POP_INCREMENT = 15; // in people

    const BOTTOM_MARGIN = 50; // pixels
    const LEFT_MARGIN = 30; // pixels
    const CORRECTED_HEIGHT = height - BOTTOM_MARGIN;

    function transform_coordinates(x, y) {
      return {
        x:
          (x / maximum_time_value(timeMode)) * (width - LEFT_MARGIN) +
          LEFT_MARGIN,
        y: height - (y / MAX_POP) * CORRECTED_HEIGHT - BOTTOM_MARGIN,
      };
    }

    function draw_daily_data(data, color) {
      if (color) {
        ctx.strokeStyle = color;
      } else {
        ctx.strokeStyle = "#0ff";
      }
      let previous = null;
      ctx.lineWidth = 2;
      for (let i = 0; i < data.length; i++) {
        const { x, y } = transform_coordinates(
          data[i].x * maximum_time_value(timeMode),
          data[i].y
        );
        if (previous !== null) {
          ctx.moveTo(previous.x, previous.y);
          ctx.beginPath();
          ctx.lineTo(previous.x, previous.y);
          ctx.lineTo(x, y);
          ctx.closePath();
          ctx.stroke();
        }
        previous = { x, y };
      }
    }

    function plot_daily_data(data, color) {
      if (color) {
        ctx.fillStyle = color;
      } else {
        ctx.fillStyle = "#0ff";
      }
      for (let i = 0; i < data.length; i++) {
        const { x, y } = transform_coordinates(
          data[i].x * maximum_time_value(timeMode),
          data[i].y
        );
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
        ctx.fill();
      }
      ctx.lineWidth = 1;
    }

    function draw_population_axis() {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(LEFT_MARGIN, 0);
      ctx.lineTo(LEFT_MARGIN, height - BOTTOM_MARGIN);
      ctx.stroke();

      let pop = 0;
      ctx.strokeStyle = "#fff5";
      ctx.textAlign = "right";
      while (pop < MAX_POP) {
        const { x, y } = transform_coordinates(0, pop);
        ctx.beginPath();
        ctx.fillText(pop, LEFT_MARGIN - 2, y);
        ctx.moveTo(LEFT_MARGIN, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        pop += POP_INCREMENT;
      }
    }

    function draw_time_axis() {
      // draw some sample text
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.font = "15px serif";
      // ctx.fillText("Canvas!", width / 2, height / 2);
      let y = height - BOTTOM_MARGIN / 2;
      let time = [0, 0];
      let i = 0;
      while (time[0] < 24) {
        const { x, _ } = transform_coordinates(time_as_float(time), 0);
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 2);
        ctx.fillText(time_to_string(time), 0, 0);
        ctx.rotate(-Math.PI / 2);
        ctx.translate(-x, -y);

        if (i % 2 == 0) {
          // draw grid lines
          ctx.strokeStyle = "#fff5";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, height - BOTTOM_MARGIN);
          ctx.lineTo(x, 0);
          ctx.stroke();
        }

        time = add_minutes(time, TIME_INCREMENT);
        i++;
      }

      // just to make sure any translations are undone
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(LEFT_MARGIN, height - BOTTOM_MARGIN);
      ctx.lineTo(width, height - BOTTOM_MARGIN);
      ctx.stroke();
    }

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
    function draw_scene(data) {
      background();

      // some test data
      if (!data.week_mode) {
        plot_daily_data(data.data);
      } else {
        // alert("data retrieved is in week-mode, can only plot day-mode data")
        let days = [];
        for (let i = 0; i < 7; i++) {
          days.push([]);
        }

        for (let i in data.data) {
          // p.x = p.x % 1 // truncate
          // console.log("from " + data.data[i].x + " to " + data.data[i].x % 1)
          let day = Math.floor(data.data[i].x);
          days[day].push({
            x: data.data[i].x % 1,
            y: data.data[i].y,
          });
        }
        let hue = 0;
        let bright_color = (r) => {
          return `hsl(${(360 / days.length) * r}, 100%, 50%)`;
        };
        for (let i = 0; i < days.length; i++) {
          if (gymContext.getDay(gymContext.getDayId(i))) {
            let day_data = days[i];
            draw_daily_data(day_data, bright_color(i));
          }
        }
      }

      draw_time_axis();
      draw_population_axis();
    }

    // stolen from stack overflow
    function streamToString(stream) {
      const chunks = [];
      return new Promise((resolve, reject) => {
        stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on("error", (err) => reject(err));
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      });
    }

    let last_response = null;
    function redraw_graph() {
      fetch("/gym-population", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) =>
          response
            .json()
            .then((data) => {
              // console.log(data)
              draw_scene(data);
            })
            .catch((e) => {
              // alert("It appears an error has occurred while fetching the data. Sorry :/")
              console.log(e);
            })
        )
        .catch((error) => {
          // alert("It appears an error has occurred while fetching the data. Sorry :/")
          console.log(error);
        });
    }

    redraw_graph();
  }
}

export default Gym;
