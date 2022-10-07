import React, { Component } from "react";
import filterFactory from "react-bootstrap-table2-filter";
import API from "../../config/config";
import { message, notification, Modal, Button } from "antd";
import "./billhistory.css";

import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Card,
  CardBody,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

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

class Billhistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      tableData: [],
      isLoading: false,
      visible: false,
      confirmLoading: false,
      rowId: null,
      delStat: "",
      payStat: "",
      email: "",
      delRem: "",
      payRem: "",
      transStat: "Pending",
      loader: false,
    };
  }
  componentDidMount() {
    this.fetchBillHistory();
  }

  test = (tr) => {
    console.log(this.state.delstat);
  };

  emailBill = (email, name, s3url) => {
    console.log(email, name, s3url);
    this.setState({
      loader: true,
    });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email === null ? this.state.email : email,
        name: name,
        s3Url: s3url,
      }),
    };
    fetch(API.api_route + "/message/emailBill", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        message.success(json.msg);
        this.setState({
          loader: false,
        });
      })
      .catch((e) => {
        console.log(e);
        notification.error({ message: "Fail to send Emails" });
      });
  };

  handleField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "delStat" || e.target.name === "payStat") {
      let tid = e.target.id.substring(7);
      console.log("here", this.state.delStat);
      console.log("here", this.state.payStat);
      if (
        (this.state.delStat === "Settled" && e.target.value === "Settled") ||
        (this.state.payStat === "Settled" && e.target.value === "Settled")
      ) {
        document.getElementById(`${"transStat" + tid}`).value = "Settled";
        this.setState({
          delStat: "Pending",
          payStat: "Pending",
        });
      }
    } else {
      console.log(e.target.id);
    }
  };

  handleModal = (id) => {
    this.setState({
      visible: true,
      rowId: id,
    });
  };

  handleOk = () => {
    this.handleDelete(this.state.rowId);
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      rowId: null,
    });
  };

  fetchBillHistory = () => {
    console.log("fetchBillHistory is called");
    fetch(API.api_route + "/bill/fetchBillHistory")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ tableData: json, isLoading: false });
        console.log(json);
      });
  };

  handleDelete = (id) => {
    if (id !== undefined) {
      console.log("transaction_id", id);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction_id: id,
        }),
      };
      fetch(API.api_route + "/bill/deletebillhistory", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            message.success("Bill History Deleted successfully !");
            this.fetchBillHistory();
          } else {
            notification.error({ message: data.msg });
          }
        })
        .catch((e) => {
          console.log(e);
          notification.error({ message: "ERROR" });
        });
    }
  };

  render() {
    const data = {
      columns: [
        {
          dataField: "sharesOf",
          text: "Shares Company",
        },
        {
          dataField: "buyer",
          text: "Buyer",
        },
        {
          dataField: "seller",
          text: "Seller",
        },
        {
          dataField: "qty",
          text: "Quantity",
        },
        {
          dataField: "settAmount",
          text: "Settlement Amount",
        },
        {
          dataField: "executionDate",
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
          dataField: "s3Url",
          text: "View",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-success btn-xs"
                onClick={() => window.open(`${row.s3Url}`)}
              >
                View
              </button>
            );
          },
        },
        {
          dataField: "id",
          text: "Delivery Status",
          editable: false,

          formatter: (cellContent, row) => {
            return (
              <select
                style={{ width: "90px" }}
                id={"delStat" + `${row.transaction_id}`}
                className="form-control"
                name="delStat"
                onChange={this.handleField}
                onBlur={this.transSttat}
              >
                <option>Select</option>
                <option>Pending</option>
                <option>Settled</option>
              </select>
            );
          },
        },
        {
          dataField: "id",
          text: "Delivery Status",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <Input
                style={{ width: "100px" }}
                type="text"
                placeholder="Delivery Remarks"
                defaultValue={
                  row.deliveryRemarks === null ? "" : `${row.deliveryRemarks}`
                }
                name="delRem"
                id={"delRem" + `${row.transaction_id}`}
              />
            );
          },
        },
        {
          dataField: "id",
          text: "Payment Status",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <select
                style={{ width: "90px" }}
                id={"payStat" + `${row.transaction_id}`}
                className="form-control"
                onChange={this.handleField}
                onBlur={this.transSttat}
                name="payStat"
              >
                <option>Select</option>
                <option>Pending</option>
                <option>Settled</option>
              </select>
            );
          },
        },
        {
          dataField: "id",
          text: "Payment Remarks",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <Input
                name="payRem"
                type="text"
                style={{ width: "100px" }}
                placeholder="Payment Remarks"
                defaultValue={
                  row.paymentRemarks === null ? "" : `${row.paymentRemarks}`
                }
                id={"payRem" + `${row.transaction_id}`}
              />
            );
          },
        },
        {
          dataField: "buyerEmail",
          text: "Email",

          editable: false,
          formatter: (cellContent, row) => {
            return (
              <Input
                type="text"
                style={{ width: "150px" }}
                placeholder="Email"
                defaultValue={
                  row.buyerEmail === null ? "" : `${row.buyerEmail}`
                }
                name="email"
                id={"email" + `${row.transaction_id}`}
                onChange={this.handleField}
              />
            );
          },
        },
        {
          dataField: "id",
          text: "Transaction Status",
          formatter: (cellContent, row) => {
            return (
              <Input
                style={{ width: "100px" }}
                type="text"
                value={
                  this.state.payStat === "Settled" &&
                    this.state.delStat === "Settled"
                    ? "Settled"
                    : "Pending"
                }
                ref="text"
                name="transStat"
                id={"transStat" + `${row.transaction_id}`}
              />
            );
          },
        },
        {
          dataField: "s3Url",
          text: "View",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-success btn-xs"
                // onClick={() => window.open(`${row.s3Url}`)}
                onClick={() => this.test(row.transaction_id)}
              >
                View
              </button>
            );
          },
        },
        {
          dataField: "id",
          text: "View",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-success btn-xs"
                onClick={() =>
                  this.emailBill(row.buyerEmail, row.buyer, row.s3Url)
                }
              >
                Send Email
              </button>
            );
          },
        },

        {
          dataField: "id",
          text: "Remove",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-danger btn-xs"
                // onClick={() => this.handleDelete(row.transaction_id)}
                onClick={() => {
                  this.handleModal(row.transaction_id);
                }}
              >
                Delete
              </button>
            );
          },
        },
      ],
      rows: this.state.tableData,
    };

    const options = {
      // pageStartIndex: 0,
      hideSizePerPage: true,
      showTotal: true,
      hidePageListOnlyOnePage: false,
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
    if (this.state.isLoading) {
      return (
        <React.Fragment>
          <Col lg={15}>
            <Card>
              <CardBody>
                <Dropdown
                  isOpen={this.state.menu}
                  toggle={() => this.setState({ menu: !this.state.menu })}
                  className="float-right"
                >
                  <DropdownToggle tag="i" className="arrow-none card-drop">
                    <i className="mdi mdi-dots-vertical"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.props.prophandleForm}>
                      Add Customer
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <h4 className="card-title mb-4">Customers Master</h4>
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
        <React.Fragment>
          <Modal
            title="Confirm Delete"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Are you Sure!</p>
          </Modal>

          <Col lg={50}>
            <Card>
              <CardBody>
                <Dropdown
                  isOpen={this.state.menu}
                  toggle={() => this.setState({ menu: !this.state.menu })}
                  className="float-right"
                >
                  <DropdownToggle tag="i" className="arrow-none card-drop">
                    <i className="mdi mdi-dots-vertical"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.props.prophandleForm}>
                      Add Customer
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <h4 className="card-title mb-4">Bill Transaction History</h4>
                {this.state.loader ? (
                  <div style={{ marginTop: "60px", textAlign: "center" }}>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </div>
                ) : (
                  <div></div>
                )}
                <BootstrapTable
                  keyField="id"
                  data={data.rows}
                  columns={data.columns}
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

export default Billhistory;
