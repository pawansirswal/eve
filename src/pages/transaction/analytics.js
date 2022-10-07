import React, { Component } from "react";
import ResultTable from "./tracomp/resultTable";
import Filters from "./tracomp/filters";
import { scroller } from "react-scroll";
import { message, notification } from "antd";
import API from "../../config/config";
import { saveAs } from "file-saver";
import AnaCustomerFormElements from "../Forms/anaCustomerForm";

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      sendEmail: "No",
      editFormData: [],
      companies: [],
      company: "",
      from: "",
      to: "",
      tableData: [],
      isLoading: true,
      btnClicked: false,
      showModal: false,
      price: "",
      caseType: "",
      pincode: "",
      city: "",
      quote: "",
      partyPrice: "",
      firmDetails: {},
      form: "none",
    };
  }

  fetchFirmDetails = async (firmName) => {
    console.log("fetchFirmforPostcard is called");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firmName: firmName,
      }),
    };
    await fetch(API.api_route + "/firm/fetchFirmForPostCard", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ firmDetails: json });
        console.log(json);
      });
  };

  handleFields = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSelect = (e) => {
    console.log(e.id);
    this.setState({
      [e.id]: e.value,
    });
  };

  fetchCustomers = () => {
    this.filterTable();
  };

  scrollback = () => {
    scroller.scrollTo("filtertable", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  filterTable = () => {
    console.log(
      this.state.company,
      this.state.from,
      this.state.to,
      this.state.caseType,
      this.state.pincode,
      this.state.city,
      this.state.quote,
      this.state.partyPrice,
      this.state.sendEmail
    );
    if (this.state.company !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: this.state.company,
          from: this.state.from === "" ? 0 : this.state.from,
          to: this.state.to === "" ? Number.MAX_SAFE_INTEGER : this.state.to,
          caseType: this.state.caseType,
          pincode: this.state.pincode,
          city: this.state.city,
          quote: this.state.quote,
          partyPrice: this.state.partyPrice,
          sendEmail: this.state.sendEmail,
        }),
      };
      fetch(API.api_route + "/analytics/fetchFilterCustomer", requestOptions)
        .then((response) => response.json())
        .then((json) => this.setState({ tableData: json, isLoading: false }));
      scroller.scrollTo("filtertable", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
      this.setState({
        btnClicked: true,
      });
    } else {
      notification.error({ message: "Please Provide Company Name" });
    }
    // console.log("addSharesCompany");
  };

  omit = (obj, arr) =>
    Object.keys(obj)
      .filter((k) => !arr.includes(k))
      .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

  sendPostcard = (firmName, previewUrl) => {
    let TDforpost = this.state.tableData.map((obj) =>
      this.omit(obj, [
        "UUID",
        "folioNo",
        "qty",
        "contact",
        "email",
        "cmnt1",
        "caseType",
        "quote",
        "partyPrice",
        "followedBy",
        "companyName",
      ])
    );
    const requestOptionsforP = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firmName: firmName,
      }),
    };
    fetch(API.api_route + "/firm/fetchFirmForPostCard", requestOptionsforP)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        TDforpost.map(
          (data) => (
            (data.firmName = firmName),
            (data.firmAddress = json[0].address),
            (data.firmMobile1 = json[0].mob1),
            (data.firmMobile2 = json[0].mob2),
            (data.firmEmail = json[0].email),
            (data.backTempUrl = previewUrl)
          )
        );
        console.log(TDforpost);
        console.log(JSON.stringify(TDforpost));
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(TDforpost),
        };
        fetch(API.api_route + "/api/postcards/", requestOptions)
          .then((response) =>
            response.blob().then(function (myBlob) {
              console.log(myBlob.text());
              console.log(myBlob.size);
              const pdfBlob = new Blob([myBlob], {
                type: "application/pdf",
              });
              saveAs(pdfBlob, `${new Date().valueOf()}postcards.pdf`);
            })
          )
          .catch((e) => {
            console.log(e);
            notification.error({ message: "Fail to Fetch Post cards" });
          });
      });
  };

  sendEmails = (price) => {
    console.log("sendEmails", price);
    this.state.tableData.map((item, i) => {
      this.sendEmail(item.email, item.name, item.companyName, price);
    });
    // console.log(Js)
    // message.success("Emails has been sent");
  };

  sendEmail = (email, name, companyName, price) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        name: name,
        companyName: companyName,
        price: price,
      }),
    };
    fetch(API.api_route + "/message/sendEmail", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        message.success(json.msg);
      })
      .catch((e) => {
        console.log(e);
        notification.error({ message: "Fail to send Emails" });
      });
    // console.log("addSharesCompany");
  };

  sendWhatsapp = (mobile, msg) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTFkMmNmMy0xMzMyLTRlZDEtYTEwNS0wNzc2NmM3MWMwOWIiLCJ1bmlxdWVfbmFtZSI6InNodWJoYW1iYXN3YWwyNkBnbWFpbC5jb20iLCJuYW1laWQiOiJzaHViaGFtYmFzd2FsMjZAZ21haWwuY29tIiwiZW1haWwiOiJzaHViaGFtYmFzd2FsMjZAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDUvMjgvMjAyMSAxNzoxNzoyMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlRSSUFMIiwiZXhwIjoxNjIyODUxMjAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.dhTadf8SoqomOLMDFzLnCq63sxkD8Q1__aWGtudhS_A",
      },
    };
    fetch(
      "https://app-server.wati.io/api/v1/sendSessionMessage/917065753035?messageText=baswal",
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        message.success(json.msg);
      })
      .catch((e) => {
        console.log(e);
        notification.error({ message: "Fail to send Emails" });
      });
    // console.log("addSharesCompany");
  };

  ThandleForm = () => {
    this.setState({
      editFormData: [],
      form: "none",
    });
  };

  render() {
    const rowEvents = {
      onClick: (e, row) => {
        scroller.scrollTo("customerform", {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
        });
        console.log(row);
        this.setState({
          form: "block",
          editFormData: row,
        });
      },
    };

    return (
      <div>
        <div>
          <Filters
            handleFields={this.handleFields}
            filterTable={this.filterTable}
            handleSelect={this.handleSelect}
          />
        </div>

        <div className="filtertable">
          <div style={{ background: "red" }}>
            <ResultTable
              btnClicked={this.state.btnClicked}
              isLoading={this.state.isLoading}
              sendEmails={this.sendEmails}
              sendPostcard={this.sendPostcard}
              sendWhatsapp={this.sendWhatsapp}
              tableData={this.state.tableData}
              rowEvents={rowEvents}
            />
          </div>
        </div>
        <div className="customerform">
          <div style={{ display: this.state.form }}>
            <AnaCustomerFormElements
              scrollback={this.scrollback}
              fetchCustomers={this.fetchCustomers}
              editFormData={this.state.editFormData}
              ThandleForm={this.ThandleForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Analytics;
