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
import { scryRenderedDOMComponentsWithTag } from "react-dom/test-utils";
import { element } from "prop-types";

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

class PendingTransaction extends Component {
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
      sellerEmail: "",
      delRem: "",
      payRem: "",
      transStat: "Pending",
      loader: false,
      isLoading: true,
    };
  }
  componentDidMount() {
    this.fetchPendingHistory();
  }

  test = (tr) => {
    console.log(this.state.delstat);
  };

  handleDelRem = (e) => {
    console.log(e.target.id);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDelivRem = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        delRem:
          this.state.delRem === "" ? data.deliveryRemarks : this.state.delRem,
        transId: data.transaction_id,
      }),
    };
    fetch(API.api_route + "/bill/updateDeliveryRemarks", requestOptions)
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
        notification.error({ message: "Fail to update Delivery Remarks" });
      });
  };
  sendMsg = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transId: data,
      }),
    };
    fetch(API.api_route + "/message/twiliomsg", requestOptions)
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
        notification.error({ message: "Fail to send message" });
      });
  };
  handleRemarks = (data) => {
    let a = document.getElementById(`delRem${data.transaction_id}`).value;
    let b = document.getElementById(`payRem${data.transaction_id}`).value;

    // this.state.delRem === "" ? data.deliveryRemarks : this.state.delRem,
    // this.state.payRem === "" ? data.paymentRemarks : this.state.payRem,

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        delRem: a,
        payRem: b,
        transId: data.transaction_id,
      }),
    };
    fetch(API.api_route + "/bill/updateRemarks", requestOptions)
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
        notification.error({ message: "Fail to update Remarks" });
      });
  };

  handlePayRem = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payRem:
          this.state.payRem === "" ? data.paymentRemarks : this.state.payRem,
        transId: data.transaction_id,
      }),
    };
    fetch(API.api_route + "/bill/updatePaymentRemarks", requestOptions)
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
        notification.error({ message: "Fail to Update payment Remarks" });
      });
  };

  emailBillboth = (buyerEmail, sellerEmail, buyer, seller, s3url) => {
    this.emailBill(buyerEmail, buyer, s3url);
    this.emailBilltoseller(sellerEmail, seller, s3url);
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
  emailBilltoseller = (email, name, s3url) => {
    console.log(email, name, s3url);
    this.setState({
      loader: true,
    });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email === null ? this.state.sellerEmail : email,
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

  handleSelectField = (e, row) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    const tracId = e.target.id.substring(7);
    if (e.target.name === "delStat") {
      this.saveData(
        "updateDeliveryStatus",
        "deliveryStatus",
        e.target.value,
        tracId
      )
        .then((message) => {
          console.log("chk", message);
          setTimeout(() => {
            this.chkTransactionStatus(tracId, row);
          }, 3000);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (e.target.name === "payStat") {
      console.log(e.target.name);
      this.saveData(
        "updatePaymentStatus",
        "paymentStatus",
        e.target.value,
        tracId
      )
        .then((res) => {
          console.log("chk", res);
          setTimeout(() => {
            this.chkTransactionStatus(tracId, row);
          }, 3000);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  chkTransactionStatus = (tracId, row) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tracId: tracId,
      }),
    };
    fetch(API.api_route + "/bill/chkStatus", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        // this.setState({ tableData: json, isLoading: false });
        console.log(json[0].deliveryStatus, json[0].paymentStatus);
        if (
          json[0].deliveryStatus === "Settled" &&
          json[0].paymentStatus === "Settled"
        ) {
          this.fetchPendingHistory();
          this.emailParties(row.buyerEmail, row.sellerEmail);
          this.processCommision(tracId);
        }
      });
  };

  emailParties = (buyerEmail, sellerEmail) => {
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email1: buyerEmail,
        email2: sellerEmail,
      }),
    };

    fetch(API.api_route + "/message/emailSettlement", requestOptions).then(
      (res) => {
        console.log(res);
        if (res.status !== 200) {
          res.json().then((data) => {
            notification.error({ message: data.msg });
          });
        } else {
          res.json().then((data) => {
            console.log(data);
            if (data.success) {
              message.success(data.msg);
            } else {
              notification.error({ message: data.msg });
            }
          });
        }
      }
    );
  };

  processCommision = (tracId) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tracId: tracId,
      }),
    };
    fetch(API.api_route + "/bill/commisionAdd", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        message.success("Commision Added");
      });
  };

  saveData = async (api, key, value, transId) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        [key]: value,
        transId: transId,
      }),
    };

    fetch(API.api_route + `/bill/${api}`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        message.success(json.msg);
        return new Promise((resolve, reject) => {
          if (json.success) {
            resolve("true");
          } else {
            reject("false");
          }
        });
      })
      .catch((e) => {
        console.log(e);
        notification.error({ message: "Fail to update" });
      });
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

  fetchPendingHistory = () => {
    console.log("fetchBillHistory is called");
    this.setState({
      isLoading: true,
    });
    fetch(API.api_route + "/bill/fetchPendingTrasaction")
      .then((response) => response.json())
      .then((json) => {
        // json.map(eachElement =>{
        //   console.log("eachElement.executionDate old", eachElement.executionDate);
        //   eachElement.executionDate = new Date(eachElement.executionDate)
        //   console.log("eachElement.executionDate new", eachElement.executionDate);
        // })
        for (let i = 0; i < json.length; i++) {
          
            json[i].executionDate = new Date(json[i].executionDate)
          
        }
          
        this.setState({ tableData: json, isLoading: false });
        console.log(this.state.tableData);
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
            this.fetchPendingHistory();
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

  sendMsg = (phnNo, link) => {
    console.log(phnNo);
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phnNo: phnNo,
        link: link,
      }),
    };

    fetch(API.api_route + "/message/twiliomsg", requestOptions).then((res) => {
      console.log(res);
      if (res.status !== 200) {
        res.json().then((data) => {
          notification.error({ message: data.msg });
        });
      } else {
        res.json().then((data) => {
          console.log(data);
          if (data.success) {
            message.success(data.msg);
          } else {
            notification.error({ message: data.msg });
          }
        });
      }
    });
  };

  render() {
    const data = {
      columns: [
        {
          dataField: "transaction_id",
          text: "Bill Id",
        },

        {
          dataField: "dealerId",
          text: "Dealer Id",
        },
        {
          dataField: "transaction_id",
          text: "Bill Id",
        },

        {
          dataField: "generator",
          text: "Bill Generator",
        },
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
            if (row.deliveryStatus === "Pending") {
              return (
                <select
                  style={{ width: "90px" }}
                  id={"delStat" + `${row.transaction_id}`}
                  className="form-control"
                  name="delStat"
                  onChange={(e) => this.handleSelectField(e, row)}
                  onBlur={this.transSttat}
                >
                  <option>{row.deliveryStatus}</option>
                  <option>Settled</option>
                  <option>Hold</option>
                </select>
              );
            } else if (row.deliveryStatus === "Hold") {
              return (
                <select
                  style={{ width: "90px" }}
                  id={"delStat" + `${row.transaction_id}`}
                  className="form-control"
                  name="delStat"
                  onChange={(e) => this.handleSelectField(e, row)}
                  onBlur={this.transSttat}
                >
                  <option>{row.deliveryStatus}</option>
                  <option>Settled</option>
                  <option>Pending</option>
                </select>
              );
            } else {
              return (
                <select
                  style={{ width: "90px" }}
                  id={"delStat" + `${row.transaction_id}`}
                  className="form-control"
                  name="delStat"
                  onChange={(e) => this.handleSelectField(e, row)}
                  onBlur={this.transSttat}
                >
                  <option>{row.deliveryStatus}</option>
                  <option>Pending</option>
                  <option>Hold</option>
                </select>
              );
            }
          },
        },
        {
          dataField: "deliveryRemarks",
          text: "Delivery Remarks",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <Input
                style={{ width: "100px" }}
                type="text"
                placeholder="Delivery Remarks"
                defaultValue={`${row.deliveryRemarks}`}
                onChange={this.handleDelRem}
                // onBlur={() => this.handleDelivRem(row)}
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
            if (row.paymentStatus === "Pending") {
              return (
                <select
                  style={{ width: "90px" }}
                  id={"payStat" + `${row.transaction_id}`}
                  className="form-control"
                  onChange={(e) => this.handleSelectField(e, row)}
                  onBlur={this.transSttat}
                  name="payStat"
                >
                  <option>{row.paymentStatus}</option>
                  <option>Settled</option>
                  <option>Hold</option>
                </select>
              );
            } else if (row.paymentStatus === "Hold") {
              return (
                <select
                  style={{ width: "90px" }}
                  id={"payStat" + `${row.transaction_id}`}
                  className="form-control"
                  onChange={(e) => this.handleSelectField(e, row)}
                  onBlur={this.transSttat}
                  name="payStat"
                >
                  <option>{row.paymentStatus}</option>
                  <option>Settled</option>
                  <option>Pending</option>
                </select>
              );
            } else {
              return (
                <select
                  style={{ width: "90px" }}
                  id={"payStat" + `${row.transaction_id}`}
                  className="form-control"
                  onChange={(e) => this.handleSelectField(e, row)}
                  onBlur={this.transSttat}
                  name="payStat"
                >
                  <option>{row.paymentStatus}</option>
                  <option>Pending</option>
                  <option>Hold</option>
                </select>
              );
            }
          },
        },
        {
          dataField: "paymentRemarks",
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
                onChange={this.handleDelRem}
                // onBlur={() => this.handlePayRem(row)}
                id={"payRem" + `${row.transaction_id}`}
              />
            );
          },
        },
        {
          dataField: "id",
          text: "Save",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-success btn-xs"
                onClick={() => this.handleRemarks(row)}
              >
                Save Remarks
              </button>
            );
          },
        },
        // {
        //   dataField: "buyerEmail",
        //   text: "Email",

        //   editable: false,
        //   formatter: (cellContent, row) => {
        //     return (
        //       <Input
        //         type="text"
        //         style={{ width: "150px" }}
        //         placeholder="Email"
        //         defaultValue={
        //           row.buyerEmail === null ? "" : `${row.buyerEmail}`
        //         }
        //         name="email"
        //         id={"email" + `${row.transaction_id}`}
        //         onChange={this.handleField}
        //       />
        //     );
        //   },
        // },
        {
          dataField: "id",
          text: "Email",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-success btn-xs"
                onClick={() =>
                  this.emailBillboth(
                    row.buyerEmail,
                    row.sellerEmail,
                    row.buyer,
                    row.seller,
                    row.s3Url
                  )
                }
              >
                Send Email
              </button>
            );
          },
        },
        {
          dataField: "id",
          text: "Send recorder link",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-success btn-xs"
                onClick={() =>
                  this.sendMsg(
                    row.buyerMob,
                    `https://tashcain.github.io/vidRec/?id=${row.transaction_id}`
                  )
                }
              >
                Send recorder link to {row.buyer}
              </button>
            );
          },
        },
        {
          dataField: "id",
          text: "Send recorder link",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-success btn-xs"
                onClick={() =>
                  this.sendMsg(
                    row.sellerMob,
                    `https://tashcain.github.io/vidRec/?id=${row.transaction_id}`
                  )
                }
              >
                Send recorder link to {row.seller}
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
                  row.response_vidUrl === null || row.response_vidUrl === ""
                    ? notification.error({ message: "nothing yet" })
                    : window.open(row.response_vidUrl)
                }
              >
                View Confirmation Video
              </button>
            );
          },
        },
        // {
        //   dataField: "sellerEmail",
        //   text: "Email",

        //   editable: false,
        //   formatter: (cellContent, row) => {
        //     return (
        //       <Input
        //         type="text"
        //         style={{ width: "150px" }}
        //         placeholder="Email"
        //         defaultValue={
        //           row.sellerEmail === null ? "" : `${row.sellerEmail}`
        //         }
        //         name="sellerEmail"
        //         id={"email" + `${row.transaction_id}`}
        //         onChange={this.handleField}
        //       />
        //     );
        //   },
        // },
        // {
        //   dataField: "id",
        //   text: "Seller",
        //   editable: false,
        //   formatter: (cellContent, row) => {
        //     return (
        //       <button
        //         className="btn btn-success btn-xs"
        //         onClick={() =>
        //           this.emailBilltoseller(row.sellerEmail, row.seller, row.s3Url)
        //         }
        //       >
        //         Send to {row.seller}
        //       </button>
        //     );
        //   },
        // },
        // {
        //   dataField: "id",
        //   text: "Send recorder link",
        //   editable: false,
        //   formatter: (cellContent, row) => {
        //     return (
        //       <button
        //         className="btn btn-success btn-xs"
        //         onClick={() =>
        //           // alert(`http://localhost:3001/main/${row.transaction_id}`)
        //           this.sendMsg(row.transaction_id)
        //         }
        //       >
        //         Send recorder link
        //       </button>
        //     );
        //   },
        // },
        // {
        //   dataField: "id",
        //   text: "View",
        //   editable: false,
        //   formatter: (cellContent, row) => {
        //     return (
        //       <button
        //         className="btn btn-success btn-xs"
        //         onClick={() =>
        //           row.response_vidUrl === null || row.response_vidUrl === ""
        //             ? notification.error({ message: "nothing yet" })
        //             : window.open(row.response_vidUrl)
        //         }
        //       >
        //         View Confirmation Video
        //       </button>
        //     );
        //   },
        // },
        {
          dataField: "id",
          text: "Remove",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-danger btn-xs"
                style={{
                  display:
                    localStorage.getItem("user") === "manishMittal"
                      ? "inline-block"
                      : "none",
                }}
                // onClick={() => this.handleDelete(row.transaction_id)}
                onClick={() => {
                  this.handleModal(row.transaction_id);
                }}
              >
                Delete-{row.transaction_id}
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
        <div style={{ marginTop: "87px" }}>
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

                      <DropdownItem
                        onClick={() =>
                          window.open(
                            "https://accounts.zoho.in/signin?servicename=ZohoSign&signupurl=https://www.zoho.in/sign/signup.html"
                          )
                        }
                      >
                        Electronic Sign
                      </DropdownItem>
                      <DropdownItem>
                        <Button
                          type="primary"
                          onClick={() =>
                            window.open(
                              "https://accounts.zoho.in/signin?servicename=ZohoSign&signupurl=https://www.zoho.in/sign/signup.html"
                            )
                          }
                        ></Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <h4 className="card-title mb-4">Transactions </h4>
                  <Button
                    type="primary"
                    onClick={() =>
                      window.open(
                        "https://accounts.zoho.in/signin?servicename=ZohoSign&signupurl=https://www.zoho.in/sign/signup.html"
                      )
                    }
                  ></Button>

                  <div class="d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </React.Fragment>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: "87px" }}>
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

                      <DropdownItem
                        onClick={() =>
                          window.open(
                            "https://accounts.zoho.in/signin?servicename=ZohoSign&signupurl=https://www.zoho.in/sign/signup.html"
                          )
                        }
                      >
                        Electronic Sign
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <h4 className="card-title mb-4">Transactions </h4>

                  {this.state.loader ? (
                    <div style={{ marginTop: "60px", textAlign: "center" }}>
                      <span
                        class="spinner-border spinner-border-sm"
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
        </div>
      );
    }
  }
}

export default PendingTransaction;
