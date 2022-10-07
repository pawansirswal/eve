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

class DealerForm extends Component {
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
      name: "",
      phone: "",
      email: "",
      address: "",
      pan: "",
      bankName: "",
      accNo: "",
      accType: "",
      ifsc: "",
      branch: "",
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

  handleForm = () => {
    let chk = true;
    const name =
      this.state.name === ""
        ? this.props.editFormData.full_name
        : this.state.name;
    const named = document.getElementById("name");
    const phone =
      this.state.phone === ""
        ? this.props.editFormData.phone
        : this.state.phone;
    const phoned = document.getElementById("phone");
    const email =
      this.state.email === ""
        ? this.props.editFormData.email
        : this.state.email;
    const emaild = document.getElementById("email");
    const address =
      this.state.address === ""
        ? this.props.editFormData.address
        : this.state.address;
    const addressd = document.getElementById("address");
    const pan =
      this.state.pan === "" ? this.props.editFormData.panNo : this.state.pan;
    const pand = document.getElementById("pan");
    const bankName =
      this.state.bankName === ""
        ? this.props.editFormData.bankName
        : this.state.bankName;
    const bankNamed = document.getElementById("bankName");
    const accNo =
      this.state.accNo === ""
        ? this.props.editFormData.bankAccNo
        : this.state.accNo;
    const accNod = document.getElementById("accNo");
    const accType =
      this.state.accType === ""
        ? this.props.editFormData.accType
        : this.state.accType;
    const accTyped = document.getElementById("accType");
    const ifsc =
      this.state.ifsc === ""
        ? this.props.editFormData.ifscCode
        : this.state.ifsc;
    const ifscd = document.getElementById("ifsc");
    const branch =
      this.state.branch === ""
        ? this.props.editFormData.branch
        : this.state.branch;
    const branchd = document.getElementById("branch");

    if (name === "" || name === undefined) {
      this.setError(named, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(named);
    }
    if (phone === "" || phone === undefined) {
      this.setError(phoned, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(phoned);
    }
    if (email === "" || email === undefined) {
      this.setError(emaild, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(emaild);
    }
    if (address === "" || address === undefined) {
      this.setError(addressd, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(addressd);
    }
    if (pan === "" || pan === undefined) {
      this.setError(pand, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(pand);
    }
    if (bankName === "" || bankName === undefined) {
      this.setError(bankNamed, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(bankNamed);
    }
    if (accNo === "" || accNo === undefined) {
      this.setError(accNod, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(accNod);
    }
    if (accType === "" || accType === undefined) {
      this.setError(accTyped, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(accTyped);
    }
    if (ifsc === "" || ifsc === undefined) {
      this.setError(ifscd, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(ifscd);
    }
    if (branch === "" || branch === undefined) {
      this.setError(branchd, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(branchd);
    }

    if (chk === true) {
      if (this.props.editFormData.length === 0) {
        this.addDealer(
          name,
          phone,
          email,
          address,
          pan,
          bankName,
          accNo,
          accType,
          ifsc,
          branch
        );
      } else {
        this.editDealer(
          name,
          phone,
          email,
          address,
          pan,
          bankName,
          accNo,
          accType,
          ifsc,
          branch
        );
      }
    }
  };

  addDealer = (
    name,
    phone,
    email,
    address,
    pan,
    bankName,
    accNo,
    accType,
    ifsc,
    branch
  ) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: name,
        phone: phone,
        email: email,
        address: address,
        pan: pan,
        bankName: bankName,
        accNo: accNo,
        accType: accType,
        ifscCode: ifsc,
        branch: branch,
      }),
    };
    fetch(API.api_route + "/dealer/addDealer", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Dealer Added successfully !");
          this.props.fetchDealer();
          this.props.scrollback();
          let g = document.getElementsByClassName("form-control");
          this.props.TprophandleForm();

          // window.location.reload();
        } else {
          notification.error({ message: data.msg });
        }
      });
  };

  editDealer = (
    name,
    phone,
    email,
    address,
    pan,
    bankName,
    accNo,
    accType,
    ifsc,
    branch
  ) => {
    // console.log(compName, compAdd, authPerson, contact, rtaName, rtaContactPerson, rtaMob, rtaLandline, rtaEmail);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.props.editFormData.id,
        full_name: name,
        phone: phone,
        email: email,
        address: address,
        pan: pan,
        bankName: bankName,
        accNo: accNo,
        accType: accType,
        ifscCode: ifsc,
        branch: branch,
      }),
    };
    fetch(API.api_route + "/dealer/editDealer", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Dealer updated successfully !");
          this.props.fetchDealer();
          this.props.scrollback();
          this.props.TprophandleForm();
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
          firmName: this.props.editFormData.firmName,
        }),
      };
      fetch(API.api_route + "/dealer/delete", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            message.success("Dealer Deleted successfully !");
            this.props.fetchDealer();
            this.props.scrollback();
            this.props.TprophandleForm();
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
                      <Label className="col-md-2 col-form-label">Name</Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.full_name}`
                          }
                          onChange={this.handleFields}
                          placeholder="Name"
                          type="text"
                          id="name"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Phone
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.phone}`
                          }
                          placeholder="Phone"
                          type="Number"
                          id="phone"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Email
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.email}`
                          }
                          placeholder="Email"
                          type="email"
                          id="email"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Address
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.address}`
                          }
                          onChange={this.handleFields}
                          placeholder="Address"
                          type="text"
                          id="address"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        PAN
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.panNo}`
                          }
                          onChange={this.handleFields}
                          placeholder="PAN"
                          type="text"
                          id="pan"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Bank Name
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.bankName}`
                          }
                          onChange={this.handleFields}
                          placeholder="Bank Name"
                          type="text"
                          id="bankName"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Account No.
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.bankAccNo}`
                          }
                          onChange={this.handleFields}
                          placeholder="Account No."
                          type="number"
                          id="accNo"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Account Type
                      </Label>
                      <Col md={10}>
                        <select
                          onChange={this.handleFields}
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.accType}`
                          }
                          id="accType"
                          className="form-control"
                        >
                          <option>Savings</option>
                          <option>Current</option>
                        </select>
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        IFSC code
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.ifscCode}`
                          }
                          placeholder="IFSC code"
                          type="text"
                          id="ifsc"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Branch
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.branch}`
                          }
                          placeholder="Branch"
                          type="text"
                          id="branch"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <button
                      onClick={this.handleForm}
                      // onClick={this.seh}
                      className="btn btn-primary btn-sm"
                    >
                      Save Dealer
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

export default DealerForm;
