import React, { Component } from "react";
// import PartyDetailsComp from "../Dashboard/PartyDetailsComp";
import CustomerFormElements from "../Forms/customerForm";
import { scroller } from "react-scroll";
import API from "../../config/config";

class PartyDetailsTable extends Component {
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
    this.fetchCustomers();
  }

  fetchCustomers = () => {
    fetch(API.api_route + "/customer/fetchCustomer")
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
        {/* <div className="customertable" style={{ marginTop: " 87px" }}>
          <PartyDetailsComp
            isLoading={this.state.isLoading}
            tableData={this.state.tableData}
            rowEvents={rowEvents}
            prophandleForm={this.handleForm}
          />
        </div> */}
        <div className="customerform">
          <div style={{ display: "block" }}>
            <CustomerFormElements
              scrollback={this.scrollback}
              fetchCustomers={this.fetchCustomers}
              editFormData={this.state.editFormData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PartyDetailsTable;
