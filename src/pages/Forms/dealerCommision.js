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
import CEtable from "../Dashboard/commisionTable";

class DealerCommision extends Component {
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
      shareCompany: "",
      dealerPrice: "",
      userPrice: "",
      prices: [],
      signU: true,
      visible: false,
      rowId: null,
    };
  }

  componentDidMount() {
    this.fetchCompany();
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

  editComm = (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.prices[0].id,
        shareCompany: this.state.shareCompany,
        dealerPrice:
          this.state.dealerPrice === ""
            ? this.state.prices[0].dealerPrice
            : this.state.dealerPrice,
        userPrice:
          this.state.userPrice === ""
            ? this.state.prices[0].userPrice
            : this.state.userPrice,
      }),
    };
    fetch(API.api_route + "/dealer/editComm", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Commision Data Updated successfully !");
          this.fetchPrice(this.state.shareCompany);
        } else {
          notification.error({ message: data.msg });
        }
      });
  };

  handleForm = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shareCompany: this.state.shareCompany,
        dealerPrice: this.state.dealerPrice,
        userPrice: this.state.userPrice,
      }),
    };
    fetch(API.api_route + "/dealer/addComm", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Commision Data Updated successfully !");
          this.fetchPrice(this.state.shareCompany);
        } else {
          notification.error({ message: data.msg });
        }
      });
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

  fetchPrice = (id) => {
    fetch(API.api_route + "/dealer/fetchPrices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({ prices: json.data });
      })
      .catch((e) => {
        console.log(e);
        notification.error({ message: "error" });
      });
  };

  fetchCompany = () => {
    fetch(API.api_route + "/analytics/fetchCompanies")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ companies: json });
      })
      .catch((e) => {
        console.log(e);
        notification.error({ message: "error" });
      });
  };

  handleSelect = (e) => {
    this.setState({
      [e.id]: e.value,
    });

    this.fetchPrice(e.value);
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
                      <Label className="col-md-2 col-form-label">
                        Company Name
                      </Label>
                      <Col md={10}>
                        <Select
                          options={compNames}
                          onChange={this.handleSelect}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Dealer Price
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          defaultValue={
                            this.state.prices.length > 0
                              ? this.state.prices[0].dealerPrice
                              : ""
                          }
                          placeholder="Dealer Price"
                          type="Number"
                          id="dealerPrice"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        User Price
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          defaultValue={
                            this.state.prices.length > 0
                              ? this.state.prices[0].userPrice
                              : ""
                          }
                          placeholder="User Price"
                          type="number"
                          id="userPrice"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Commision
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          defaultValue={
                            this.state.prices.length > 0
                              ? this.state.prices[0].userPrice -
                                this.state.prices[0].dealerPrice
                              : ""
                          }
                          placeholder="Commision"
                          type="number"
                          id="userPrice"
                          disabled={true}
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <button
                      onClick={
                        this.state.prices.length > 0
                          ? this.editComm
                          : this.handleForm
                      }
                      // onClick={this.seh}
                      className="btn btn-primary btn-sm"
                    >
                      save
                    </button>{" "}
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <CEtable />
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default DealerCommision;
