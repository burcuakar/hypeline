import React, { useContext, useEffect, useState } from "react";
import { getOnlines, getUser } from "../../../API";
import BarChart from "../../../Charts/BarChart";
import DonutChart from "../../../Charts/DonutChart";
import AuthContext from "../../../Contexts/AuthContext";
import Widget from "../Widgets/Widget";
import "./dashboard.css";

function DashboardPage() {
  const { gymId } = useContext(AuthContext);
  const [onlineMembers, setOnlineMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getActivities = async () => {
      await getOnlines(gymId).then((res) => {
        {
          res.data.online_user_ids.map((memberID) => {
            getUser(memberID).then((res) => {
              setOnlineMembers((prevState) => [...prevState, res.data.email]);
            });
          });
        }
      });
    };
    getActivities().then(setLoading(false));
  }, []);

  if (!loading) {
    return (
      <div id="main_dashboard">
        <div className="dashboard_graphs">
          <div className="widgets">
            <Widget />
          </div>
          <div className="dashboard_barcharts_group">
            <div className="dashboard_barchart">
              <BarChart />
            </div>
            <div className="main_div">
              <div className="dashboard_donutchart">
                <DonutChart />
              </div>
              <div className="active_table_ingym">
                <h2>Activities</h2>
                {onlineMembers.map((ID) => (
                  <span>{ID} - Online</span>
                ))}
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}
export default DashboardPage;
