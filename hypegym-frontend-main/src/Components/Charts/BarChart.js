import React from "react";
import Chart from "react-apexcharts";

function BarChart() {
  //   const { gymId } = useContext(AuthContext);
  //   const [online, setOnline] = useState();
  //   const [offline, setOffline] = useState();

  //   useEffect(() => {
  //     getOnlines();
  //   }, []);

  return (
    <React.Fragment>
      <Chart
        type="bar"
        width={400}
        height={300}
        series={[
          {
            name: "Male",
            data: [100, 70, 150, 50, 50, 100, 60, 30, 40, 40, 70, 70],
          },
          {
            name: "Female",
            data: [70, 80, 50, 40, 70, 20, 30, 60, 20, 60, 80, 50],
          },
        ]}
        options={{
          title: {
            text: "Numbers of Members by Month",
            style: { fontSize: 18, color: "#22201e" },
          },
          subtitle: {
            text: "Number of Members by Month",
            style: { fontSize: 10, color: "#22201e" },
          },
          color: ["#f90000"],
          theme: { mode: "light" },

          xaxis: {
            // tickPlacement: "on",
            categories: [
              "JAN",
              "FEB",
              "MAR",
              "APR",
              "MAY",
              "JUN",
              "JUL",
              "AUG",
              "SEP",
              "OCT",
              "NOV",
              "DEC",
            ],
            title: {
              // text: "social media",
              // style: { color: "", fontSize: 8 }
            },
          },

          yaxis: {
            labels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                fontSize: "15",
                colors: ["#f7c02c"],
              },
            },
            title: {
              text: "Numbers",
              style: { color: "#f7c02c", fontSize: 15 },
            },
          },
          toolbar: {
            show: false,
          },

          legend: {
            show: true,
            position: "right",
          },

          dataLabels: {
            formatter: (val) => {
              return `${val}`;
            },
            style: {
              colors: ["white"],
              fontSize: 10,
            },
          },
        }}
      ></Chart>
    </React.Fragment>
  );
}

export default BarChart;
