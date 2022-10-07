import React, { Component } from "react";
import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Card,
  CardBody,
  FormGroup,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { api_route } from "../../config/config";

class LogsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      tableData: [],
      isLoading: false,
      user: "delistedAdmin",
    };
  }

  componentDidMount() {
    if (
      localStorage.getItem("user") == "manishMittal" ||
      localStorage.getItem("user") == "delistedAdmin"
    ) {
      this.fetchData("delistedAdmin");
    } else {
      this.props.history.push("dashboard");
    }
  }

  handleSelect = (e) => {
    this.setState({
      user: e.target.value,
    });
    this.fetchData(e.target.value);
  };

  fetchData = (user) => {
    fetch(api_route + `/auth/fetchLogs/${user}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        // this.setState({ tableData: json, isLoading: false });
        this.filterData(json);
      });
  };

  filterData = (data) => {
    let arr = data.sort((a, b) => a.loginTime - b.loginTime);
    this.setState({ tableData: arr.reverse(), isLoading: false });
  };

  render() {
    const data = {
      columns: [
        {
          dataField: "username",
          text: "Name",
        },
        {
          dataField: "date",
          text: "Date",
          formatter: (cellContent, row) => {
            let date = new Date(row.date);
            let dateString = date.toDateString();
            return <p>{dateString}</p>;
          },
        },
        {
          dataField: "loginTime",
          text: "Login Time",
          formatter: (cellContent, row) => {
            let date = new Date(row.loginTime);
            let dateString = date.toLocaleTimeString();
            return <p>{dateString}</p>;
          },
        },
        {
          dataField: "logoutTime",
          text: "Logout Time",
          formatter: (cellContent, row) => {
            if (row.logoutTime != null) {
              let date = new Date(row.logoutTime);
              let dateString = date.toLocaleTimeString();
              return <p>{dateString}</p>;
            } else {
              return <p>Session Active</p>;
            }
          },
        },
        {
          dataField: "logoutType",
          text: "Logout Type",
        },
      ],
      rows: this.state.tableData,
    };

    const options = {
      pageStartIndex: 1,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: false,
      showTotal: true,
      sizePerPageList: [
        {
          text: "5th",
          value: 25,
        },
        {
          text: "10th",
          value: 25,
        },
        {
          text: "All",
          value: data.rows.length,
        },
      ],
    };

    // const selectRow = {
    //   mode: 'checkbox',
    //   clickToSelect: true
    // };
    if (this.props.isLoading) {
      return (
        <React.Fragment>
          <Col lg={20}>
            <Card>
              <CardBody>
                <h4 className="card-title mb-4">User Logs</h4>

                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </React.Fragment>
      );
    } else {
      return (
        <div className="page-content">
          <Col md={6}>
            <FormGroup>
              <Label className="control-label">User</Label>
              <select
                onChange={this.handleSelect}
                className="form-control select2"
              >
                <option
                  selected={this.state.user == "manishMittal"}
                  value="manishMittal"
                >
                  Manish Mittal
                </option>
                <option
                  selected={this.state.user == "delistedAdmin"}
                  value="delistedAdmin"
                >
                  Admin
                </option>
                <option selected={this.state.user == "jyoti"} value="jyoti">
                  Jyoti
                </option>
                <option
                  selected={this.state.user == "priyanshi"}
                  value="priyanshi"
                >
                  Priyanshi
                </option>
                <option selected={this.state.user == "isha"} value="isha">
                  Isha
                </option>
              </select>
            </FormGroup>
          </Col>
          <Col lg={20}>
            <Card>
              <CardBody>
                <h4 className="card-title mb-4">User Logs</h4>
                <BootstrapTable
                  keyField="id"
                  data={data.rows}
                  columns={data.columns}
                  hover
                  wrapperClasses="table-responsive"
                  rowClasses="text-nowrap"
                  filter={filterFactory()}
                  // expandRow={ expandRow }
                  rowEvents={this.props.rowEvents}
                  pagination={paginationFactory(options)}
                // selectRow={ selectRow }
                />
              </CardBody>
            </Card>
          </Col>
        </div>
      );
    }
  }
}

export default LogsTable;
