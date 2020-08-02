import React, { Component, Fragment } from "react";
import NotificationSideBar from "../components/NotificationSideBar";
import SchemeCard from "../components/SchemesCard";
import CustomCard from "../components/CustomCard";
import { getUserInfo } from "../services/auth";

class Dashboard extends Component {
  componentDidMount() {
    getUserInfo();
  }
  render() {
    const ListItems = [
      {
        department: "Agriculture",
        date: "27/05/2021",
        description: `Provision for reduction of education cost of farmers who fall below poverty line`,
        name: "Krishi Vikas ",
      },
      {
        department: "Education",
        date: "27/05/2021",
        description: `coverage of larger area in the plan of providing free mid-day meal`,
        name: "Mid Day Meal",
      },
      {
        department: "Digitally Empowered Nation",
        date: "04/05/2021",
        description: `Promotion of Online Education and Interviews, cross-platform knowledge sharing and practical project building`,
        name: "Green revolution",
      },
      {
        department: "Agriculture",
        date: "15/08/2021",
        description: `Adding to its digital troubles is Japan's vertically structured
          bureaucracy: each ministry as well as local governments, for instance,
        have developed`,
        name: "Green revolution",
      },
      {
        department: "Infrastructure",
        date: "26/05/2021",
        description: `More employement for Government affiliated Universities construction`,
        name: "Green revolution",
      },
      {
        department: "Agriculture",
        date: "27/05/2021",
        description: `Adding to its digital troubles is Japan's vertically structured
          bureaucracy: each ministry as well as local governments, for instance,
        have developed`,
        name: "Green revolution",
      },
    ];
    const CardInfoItems = [
      {
        name: "Schemes created",
        num: "15",
      },
      {
        name: "Requests Pending",
        num: "24",
      },
      {
        name: "Requests Closed",
        num: "5",
      },
      {
        name: "Discussions Open",
        num: "50",
      },
    ];
    return (
      <div
        className="dashboard"
        style={{ overflow: "hidden", backgroundColor: "#F7F8F9" }}
      >
        <Fragment>
          <div className="row">
            <div className="col-12 col-md-1"></div>

            <div
              className="col-12 col-md-7"
              style={{ margin: "3rem 1rem 1rem 1rem" }}
            >
              <div className="status-card" style={{ margin: "2rem 0" }}>
                <div className="container">
                  <div className="row">
                    {CardInfoItems.map((item) => (
                      <CustomCard name={item.name} num={item.num} />
                    ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  margin: "1rem 5rem 0 0",
                  padding: "1rem 0 0 3rem",
                  fontWeight: "600",
                  textAlign: "start",
                }}
              >
                <h3
                  style={{
                    fontSize: "32px",
                    padding: "1rem 2rem 0 0",
                    fontWeight: "600",
                    // color: "#E76829",
                    textAlign: "initial",
                  }}
                >
                  Latest Updates
                </h3>
              </div>

              <div
                className="list"
                style={{
                  maxHeight: "56vh",
                  overflowY: "scroll",
                }}
              >
                {ListItems.map((item) => (
                  <div className="scheme-list-items">
                    <SchemeCard
                      name={item.name}
                      date={item.date}
                      department={item.department}
                      description={item.description}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{ margin: "3rem 1rem 1rem 1rem" }}
              className=" row right-sidebar"
            >
              <NotificationSideBar />
            </div>
          </div>
          <style>
            {`.row {
                       display: flex;
                       align-items: center;
              }
              `}
          </style>
        </Fragment>
      </div>
    );
  }
}

export default Dashboard;
