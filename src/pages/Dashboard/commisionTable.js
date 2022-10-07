import React, { Component } from "react";
import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Card,
  CardBody,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { notification, message } from "antd";
import { api_route } from "../../config/config";

// const expandRow = {
//   renderer: (row) => (
//     <>
//       Action :
//       <Link to="#" className="mr-3 text-primary">
//         <i className="mdi mdi-pencil font-size-18"></i>
//       </Link>
//       <Link to="#" className="text-danger">
//         <i className="mdi mdi-trash-can font-size-18"></i>
//       </Link>
//     </>
//   ),
//   showExpandColumn: true,
//   expandByColumnOnly: true,
// };

class CEtable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      tableData: [],
      investorId: "",

      visible: false,
      modal_center: false,
      rowData: {},

      filterFieldsSelect: "generator",
      inputData: "",
      filteredData: [],
    };
  }

  componentDidMount() {
    this.fetchCommisions();
  }

  tog_center = (row) => {
    this.setState((prevState) => ({
      modal_center: !prevState.modal_center,
      rowData: row,
    }));
    this.removeBodyCss();
  };

  removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  show() {
    this.setState({ visible: true });
  }
  hide() {
    this.setState({ visible: false });
  }

  fetchCommisions = () => {
    fetch(api_route + "/dealer/fetchCommisionTable", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ tableData: json, isLoading: false });
        console.log(json);
      });
  };

  handleSelect = (e) => {
    this.setState({
      filterFieldsSelect: e.target.value,
    });
  };

  filterData = (e) => {
    var temp = this.state.tableData;

    if (e.target.value !== "") {
      var filteredArr = temp.filter((obj) => {
        return obj[`${this.state.filterFieldsSelect}`]
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      this.setState({
        filteredData: filteredArr,
      });
    } else {
      this.setState({
        filteredData: this.state.tableData,
      });
    }
  };

  requestPayments = (id) => {
    fetch(api_route + "/dealer/commEarnedStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        message.success("Payment Requested");
        this.commisionEarned();
      });
  };

  render() {
    const data = {
      columns: [
        {
          dataField: "id",
          text: "Company Id",
        },
        {
          dataField: "shareCompany",
          text: "Company",
        },
        {
          dataField: "userPrice",
          text: "User Price",
        },
        {
          dataField: "dealerPrice",
          text: "Dealer Price",
        },
      ],
      rows:
        this.state.filteredData.length > 0
          ? this.state.filteredData
          : this.state.tableData,
    };

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        console.log(row);
        this.tog_center(row);
      },
    };

    const options = {
      pageStartIndex: 1,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: false,
      showTotal: true,
      //   onRowClick: this.tog_center(),
      sizePerPageList: [
        {
          text: "5th",
          value: 10,
        },
        {
          text: "10th",
          value: 10,
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

    if (this.state.tableData.length === 0) {
      return (
        <React.Fragment>
          <div className="page-content">
            <Col lg={20}>
              <Card>
                <CardBody>
                  {/* <Dropdown
                  isOpen={this.state.menu}
                  toggle={() => this.setState({ menu: !this.state.menu })}
                  className="float-right"
                >
                  <DropdownToggle tag="i" className="arrow-none card-drop">
                    <i className="mdi mdi-dots-vertical"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.props.prophandleForm}>
                      Add Firm
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown> */}
                  <h3 className="card-title mb-4">Commisions</h3>

                  <div class="d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Col lg={20}>
            <Card>
              <CardBody>
                <h3 className="card-title mb-4">Commisions</h3>
                <div>
                  <h6>Filter</h6>
                  <Row className="mb-4">
                    <Col md={2}>
                      <select
                        onChange={this.handleSelect}
                        className="form-control"
                      >
                        <option value="id">Select</option>
                        <option value="shareCompany">Company</option>
                        <option value="userPrice">User Price</option>
                        <option value="dealerPrice">Dealer Price</option>
                      </select>
                    </Col>
                    <Col md={6}>
                      <input
                        name="filter"
                        placeholder="Enter Input"
                        type="text"
                        className="form-control"
                        onChange={this.filterData}
                        id="from"
                      />
                    </Col>
                  </Row>
                </div>

                <BootstrapTable
                  keyField="id"
                  data={data.rows}
                  columns={data.columns}
                  hover
                  wrapperClasses="table-responsive"
                  rowClasses="text-nowrap"
                  filter={filterFactory()}
                  // expandRow={ expandRow }
                  pagination={paginationFactory(options)}
                  // selectRow={ selectRow }
                />
              </CardBody>
            </Card>
          </Col>
        </React.Fragment>
      );
    }
  }
}

export default CEtable;
