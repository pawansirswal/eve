import React, { Component } from "react";
// import BillingTransaction from "../Dashboard/billingTransaction";
import TransactionFormElements from "../Forms/transactionFormElement";
import { scroller } from "react-scroll";
// import BasicAutoSuggest from "../../components/test/test2";
import { saveAs } from "file-saver";
import Api from "../../config/config";
// import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { message, notification } from "antd";

// import axios from "axios";

class TransactionTable extends Component {
  constructor() {
    super();
    this.state = {
      dtypes: [],
      isSetComm: false,
      commision: 0,
      tableData: [],
      editFormData: [],
      custDetails: [],
      firmDetails: [],
      node: true,
      otherParty: "",
      form: "none",
      name: "",
      companyName: "",
      isin: "",
      executionDate: "",
      qty: "",
      rps: "",
      settAmount: "",
      userPrice: "",
      dealerPrice: "",
      mod: "demat",
      // sellerName: "",
      panNo: "",
      // sellerPanNo: "",
      email: "",
      // sellerEmail: "",
      BankAcName: "",
      // sellerBankAcName: "",
      buyerBankAcNo: "",
      sellerBankAcNo: "",
      buyerIfscCode: "",
      sellerIfscCode: "",
      buyerBranch: "",
      sellerBranch: "",
      buyerDpName: "",
      sellerDpName: "",
      buyerDpid: "",
      sellerDpid: "",
      tranType: "",
      isSetAmt: false,
      btnClicked: false,
      loader: false,
      dealerId: "",
      dtype: "CDSL",
    };
  }

  componentDidMount() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    this.setState({
      executionDate: yyyy + "-" + mm + "-" + dd,
    });
  }

  fetchDtypes = (user) => {
    fetch(Api.api_route + "/analytics/fetchDtypes/" + user)
      .then((response) => response.json())
      .then((json) => this.setState({ dtypes: json }))
      .catch((e) => {
        console.log(e);
        notification.error({ message: "error" });
      });
  };

  toggleNode = () => {
    this.setState({
      node: !this.state.node,
    });
  };

  fetchIsin = () => {
    if (this.state.companyName !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: this.state.companyName,
        }),
      };
      fetch(Api.api_route + "/bill/fetchIsin", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("isin", data);
          this.setState({
            isin: data[0].isin,
          });
        })
        .catch((e) => {
          notification.error({ message: "ISIN error" });

          console.log(e);
        });
    } else {
      notification.error({ message: "Please provide Company Name" });
    }
  };

  fetchCustDetailsWithName = (dtype, value) => {
    console.log(
      "fetchCustDetailsWithName is called with name",
      this.state.name
    );
    if (value !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value,
          dtype: dtype,
        }),
      };
      fetch(Api.api_route + "/bill/custDetailsWithName", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("custDetail", data);
          this.setState({
            custDetails: data,
          });
        })
        .catch((e) => {
          notification.error({ message: "Customer Details error" });
          console.log(e);
        });
    } else {
      notification.error({ message: "Please provide Name " });
    }
  };

  fetchCustDetails = () => {
    console.log("fetchCustDetails is called");
    // if (this.state.panNo != "") {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        panNo: this.state.panNo,
      }),
    };
    fetch(Api.api_route + "/bill/custDetails", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, data.length);
        this.setState({
          custDetails: data,
        });
      })
      .catch((e) => {
        notification.error({ message: "CustomerDetails error" });

        console.log(e);
      });
    // }
  };
  fetchSettlementAmount = () => {
    if (this.state.qty !== "" && this.state.rps !== "") {
      this.setState({
        isSetAmt: true,
        settAmount: Math.round(this.state.qty * this.state.rps),
      });
    }
    this.fetchComm();
  };
  fetchComm = () => {
    if (
      this.state.qty !== "" &&
      this.state.userPrice !== "" &&
      this.state.dealerPrice !== ""
    ) {
      this.setState({
        isSetComm: true,
        commision:
          (this.state.userPrice - this.state.dealerPrice) * this.state.qty,
      });
    }
  };

  fetchFirmDetails = () => {
    console.log("firmDetailsWorks");
    if (this.state.otherParty !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firmName: this.state.otherParty.split("_")[0],
          dematAcDetails: this.state.otherParty.split("_")[1],
        }),
      };
      fetch(Api.api_route + "/bill/firmDetails", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("firmDetails", data);
          this.setState({
            firmDetails: data,
          });
        })
        .catch((e) => {
          notification.error({ message: "firmDetails error" });

          console.log(e);
        });
    } else {
      notification.error({ message: "Please provide OtherParty Name" });
    }
  };

  generateBill = () => {
    this.setState({
      loader: true,
    });
    console.log("panNo :", this.state.panNo);
    this.fetchFirmDetails();
    this.fetchIsin();
    setTimeout(() => {
      this.createAndDownloadPdf();
    }, 3000);
  };

  createAndDownloadPdf = () => {
    if (this.state.tranType == "") {
      notification.error({ message: "Please select transaction type" });
      this.setState({
        btnVisible: false,
        loader: false,
      });
    } else {
      if (
        this.state.custDetails.length !== 0 &&
        this.state.firmDetails.length !== 0
      ) {
        var billDetails = {
          executionDate: this.state.executionDate,
          qty: this.state.qty,
          rps: this.state.rps,
          settAmount: this.state.settAmount,
          mod: this.state.mod,
          sharesOf: this.state.companyName,
          // this.state.firmDetails[0].firmName
          buyer:
            this.state.tranType === "buy"
              ? this.state.otherParty
              : this.state.custDetails[0].buyerName,
          seller:
            this.state.tranType === "buy"
              ? this.state.custDetails[0].buyerName
              : this.state.otherParty,
          isin: this.state.isin,
          buyerPan:
            this.state.tranType === "buy"
              ? this.state.firmDetails[0].panNo
              : this.state.custDetails[0].panNo,
          sellerPan:
            this.state.tranType === "buy"
              ? this.state.custDetails[0].panNo
              : this.state.firmDetails[0].panNo,
          buyerEmail:
            this.state.tranType === "buy"
              ? this.state.firmDetails[0].email
              : this.state.custDetails[0].email,
          sellerEmail:
            this.state.tranType === "buy"
              ? this.state.custDetails[0].email
              : this.state.firmDetails[0].email,
          buyerBankAcName:
            this.state.tranType === "buy"
              ? this.state.firmDetails[0].bankAcName
              : this.state.custDetails[0].bankName,
          sellerBankAcName:
            this.state.tranType === "buy"
              ? this.state.custDetails[0].bankName
              : this.state.firmDetails[0].bankAcName,
          buyerBankAcNo:
            this.state.tranType === "buy"
              ? this.state.firmDetails[0].bankAcNo
              : this.state.custDetails[0].bankAc,
          sellerBankAcNo:
            this.state.tranType === "buy"
              ? this.state.custDetails[0].bankAc
              : this.state.firmDetails[0].bankAcNo,
          buyerIfscCode:
            this.state.tranType === "buy"
              ? this.state.firmDetails[0].ifscCode
              : this.state.custDetails[0].ifscCode,
          sellerIfscCode:
            this.state.tranType === "buy"
              ? this.state.custDetails[0].ifscCode
              : this.state.firmDetails[0].ifscCode,
          buyerBranch:
            this.state.tranType === "buy"
              ? this.state.firmDetails[0].branch
              : this.state.custDetails[0].branch,
          sellerBranch:
            this.state.tranType === "buy"
              ? this.state.custDetails[0].branch
              : this.state.firmDetails[0].branch,
          buyerDpName:
            this.state.tranType === "buy"
              ? this.state.firmDetails[0].dpName
              : this.state.dtype == "CDSL"
              ? this.state.custDetails[0].dpName
              : this.state.custDetails[0].dpName_nsdl,
          sellerDpName:
            this.state.tranType === "buy"
              ? this.state.dtype == "CDSL"
                ? this.state.custDetails[0].dpName
                : this.state.custDetails[0].dpName_nsdl
              : this.state.firmDetails[0].dpName,
          buyerDpid:
            this.state.tranType === "buy"
              ? this.state.firmDetails[0].dpid
              : this.state.dtype == "CDSL"
              ? this.state.custDetails[0].dpid
              : this.state.custDetails[0].dpid_nsdl,
          sellerDpid:
            this.state.tranType === "buy"
              ? this.state.dtype == "CDSL"
                ? this.state.custDetails[0].dpid
                : this.state.custDetails[0].dpid_nsdl
              : this.state.firmDetails[0].dpid,
          buyerMob:
            this.state.tranType === "buy"
              ? this.state.firmDetails[0].mob1
              : this.state.custDetails[0].contactNo,
          sellerMob:
            this.state.tranType === "buy"
              ? this.state.custDetails[0].contactNo
              : this.state.firmDetails[0].mob1,
          firmName: this.state.firmDetails[0].firmName,
          otherParty: this.state.custDetails[0].buyerName,
          firmAddress: this.state.firmDetails[0].address,
          transactionType: this.state.tranType,
        };

        console.log("bill", billDetails);
        var form_data = new FormData();

        for (var key in billDetails) {
          form_data.append(key, billDetails[key]);
        }

        if (this.state.node) {
          const requestOptions = {
            method: "POST",
            // redirect: "manual",
            // headers: { "Content-Type": "multipart_formData" },
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( billDetails ),
          };

          // fetch("https://node.delistedstocks.in/bill/createnodebill", requestOptions)
          fetch(Api.api_route + "/bill/createnodebill", requestOptions)
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                var url = response.json().then((data) => {
                  window.open(`${data.msg}`);
                  billDetails.s3UrlPend = data.msg;
                  billDetails.generator = localStorage.getItem("user");
                  console.log("bill", billDetails);
                  this.setState({
                    loader: false,
                    // btnVisible: true,
                  });
                  const requestOptionsb = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ billDetails }),
                  };
                  // fetch("https://node.delistedstocks.in/bill/addBill", requestOptionsb)
                  fetch(Api.api_route + "/bill/addBill", requestOptionsb)
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.success) {
                        message.success("Bill Added successfully !");
                      } else {
                        notification.error({ message: data.msg });
                      }
                    });
                });
              } else {
                notification.error({ message: "Request can't be completed" });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          const requestOptions = {
            method: "POST",
            // redirect: "manual",
            // headers: { "Content-Type": "multipart_formData" },
            // headers: { "Content-Type": "application/json" },
            body: form_data,
          };

          fetch(Api.api_route + "/api/create-bill/", requestOptions)
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                var url = response.text().then((data) => {
                  window.open(`${data}`);
                  billDetails.s3UrlPend = data;
                  billDetails.generator = localStorage.getItem("user");
                  billDetails.dealerId = this.state.dealerId;
                  billDetails.userPrice = this.state.userPrice;
                  billDetails.dealerPrice = this.state.dealerPrice;

                  this.setState({
                    loader: false,
                    // btnVisible: true,
                  });
                  const requestOptionsb = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ billDetails }),
                  };
                  fetch(Api.api_route + "/bill/addBill", requestOptionsb)
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.success) {
                        message.success("Bill Added successfully !");
                      } else {
                        notification.error({ message: data.msg });
                      }
                    });
                });
              } else {
                this.setState({
                  loader: false,
                  // btnVisible: true,
                });
                notification.error({ message: "Request can't be completed" });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } else {
        notification.error({ message: "unable to Download bill" });
        this.setState({
          btnVisible: false,
        });
      }
    }
  };

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSelect = (e) => {
    console.log(e.id, e.value.split("_")[0]);
    if (e.id === "otherParty") {
      this.setState({
        [e.id]: e.value,
      });
    } else if (e.id === "name") {
      this.setState({
        [e.id]: e.value,
        dealerId: e.key,
      });
      this.fetchDtypes(e.value);
    } else if (e.id == "dtype") {
      this.setState({
        [e.id]: e.value,
      });
      this.fetchCustDetailsWithName(e.value, this.state.name);
    } else {
      console.log("here", e.id, e.value);
      this.setState({
        [e.id]: e.value,
      });
    }
  };

  handleForm = () => {
    this.setState({
      form: "block",
      editFormData: [],
    });
    scroller.scrollTo("customerform", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  render() {
    // const rowEvents = {
    //   onClick: (e, row) => {
    //     scroller.scrollTo("customerform", {
    //       duration: 800,
    //       delay: 0,
    //       smooth: "easeInOutQuart",
    //     });
    //     console.log(row);
    //     this.setState({
    //       form: "block",
    //       editFormData: row,
    //     });
    //   },
    // };
    return (
      <div>
        <div className="customerform">
          <div>
            <TransactionFormElements
              toggleNode={this.toggleNode}
              btnVisible={this.state.btnVisible}
              createAndDownloadPdf={this.createAndDownloadPdf}
              generateBill={this.generateBill}
              loader={this.state.loader}
              fetchCustDetails={this.fetchCustDetails}
              fetchCustDetailsWithName={this.fetchCustDetailsWithName}
              custDetails={this.state.custDetails}
              handleChange={this.handleChange}
              handleSelect={this.handleSelect}
              editFormData={this.state.editFormData}
              fetchSettlementAmount={this.fetchSettlementAmount}
              fetchComm={this.fetchComm}
              isSetAmt={this.state.isSetAmt}
              isSetComm={this.state.isSetComm}
              settAmount={this.state.settAmount}
              commision={this.state.commision}
              dtypes={this.state.dtypes}
            />
            {/* <BasicAutoSuggest /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionTable;
