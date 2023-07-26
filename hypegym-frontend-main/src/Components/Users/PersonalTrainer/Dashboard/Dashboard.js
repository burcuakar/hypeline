import React from "react";
import BarChart from "../../../Charts/BarChart";
import DonutChart from "../../../Charts/DonutChart";

import NavbarDashboard from "../../Member/NavbarDashboard/NavbarDashboard";
import Widget from "../../Owner/Widgets/Widget";
import ManageMembersPT from "../ManageMemberForPT/ManageMembersPT";

import "./dashboard.css";

function DashboardPage() {
  return (
    <div id="main_dashboard">
      {/* <div className="dashboard_graphs">
        <NavbarDashboard />
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
            <div className="active_table_ingym">Activities</div>
          </div>{" "}
        </div>
      </div> */}

      <ManageMembersPT />
    </div>
  );
}
export default DashboardPage;
