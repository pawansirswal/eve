import React, { Component } from "react";
import DealerTableComp from "../Dashboard/DealerTableComp";
import DealerForm from "../Forms/dealerForm";
import API from "../../config/config";
import { scroller } from "react-scroll";

class DealerMaster extends Component {
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
    this.fetchDealer();
  }

  fetchDealer = () => {
    console.log("fetchDealer is called");
    fetch(API.api_route + "/dealer/fetchDealer", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ tableData: json, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
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
          <DealerTableComp
            isLoading={this.state.isLoading}
            tableData={this.state.tableData}
            rowEvents={rowEvents}
            prophandleForm={this.handleForm}
          />
        </div>
        <div className="firmform">
          <div style={{ display: this.state.form }}>
            <DealerForm
              scrollback={this.scrollback}
              fetchDealer={this.fetchDealer}
              editFormData={this.state.editFormData}
              TprophandleForm={this.ThandleForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DealerMaster;
