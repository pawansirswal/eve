import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Components
import MiniWidgets from "./MiniWidgets";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      breadcrumbItems: [
        { title: "Delisted", link: "#" },
        { title: "Dashboard", link: "#" },
      ],

      reports: [
        {
          icon: "ri-stack-line",
          title: "Total Firms",
          value: "",
          rate: "",
          desc: "",
        },
        {
          icon: "ri-store-2-line",
          title: "Total Share Company",
          value: "23",
          rate: "",
          desc: "",
        },
        {
          icon: "ri-briefcase-4-line",
          title: "Total Customers",
          value: "200",
          rate: "",
          desc: "",
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Dashboard"
              breadcrumbItems={this.state.breadcrumbItems}
            />
            <Row>
              {/* <Col xl={8}> */}
              <Row>
                <MiniWidgets
                  reports={this.state.reports}
                  tableData={this.state.tableData}
                />
              </Row>

              {/* revenue Analytics */}
              {/* <RevenueAnalytics /> */}
              {/* </Col> */}
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
