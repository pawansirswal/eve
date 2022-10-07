import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  FormGroup,
  Label,
  Input,
  CustomInput,
} from "reactstrap";
import { Link } from "react-router-dom";
import API from "../../config/config";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
import { message, notification, Modal } from "antd";

class CustomerFormElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Transaction", link: "#" },
        { title: "Share Holder details", link: "#" },
      ],
      companies: [],
      customchk: true,
      toggleSwitch: true,
      folioNo: "",
      name: "",
      address: "",
      city: "",
      pincode: "",
      qty: "",
      contact: "",
      email: "",
      cmnt1: "",
      caseType: "",
      quote: "",
      partyPrice: "",
      followedBy: "",
      companyName: "",
      visible: false,
    };
  }

  componentDidMount() {
    fetch(API.api_route + "/analytics/fetchCompanies")
      .then((response) => response.json())
      .then((json) => this.setState({ companies: json }));
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

  handleForm = () => {
    let chk = true;
    const folioNo =
      this.state.folioNo === ""
        ? this.props.editFormData.folioNo
        : this.state.folioNo;
    const folioNod = document.getElementById("folioNo");
    const name =
      this.state.name === ""
        ? this.props.editFormData.folioNo
        : this.state.name;
    const named = document.getElementById("name");
    const address =
      this.state.address === ""
        ? this.props.editFormData.address
        : this.state.address;
    const addressd = document.getElementById("address");
    const city =
      this.state.city === "" ? this.props.editFormData.city : this.state.city;
    const cityd = document.getElementById("city");
    const pincode =
      this.state.pincode === ""
        ? this.props.editFormData.pincode
        : this.state.pincode;
    const pincoded = document.getElementById("pincode");
    const qty =
      this.state.qty === "" ? this.props.editFormData.qty : this.state.qty;
    const qtyd = document.getElementById("qty");
    const contact =
      this.state.contact === ""
        ? this.props.editFormData.contact
        : this.state.contact;
    const contactd = document.getElementById("contact");
    const email =
      this.state.email === ""
        ? this.props.editFormData.email
        : this.state.email;
    const emaild = document.getElementById("email");
    const cmnt1 =
      this.state.cmnt1 === ""
        ? this.props.editFormData.cmnt1
        : this.state.cmnt1;
    const cmnt1d = document.getElementById("cmnt1");
    const caseType =
      this.state.caseType === ""
        ? this.props.editFormData.caseType
        : this.state.caseType;
    const caseTyped = document.getElementById("caseType");
    const quote =
      this.state.quote === ""
        ? this.props.editFormData.quote
        : this.state.quote;
    const quoted = document.getElementById("quote");
    const partyPrice =
      this.state.partyPrice === ""
        ? this.props.editFormData.partyPrice
        : this.state.partyPrice;
    const partyPriced = document.getElementById("partyPrice");
    const followedBy =
      this.state.followedBy === ""
        ? this.props.editFormData.followedBy
        : this.state.followedBy;
    const followedByd = document.getElementById("followedBy");
    const companyName =
      this.state.companyName === ""
        ? this.props.editFormData.companyName
        : this.state.companyName;
    const companyNamed = document.getElementById("companyName");

    // if (folioNo === "" || folioNo === undefined) {
    //   this.setError(folioNod, "Folio No can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(folioNod);
    // }
    // if (name === "" || name === undefined) {
    //   this.setError(named, "Company Address can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(named);
    // }
    // if (address === "" || address === undefined) {
    //   this.setError(addressd, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(addressd);
    // }
    // if (city === "" || city === undefined) {
    //   this.setError(cityd, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(cityd);
    // }

    // if (pincode === "" || pincode === undefined) {
    //   this.setError(pincoded, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(pincoded);
    // }

    // if (qty === "" || qty === undefined) {
    //   this.setError(qtyd, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(qtyd);
    // }

    // if (contact === "" || contact === undefined) {
    //   this.setError(contactd, "This Field can't be blank");
    //   chk = false;
    // } else if (!this.isMob(contact)) {
    //   this.setError(contactd, "Enter valid mobile no");
    //   chk = false;
    // } else {
    //   this.setSuccess(contactd);
    // }

    if (email === "" || email === undefined) {
      this.setError(emaild, "This Field can't be blank");
      chk = false;
    } else if (!this.isEmail(email)) {
      this.setError(emaild, "Enter a valid Email Address");
      chk = false;
    } else {
      this.setSuccess(emaild);
    }

    // if (cmnt1 === "" || cmnt1 === undefined) {
    //   this.setError(cmnt1d, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(cmnt1d);
    // }
    // if (caseType === "" || caseType === undefined) {
    //   this.setError(caseTyped, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(caseTyped);
    // }
    // if (quote === "" || quote === undefined) {
    //   this.setError(quoted, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(quoted);
    // }
    // if (partyPrice === "" || partyPrice === undefined) {
    //   this.setError(partyPriced, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(partyPriced);
    // }
    // if (followedBy === "" || followedBy === undefined) {
    //   this.setError(followedByd, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(followedByd);
    // }
    if (companyName === "" || companyName === undefined) {
      this.setError(companyNamed, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(companyNamed);
    }

    if (chk === true) {
      if (this.props.editFormData.length === 0) {
        this.addSharesCompany(
          folioNo,
          name,
          address,
          city,
          pincode,
          qty,
          contact,
          email,
          cmnt1,
          caseType,
          quote,
          partyPrice,
          followedBy,
          companyName
        );
      } else {
        this.editSharesCompany(
          folioNo,
          name,
          address,
          city,
          pincode,
          qty,
          contact,
          email,
          cmnt1,
          caseType,
          quote,
          partyPrice,
          followedBy,
          companyName
        );
      }
    }
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

  addSharesCompany = (
    folioNo,
    name,
    address,
    city,
    pincode,
    qty,
    contact,
    email,
    cmnt1,
    caseType,
    quote,
    partyPrice,
    followedBy,
    companyName
  ) => {
    // console.log(folioNo, name, address, city, pincode, qty, contact, email, cmnt1, caseType, quote, partyPrice, followedBy);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        folioNo: folioNo,
        name: name,
        address: address,
        city: city,
        pincode: pincode,
        qty: qty,
        contact: contact,
        email: email,
        cmnt1: cmnt1,
        caseType: caseType,
        quote: quote,
        partyPrice: partyPrice,
        followedBy: followedBy,
        companyName: companyName,
      }),
    };
    fetch(API.api_route + "/customer/addCustomer", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Customer Added successfully !");
          this.props.fetchCustomers();
          this.props.scrollback();
        } else {
          notification.error({ message: data.msg });
        }
      });

    // console.log("addSharesCompany");
  };
  editSharesCompany = (
    folioNo,
    name,
    address,
    city,
    pincode,
    qty,
    contact,
    email,
    cmnt1,
    caseType,
    quote,
    partyPrice,
    followedBy,
    companyName
  ) => {
    console.log(
      folioNo,
      name,
      address,
      city,
      pincode,
      qty,
      contact,
      email,
      cmnt1,
      caseType,
      quote,
      partyPrice,
      followedBy
    );
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.props.editFormData.id,
        folioNo: folioNo,
        name: name,
        address: address,
        city: city,
        pincode: pincode,
        qty: qty,
        contact: contact,
        email: email,
        cmnt1: cmnt1,
        caseType: caseType,
        quote: quote,
        partyPrice: partyPrice,
        followedBy: followedBy,
        companyName: companyName,
      }),
    };
    fetch(API.api_route + "/customer/editCustomer", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Customer Updated successfully !");
          this.props.fetchCustomers();
          this.props.scrollback();
        } else {
          notification.error({ message: data.msg });
        }
      });
    // console.log(this.props.editFormData.id);
  };

  delete = () => {
    if (this.props.editFormData.id != undefined) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.props.editFormData.id,
        }),
      };
      fetch(API.api_route + "/customer/delete", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            message.success("Customer Deleted successfully !");
            this.props.fetchCustomers();
            this.props.scrollback();
          } else {
            notification.error({ message: data.msg });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  handleFields = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  setError = (input, message) => {
    console.log(input);
    const formControl = input.parentElement;
    const errorMsg = formControl.querySelector(".registration_input-msg");
    formControl.className = " text-left error";
    errorMsg.innerText = message;
  };

  setSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = "success";
  };

  render() {
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
              title="Share Holder details"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Folio No
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          placeholder="Folio No"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.folioNo}`
                          }
                          type="text"
                          id="folioNo"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Name{" "}
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          className="form-control"
                          placeholder="Name"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.name}`
                          }
                          type="text"
                          id="name"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-url-input"
                        className="col-md-2 col-form-label"
                      >
                        Address
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          className="form-control"
                          type="text"
                          id="address"
                          placeholder="Address"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.address}`
                          }
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        City
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="City"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.city}`
                          }
                          className="form-control"
                          type="text"
                          id="city"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Pincode
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Pincode"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.pincode}`
                          }
                          className="form-control"
                          type="number"
                          id="pincode"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Quantity
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Quantity"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.qty}`
                          }
                          className="form-control"
                          type="number"
                          id="qty"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Contact
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Contact"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.contact}`
                          }
                          className="form-control"
                          type="number"
                          id="contact"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Email Id
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Email Id"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.email}`
                          }
                          className="form-control"
                          type="text"
                          id="email"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Comment 1
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Comment 1"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.cmnt1}`
                          }
                          className="form-control"
                          type="text"
                          id="cmnt1"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Case Type
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Case Type"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.caseType}`
                          }
                          className="form-control"
                          type="text"
                          id="caseType"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Quote
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Quote"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.quote}`
                          }
                          className="form-control"
                          type="text"
                          id="quote"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Party Price
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Party Price"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.partyPrice}`
                          }
                          className="form-control"
                          type="number"
                          id="partyPrice"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Followed By
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="FollwedBy"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.followedBy}`
                          }
                          className="form-control"
                          type="text"
                          id="followedBy"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="col-md-2 col-form-label">
                        Company Name
                      </Label>
                      <Col md={10}>
                        <select
                          id="companyName"
                          onChange={this.handleFields}
                          className="form-control"
                        >
                          <option>Select</option>
                          {this.state.companies.map((item, i) => (
                            <option> {item.companyName} </option>
                          ))}
                        </select>
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    {/* <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Company Name
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Company Name"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.companyName}`
                          }
                          className="form-control"
                          type="text"
                          id="companyName"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup> */}
                    <button
                      onClick={this.handleForm}
                      className="btn btn-primary btn-sm"
                    >
                      Save Customer
                    </button>{" "}
                    {this.props.editFormData.length === 0 ? (
                      <div></div>
                    ) : (
                      <button
                        onClick={this.handleModal}
                        className="btn btn-danger btn-sm"
                        style={{
                          display:
                            localStorage.getItem("user") === "manishMittal"
                              ? "inline-block"
                              : "none",
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default CustomerFormElements;
