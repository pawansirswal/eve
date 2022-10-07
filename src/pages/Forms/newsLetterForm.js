import React, { Component } from "react";
// import Resizer from "react-image-file-resizer";
import imageCompression from "browser-image-compression";

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

class NewsLetterFormElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Forms Elements", link: "#" },
      ],
      customchk: true,
      toggleSwitch: true,
      name: "",
      phone: "",
      email: "",
      signU: true,
      visible: false,
      rowId: null,
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

  test = () => {
    console.log(this.state.documents);
  };

  handleForm = () => {
    let chk = true;
    const mobile =
      this.state.mobile === ""
        ? this.props.editFormData.mobile
        : this.state.mobile;
    const mobiled = document.getElementById("mobile");
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

    if (mobile === "" || mobile === undefined) {
      this.setError(mobiled, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(mobiled);
    }

    if (chk === true) {
      if (this.props.editFormData.length === 0) {
        this.addFirm(mobile);
      } else {
        this.editSharesCompany(mobile);
      }
    }
  };

  addFirm = (mobile) => {
    console.log(mobile);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: mobile,
      }),
    };
    fetch(API.api_route + "/customer/addMobile", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Mobile Added successfully !");
          this.props.fetchFirm();
          this.props.scrollback();
          let g = document.getElementsByClassName("form-control");
          this.props.TprophandleForm();

          // window.location.reload();
        } else {
          notification.error({ message: data.msg });
        }
      });
  };

  editSharesCompany = (mobile) => {
    // console.log(compName, compAdd, authPerson, contact, rtaName, rtaContactPerson, rtaMob, rtaLandline, rtaEmail);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.props.editFormData.id,
        mobile: mobile,
      }),
    };
    fetch(API.api_route + "/customer/editcustomerfornews", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("User edited successfully !");
          this.props.fetchFirm();
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
        }),
      };
      fetch(API.api_route + "/customer/deleteuser", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            message.success("Firm Deleted successfully !");
            this.props.fetchFirm();
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
                    {/* <h4 className="card-title">Textual inputs</h4> */}
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Mobile
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.mobile}`
                          }
                          onChange={this.handleFields}
                          placeholder="Mobile"
                          type="text"
                          id="mobile"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <button
                      // onClick={this.handleForm}
                      onClick={this.handleForm}
                      className="btn btn-primary btn-sm"
                    >
                      Save Mobile
                    </button>{" "}
                    {this.props.editFormData.length === 0 ? (
                      <div></div>
                    ) : (
                      <button
                        onClick={this.handleModal}
                        className="btn btn-danger btn-sm"
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

export default NewsLetterFormElements;
