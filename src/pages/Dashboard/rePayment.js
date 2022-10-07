import React, { Component } from "react";
import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
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

class ReqPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      tableData: [],
      investorId: "",
      refId: "",
      visible: false,
      modal_center: false,
      rowData: {},

      filterFieldsSelect: "generator",
      inputData: "",
      filteredData: [],
    };
  }

  componentDidMount() {
    this.fetchReqPayment();
  }

  settlePayment = (id) => {
    fetch(api_route + "/dealer/commEarnedStatus2", {
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
        message.success("Payment Settled");
        this.fetchReqPayment();
      });
  };

  saveRefid = (id) => {
    var value = document.getElementById(`reqpay` + id).value;
    fetch(api_route + "/dealer/addRefId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: id,
        refId: value,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        message.success("RefId updated");
        this.fetchReqPayment();
      });
  };

  fetchReqPayment = () => {
    console.log("fetchReqPayment is called");
    this.setState({
      isLoading: true,
    });
    fetch(api_route + "/dealer/fetchReqPayment")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ tableData: json, isLoading: false });
        console.log(json);
      });
  };

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

  commisionEarned = () => {
    fetch(api_route + "/dealer/commEarned", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: sessionStorage.getItem("dealerId"),
      }),
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

  handleInput = (e) => {
    this.setState({
      refId: e.target.value,
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
          text: "Bill Id",

          formatter: (cellContent, row) => {
            return (
              <a onClick={() => this.tog_center(row)}>
                <p>{row.id}</p>
              </a>
            );
          },
        },
        {
          dataField: "date",
          text: "Execution Date",
          sort: true,
          datesSorter(a, b) {
            return Date.parse(b) - Date.parse(a);
          },
          formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== "object") {
              dateObj = new Date(cell);
            }
            return `${("0" + dateObj.getDate()).slice(-2)}/${(
              "0" +
              (dateObj.getMonth() + 1)
            ).slice(-2)}/${dateObj.getFullYear()}`;
          },
        },

        {
          dataField: "commision",
          text: "Commision Earned",
        },

        {
          dataField: "refId",
          text: "Ref Id",
          formatter: (cellContent, row) => {
            return (
              <Input
                style={{ width: "100px" }}
                type="text"
                placeholder="Ref Id"
                onChange={this.handleInput}
                // onBlur={() => this.handleDelivRem(row)}
                name="reqpay"
                id={"reqpay" + `${row.id}`}
              />
            );
          },
        },
        {
          dataField: "refId",
          text: "Save Ref Id",
          formatter: (cellContent, row) => {
            return (
              <button
                style={{ fontSize: "12px" }}
                className="btn btn-success btn-xs"
                onClick={() => this.saveRefid(row.id)}
              >
                Save
              </button>
            );
          },
        },

        {
          dataField: "id",
          text: "Settle Payment",
          editable: false,

          formatter: (cellContent, row) => {
            if (row.status === 1) {
              return (
                <button
                  style={{ fontSize: "12px" }}
                  className="btn btn-success btn-xs"
                  onClick={() => this.settlePayment(row.id)}
                >
                  Settle Payment
                </button>
              );
            } else {
              return (
                <button
                  style={{ fontSize: "12px" }}
                  className="btn btn-success btn-xs"
                >
                  Settled
                </button>
              );
            }
          },
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
                  <h4 className="card-title mb-4">Commision Earned</h4>

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
          <div className="page-content">
            <Modal
              isOpen={this.state.modal_center}
              toggle={this.tog_center}
              centered={true}
            >
              <ModalHeader
                toggle={() => this.setState({ modal_center: false })}
              >
                Bill ID: {this.state.rowData.id}
              </ModalHeader>
              <ModalBody>
                <div className="table-responsive">
                  <Table bordered className="mb-0">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Buyer Name</strong>
                        </td>
                        <td>{this.state.rowData.buyer}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Share Name</strong>
                        </td>
                        <td>{this.state.rowData.sharesOf}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Quantity</strong>
                        </td>
                        <td>{this.state.rowData.qty}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Settlement Amount</strong>
                        </td>
                        <td>Rs. {this.state.rowData.setAmount}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Execution Date</strong>
                        </td>
                        <td>
                          {this.state.rowData.date !== undefined
                            ? this.state.rowData.date.slice(0, 10)
                            : ""}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </ModalBody>
            </Modal>
            <Col lg={20}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Commision Earned</h4>
                  <div>
                    <h6>Filter</h6>
                    <Row className="mb-4">
                      <Col md={2}>
                        <select
                          onChange={this.handleSelect}
                          className="form-control"
                        >
                          <option value="id">Select</option>
                          <option value="date">Execution Date</option>
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
          </div>
        </React.Fragment>
      );
    }
  }
}

export default ReqPayment;
