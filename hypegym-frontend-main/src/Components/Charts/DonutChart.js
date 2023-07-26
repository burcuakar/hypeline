import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getMembers, getOnlines } from "../API";
import AuthContext from "../Contexts/AuthContext";

function DonutChart() {
  const { gymId } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [onlines, setOnlines] = useState();
  const [totalMembers, setTotalMembers] = useState();

  useEffect(() => {
    const getOnlineRate = async () => {
      await getOnlines(gymId).then((res) => {
        setOnlines(res.data.online_user_ids.length);
      });
      await getMembers(gymId).then((res) => {
        setTotalMembers(res.data.length);
      });
    };

    getOnlineRate().then(() => setLoading(false));
  }, []);

  if (!loading) {
    return (
      <React.Fragment>
        <div className="container-fluid mt-3 mb-3">
          <Chart
            type="donut"
            width={300}
            height={200}
            series={[onlines, Math.abs(totalMembers - onlines)]}
            options={{
              // theme: { mode: 'white' },
              labels: ["Number of Joined", "Number of Offline"],
              title: {
                text: "Rates of Members",
              },

              theme: { mode: "light" },
              color: ["#f90000"],
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        fontSize: 500,
                        color: "red",
                      },
                    },
                  },
                },
              },

              dataLabels: {
                enabled: true,
              },
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default DonutChart;
