import React, { Component } from "react";
import ShareCompanyTableComp from "../Dashboard/ShareCompanyTableComp";
import ShareFormElements from "../Forms/sharesForm";
import API from "../../config/config";
import { scroller } from "react-scroll";

class ShareCompTable extends Component {
  constructor() {
    super();
    this.state = {
      form: "none",
      editFormData: [],
      tableData: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.fetchshareComp();
  }

  fetchshareComp = () => {
    fetch(API.api_route + "/shares/fetchSharesCompany")
      .then((response) => response.json())
      .then((json) => this.setState({ tableData: json, isLoading: false }));
  };

  scrollback = () => {
    scroller.scrollTo("sharetable", {
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
    scroller.scrollTo("shareform", {
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

  render() {
    const rowEvents = {
      onClick: (e, row) => {
        scroller.scrollTo("shareform", {
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
        <div className="sharetable" style={{ marginTop: " 87px" }}>
          <ShareCompanyTableComp
            tableData={this.state.tableData}
            rowEvents={rowEvents}
            prophandleForm={this.handleForm}
            isLoading={this.state.isLoading}
          />
        </div>
        <div className="shareform">
          <div style={{ display: this.state.form }}>
            <ShareFormElements
              scrollback={this.scrollback}
              fetchshareComp={this.fetchshareComp}
              editFormData={this.state.editFormData}
              ThandleForm={this.ThandleForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ShareCompTable;
