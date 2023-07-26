import React, { useContext, useEffect, useState } from "react";
import { getDailyAttendance, getMembers, getTrainers } from "../../../API";
import AuthContext from "../../../Contexts/AuthContext";
import "./widget.css";

function Widget() {
  const [loading, setLoading] = useState(true);
  const [numOfMembers, setNumOfMembers] = useState();
  const [numOfTrainers, setNumOfTrainers] = useState();
  const [dailyAttendance, setDailyAttendance] = useState({
    attendance_count_female: "",
    attendance_count_male: "",
    attendance_count_other: "",
  });

  const { gymId } = useContext(AuthContext);

  useEffect(() => {
    const getInfos = async () => {
      await getMembers().then((res) => setNumOfMembers(res.data.length));
      await getTrainers().then((res) => setNumOfTrainers(res.data.length));
      await getDailyAttendance(gymId).then((res) =>
        setDailyAttendance(res.data)
      );
    };

    getInfos().then(setLoading(false));
  }, []);

  if (!loading) {
    return (
      <div className="a">
        <div className="widget">
          <div className="title">Total Number of Members</div>
          <div className="widget_container">
            <div className="value">{numOfMembers}</div>
            <div className="card_icon">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="40"
                fillRule="orange"
                className="bi bi-people-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="widget">
          <div className="title">Total Number of PTs</div>
          <div className="widget_container">
            <div className="value">{numOfTrainers}</div>
            <div className="card_icon">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="40"
                fillRule="green"
                className="bi bi-people-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="widget">
          <div className="title">Today</div>
          <div className="widget_container">
            <div className="value">
              {dailyAttendance.attendance_count_female +
                dailyAttendance.attendance_count_male}
            </div>
            <div className="card_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="30"
                fillRule="red"
                className="bi bi-geo-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* <div className='widget'>
                <div className='title'>Total Number of Members</div>
                <div className='value'>567</div>
            </div>
            <div className='widget'>
                <div className='title'>Total Number of Members</div>
                <div className='value'>567</div>
            </div> */}
      </div>
    );
  }
}
export default Widget;
