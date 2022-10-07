import React, { Component } from "react";
import BillingPartyDetailsComp from "../Dashboard/billingPartyDetailsComp";
import BillCustomerFormElements from "../Forms/billCustomerForm";
import { scroller } from "react-scroll";
import Api from "../../config/config";

class BillingCustomerTable extends Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
      editFormData: [],
      form: "none",
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchCustomerforBilling();
  }

  fetchCustomerforBilling = () => {
    fetch(Api.api_route + "/customer/fetchCustomerforBilling")
      .then((response) => response.json())
      .then((json) => this.setState({ tableData: json, isLoading: false }));
  };

  scrollback = () => {
    scroller.scrollTo("customertable", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  ThandleForm = () => {
    this.setState({
      form: "none",
      editFormData: [],
    });
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
        <div className="customertable" style={{ marginTop: " 87px" }}>
          <BillingPartyDetailsComp
            tableData={this.state.tableData}
            rowEvents={rowEvents}
            prophandleForm={this.handleForm}
            isLoading={this.state.isLoading}
          />
        </div>
        <div className="customerform">
          <div style={{ display: this.state.form }}>
            <BillCustomerFormElements
              scrollback={this.scrollback}
              fetchCustomerforBilling={this.fetchCustomerforBilling}
              editFormData={this.state.editFormData}
              ThandleForm={this.ThandleForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BillingCustomerTable;
