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
import { message, notification, Modal } from "antd";

class SharesFormElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Forms Elements", link: "#" },
      ],
      customchk: true,
      toggleSwitch: true,
      compName: "",
      compAdd: "",
      authPerson: "",
      contact: "",
      rtaName: "",
      rtaContactPerson: "",
      rtaMob: "",
      rtaLandline: "",
      rtaEmail: "",
      isin: "",
      visible: false,
    };
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
    const compName =
      this.state.compName === ""
        ? this.props.editFormData.companyName
        : this.state.compName;
    const cname = document.getElementById("compName");
    const compAdd =
      this.state.compAdd === ""
        ? this.props.editFormData.companyAddress
        : this.state.compAdd;
    const cAdd = document.getElementById("compAdd");
    const authPerson =
      this.state.authPerson === ""
        ? this.props.editFormData.authPerson
        : this.state.authPerson;
    const aPerson = document.getElementById("authPerson");
    const contact =
      this.state.contact === ""
        ? this.props.editFormData.contact
        : this.state.contact;
    const contactd = document.getElementById("contact");
    const rtaName =
      this.state.rtaName === ""
        ? this.props.editFormData.rtaName
        : this.state.rtaName;
    const rtaNamed = document.getElementById("rtaName");
    const rtaContactPerson =
      this.state.rtaContactPerson === ""
        ? this.props.editFormData.rtaContactPerson
        : this.state.rtaContactPerson;
    const rtaContactPersond = document.getElementById("rtaContactPerson");
    const rtaMob =
      this.state.rtaMob === ""
        ? this.props.editFormData.rtaMob
        : this.state.rtaMob;
    const rtaMobd = document.getElementById("rtaMob");
    const rtaLandline =
      this.state.rtaLandline === ""
        ? this.props.editFormData.rtaLandline
        : this.state.rtaLandline;
    const rtaLandlined = document.getElementById("rtaLandline");
    const rtaEmail =
      this.state.rtaEmail === ""
        ? this.props.editFormData.rtaEmail
        : this.state.rtaEmail;
    const rtaEmaild = document.getElementById("rtaEmail");
    const isin =
      this.state.isin === "" ? this.props.editFormData.isin : this.state.isin;
    const isind = document.getElementById("isin");

    if (compName === "" || compName === undefined) {
      this.setError(cname, "Company name can't be blank");
      chk = false;
    } else {
      this.setSuccess(cname);
    }
    // if (compAdd === "" || compAdd === undefined) {
    //   this.setError(cAdd, "Company Address can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(cAdd);
    // }
    // if (authPerson === "" || authPerson === undefined) {
    //   this.setError(aPerson, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(aPerson);
    // }
    // if (contact === "" || contact === undefined) {
    //   this.setError(contactd, "This Field can't be blank");
    //   chk = false;
    // } else if (!this.isMob(contact)) {
    //   this.setError(contactd, "Enter a valid mobile no.");
    //   chk = false;
    // } else {
    //   this.setSuccess(contactd);
    // }

    // if (rtaName === "" || rtaName === undefined) {
    //   this.setError(rtaNamed, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(rtaNamed);
    // }

    // if (rtaContactPerson === "" || rtaContactPerson === undefined) {
    //   this.setError(rtaContactPersond, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(rtaContactPersond);
    // }

    // if (rtaMob === "" || rtaMob === undefined) {
    //   this.setError(rtaMobd, "This Field can't be blank");
    //   chk = false;
    // } else if (!this.isMob(rtaMob)) {
    //   this.setError(rtaMobd, "Enter a valid mobile no.");
    //   chk = false;
    // } else {
    //   this.setSuccess(rtaMobd);
    // }

    // if (rtaLandline === "" || rtaLandline === undefined) {
    //   this.setError(rtaLandlined, "This Field can't be blank");
    //   chk = false;
    // } else if (!this.isLandline(rtaLandline)) {
    //   this.setError(rtaLandlined, "Enter a valid landline no.");
    //   chk = false;
    // } else {
    //   this.setSuccess(rtaLandlined);
    // }

    // if (rtaEmail === "" || rtaEmail === undefined) {
    //   this.setError(rtaEmaild, "This Field can't be blank");
    //   chk = false;
    // } else if (!this.isEmail(rtaEmail)) {
    //   this.setError(rtaEmaild, "Enter a valid Email Address");
    //   chk = false;
    // } else {
    //   this.setSuccess(rtaEmaild);
    // }

    if (isin === "" || isin === undefined) {
      this.setError(isind, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(isind);
    }

    if (chk === true) {
      if (this.props.editFormData.length === 0) {
        this.addSharesCompany(
          compName,
          compAdd,
          authPerson,
          contact,
          rtaName,
          rtaContactPerson,
          rtaMob,
          rtaLandline,
          rtaEmail,
          isin
        );
      } else {
        this.editSharesCompany(
          compName,
          compAdd,
          authPerson,
          contact,
          rtaName,
          rtaContactPerson,
          rtaMob,
          rtaLandline,
          rtaEmail,
          isin
        );
      }
    }
  };

  addSharesCompany = (
    compName,
    compAdd,
    authPerson,
    contact,
    rtaName,
    rtaContactPerson,
    rtaMob,
    rtaLandline,
    rtaEmail,
    isin
  ) => {
    console.log(
      compName,
      compAdd,
      authPerson,
      contact,
      rtaName,
      rtaContactPerson,
      rtaMob,
      rtaLandline,
      rtaEmail
    );
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: compName,
        companyAddress: compAdd,
        authPerson: authPerson,
        contact: contact,
        rtaName: rtaName,
        rtaContactPerson: rtaContactPerson,
        rtaMob: rtaMob,
        rtaLandline: rtaLandline,
        rtaEmail: rtaEmail,
        isin: isin.toUpperCase(),
      }),
    };
    fetch(API.api_route + "/shares/addShareCompany", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Share Company Added successfully !");
          this.props.fetchshareComp();
          this.props.scrollback();
          this.props.ThandleForm();
        } else {
          notification.error({ message: data.msg });
        }
      });
  };
  editSharesCompany = (
    compName,
    compAdd,
    authPerson,
    contact,
    rtaName,
    rtaContactPerson,
    rtaMob,
    rtaLandline,
    rtaEmail,
    isin
  ) => {
    // console.log(compName, compAdd, authPerson, contact, rtaName, rtaContactPerson, rtaMob, rtaLandline, rtaEmail);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.props.editFormData.id,
        companyName: compName,
        companyAddress: compAdd,
        authPerson: authPerson,
        contact: contact,
        rtaName: rtaName,
        rtaContactPerson: rtaContactPerson,
        rtaMob: rtaMob,
        rtaLandline: rtaLandline,
        rtaEmail: rtaEmail,
        isin: isin.toUpperCase(),
      }),
    };
    fetch(API.api_route + "/shares/editShareCompany", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Share Company Updated successfully !");
          this.props.fetchshareComp();
          this.props.scrollback();
          this.props.ThandleForm();
        } else {
          notification.error({ message: data.msg });
        }
      });

    // console.log(this.props.editFormData.id);
  };

  delete = () => {
    if (this.props.editFormData.id !== undefined) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.props.editFormData.id,
        }),
      };
      fetch(API.api_route + "/shares/delete", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            message.success("Shares Company Deleted successfully !");
            this.props.fetchshareComp();
            this.props.scrollback();
            this.props.ThandleForm();
          } else {
            notification.error({ message: data.msg });
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
              title="Forms Elements"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    <h4 className="card-title">Textual inputs</h4>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Company Name
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          placeholder="Company Name"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.companyName}`
                          }
                          type="text"
                          id="compName"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Company Registered Address{" "}
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          className="form-control"
                          placeholder="Company Registered Address"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.companyAddress}`
                          }
                          type="text"
                          id="compAdd"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-url-input"
                        className="col-md-2 col-form-label"
                      >
                        Authorised Person Name
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          className="form-control"
                          type="text"
                          id="authPerson"
                          placeholder="Authorised Person Name"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.authPerson}`
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
                        Contact Number
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Contact Number"
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
                        RTA Name
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="RTA Name"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.rtaName}`
                          }
                          className="form-control"
                          type="text"
                          id="rtaName"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        RTA Contact Person
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="RTA Contact Person"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.rtaContactPerson}`
                          }
                          className="form-control"
                          type="text"
                          id="rtaContactPerson"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        RTA Mobile Number
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="RTA Mobile Number"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.rtaMob}`
                          }
                          className="form-control"
                          type="number"
                          id="rtaMob"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        RTA Landline
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="RTA Landline"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.rtaLandline}`
                          }
                          className="form-control"
                          type="number"
                          id="rtaLandline"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        RTA Email Id
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="RTA Email Id"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.rtaEmail}`
                          }
                          className="form-control"
                          type="text"
                          id="rtaEmail"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        ISIN
                      </Label>
                      <Col md={10}>
                        <Input
                          style={{ textTransform: "uppercase" }}
                          onChange={this.handleFields}
                          placeholder="ISIN"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.isin}`
                          }
                          className="form-control"
                          type="text"
                          id="isin"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <button
                      onClick={this.handleForm}
                      className="btn btn-primary btn-sm"
                    >
                      Save Shares Company
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

export default SharesFormElements;
