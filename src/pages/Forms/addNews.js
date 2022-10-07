import React, { Component } from "react";
// import Resizer from "react-image-file-resizer";
import imageCompression from "browser-image-compression";
import { jsPDF } from "jspdf";
import Select from "react-select";
import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
// import { Link } from "react-router-dom";
import API from "../../config/config";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import axios from "axios";/
import { message, notification, Modal, Button } from "antd";
import NewsTable from "../Dashboard/newsTable";

class AddNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Forms Elements", link: "#" },
      ],
      customchk: true,
      toggleSwitch: true,
      companies: [],
      title: "",
      link: "",
      date: null,
      signU: true,
      visible: false,
      rowId: null,
      isLoading: false,
      tableData: [],
    };
  }

  componentDidMount() {
    this.fetchNews();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    this.setState({
      date: dd + "-" + mm + "-" + yyyy,
    });
  }

  handleModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.delete();
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // handleDocs = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     documents: [...this.state.documents, e.target.files[0]],
  //   });
  // };

  // sendDocs = () => {
  //   if (this.state.firmName === "") {
  //     notification.error({ message: "Please Provide Firm Name First" });
  //   } else {
  //     this.state.documents.map((item) => {
  //       if (item !== undefined) {
  //         var data = new FormData();
  //         data.append("file", item);
  //         data.append("firmName", this.state.firmName);

  //         fetch(API.api_route + "/aws/uploadtoawss3", {
  //           method: "POST",
  //           body: data,
  //         });
  //       }
  //     });
  //   }
  // };

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  test = () => {
    console.log(this.state.documents);
  };

  fetchNews = () => {
    console.log("fetchBillHistory is called");
    this.setState({
      isLoading: true,
    });
    fetch(API.api_route + "/dealer/fetchNews")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ tableData: json, isLoading: false });
        console.log(json);
      });
  };

  addNews = () => {
    var expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var t = this.state.link;

    if (t.match(regex)) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: this.state.title,
          link: this.state.link,
          date: this.state.date,
        }),
      };
      fetch(API.api_route + "/user/userNews", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            message.success("News added successfully !");
            this.fetchNews();
          } else {
            notification.error({ message: data.msg });
          }
        });
    } else {
      notification.error({ message: "Please proide a valid url link" });
    }
  };

  handleFields = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  isEmail = (email) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  };

  isMob = (mobno) => {
    if (mobno.length !== 10) {
      return false;
    } else {
      return true;
    }
  };

  isLandline = (landline) => {
    if (landline.length !== 8) {
      return false;
    } else {
      return true;
    }
  };
  setError = (input, message) => {
    const formControl = input.parentElement;
    const errorMsg = formControl.querySelector(".registration_input-msg");
    formControl.className = " text-left error";
    errorMsg.innerText = message;
  };

  setSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = "success";
  };

  fetchCompany = () => {
    fetch(API.api_route + "/analytics/fetchCompanies")
      .then((response) => response.json())
      .then((json) => this.setState({ companies: json }))
      .catch((e) => {
        console.log(e);
        notification.error({ message: "error" });
      });
  };

  handleSelect = (e) => {
    this.setState({
      [e.id]: e.value,
    });
  };

  render() {
    const compNames = [];
    this.state.companies.map((company) =>
      compNames.push({
        id: `shareCompany`,
        label: `${company.companyName}`,
        value: `${company.companyName}`,
      })
    );
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
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Forms Elements"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    {/* <h4 className="card-title">Textual inputs</h4> */}
                    <FormGroup row>
                      <Label className="col-md-2 col-form-label">Title</Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          placeholder="Title"
                          type="text"
                          id="title"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Link
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          placeholder="Link"
                          type="text"
                          id="link"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <button
                      onClick={this.addNews}
                      // onClick={this.seh}
                      className="btn btn-primary btn-sm"
                    >
                      Add news
                    </button>{" "}
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <NewsTable
              fetchNews={this.fetchNews}
              tableData={this.state.tableData}
            />
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default AddNews;
