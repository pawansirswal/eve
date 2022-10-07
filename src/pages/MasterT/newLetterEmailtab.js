import React, { Component } from "react";
import NewsLetterTabEmailComp from "../Dashboard/newsLtabemail";
import NewsLetterEmailFormElements from "../Forms/newsLemail";
import API from "../../config/config";
import { scroller } from "react-scroll";

class NewLemailTab extends Component {
  constructor() {
    super();
    this.state = {
      form: "none",
      isLoading: true,
      tableData: [],
      editFormData: [],
    };
  }

  // handleForm = () => {
  //     this.setState({
  //         form : "block"
  //     })

  //     fetch('https://jsonplaceholder.typicode.com/todos/1')
  //     .then(response => response.json())
  //     .then(json => console.log(json))

  // scroller.scrollTo("firmform", {
  //     duration: 800,
  //     delay: 0,
  //     smooth: "easeInOutQuart",
  //   });

  // }

  componentDidMount() {
    this.fetchFirm();
  }

  fetchFirm = () => {
    console.log("fetchCustomerfornewsletter is called");
    fetch(API.api_route + "/customer/fetchCustomerfornewsletterEmail")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ tableData: json, isLoading: false });
      });
  };

  scrollback = () => {
    scroller.scrollTo("firmTable", {
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
    scroller.scrollTo("firmform", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
    console.log(this.state.tableData);
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
        scroller.scrollTo("firmform", {
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
        <div className="firmTable" style={{ marginTop: " 87px" }}>
          <NewsLetterTabEmailComp
            isLoading={this.state.isLoading}
            tableData={this.state.tableData}
            rowEvents={rowEvents}
            prophandleForm={this.handleForm}
          />
        </div>
        <div className="firmform">
          <div style={{ display: this.state.form }}>
            <NewsLetterEmailFormElements
              scrollback={this.scrollback}
              fetchFirm={this.fetchFirm}
              editFormData={this.state.editFormData}
              TprophandleForm={this.ThandleForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NewLemailTab;
