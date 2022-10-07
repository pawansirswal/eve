import React, { Component } from "react";
// import Resizer from "react-image-file-resizer";
import imageCompression from "browser-image-compression";
import { jsPDF } from "jspdf";

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

class FirmsFormElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Forms Elements", link: "#" },
      ],
      customchk: true,
      toggleSwitch: true,
      firmName: "",
      dematAcDetails: "",
      dpName: "",
      dpid: "",
      bank1: "",
      bankAcName: "",
      bankAcNo: "",
      ifscCode: "",
      branch: "",
      bank2: "",
      contactPerson: "",
      mob1: "",
      mob2: "",
      landline: "",
      address: "",
      email: "",
      panNo: "",
      aadharDoc: {},
      panDoc: {},
      addressDoc: {},
      NSDLDoc: {},
      CDSLDoc: {},
      cancelledDoc: {},
      signDoc: {},
      documents: [],
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

  handleDocs = (e) => {
    // Default export is a4 paper, portrait, using millimeters for units

    e.preventDefault();

    console.log("handling", e.target.id);
    const firmNamet =
      this.state.firmName === ""
        ? this.props.editFormData.firmName
        : this.state.firmName;
    if (firmNamet === "" || firmNamet === undefined) {
      notification.error({ message: "Please Provide Firm Name First" });
    } else if (e.target.id === "sign" && e.target.files[0] !== undefined) {
      console.log(firmNamet);
      var imageFile = e.target.files[0];
      var firmName = firmNamet;
      console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      var options = {
        maxSizeMB: 1,
        maxWidth: 150,
        maxHeight: 105,
        useWebWorker: true,
      };
      var that = this;
      imageCompression(imageFile, options, firmName)
        .then(function (compressedFile) {
          console.log("compressedFile instanceof Blob", compressedFile); // true
          var file = new File([compressedFile], "authorised_signature.jpg");
          console.log(file);
          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          ); // smaller than maxSizeMB
          var data = new FormData();
          data.append("file", file);
          data.append("firmName", firmName);

          fetch(API.api_route + "/aws/uploadtoawss3", {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            body: data,
          }).then((res) => {
            console.log("aws", res);
            if (res.status === 200) {
              message.success("Sign Uploaded!!!");
              that.setState({
                signU: false,
              });
            } else {
              notification.error({ message: "Try Again" });
            }
          });
          // uploadToServer(compressedFile); // write your own logic
        })
        .catch(function (error) {
          notification.error({ message: error.message });
          console.log(error.message);
        });
    } else {
      console.log(e.target.files[0]);

      if (e.target.files[0] !== undefined) {
        if (e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
          console.log("imagefile");
          var imgData = "";
          console.log(e.target.files[0]);
          var img = e.target.files[0];
          this.getBase64(img, (result) => {
            imgData = result;
            // console.log(result);
          });

          var name = e.target.id;
          setTimeout(() => {
            const doc = new jsPDF();
            // "PNG", 50, 50, 50, 50
            doc.addImage(imgData, 0, 0);
            console.log(doc.output("blob"));
            var docdata = doc.output("blob");

            if (docdata !== undefined) {
              var data = new FormData();
              var file = new File([docdata], `${name}.pdf`, {
                type: "application/pdf;charset=utf-8",
              });
              //  new File(docdata, `aadhar.pdf`);
              data.append("file", file);
              data.append("firmName", firmNamet);

              fetch(API.api_route + "/aws/uploadtoawss3", {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                },
                body: data,
              }).then((res) => {
                if (res.status === 200) {
                  message.success("File Uploaded Successfully!!!");
                } else {
                  notification.error({ message: "Try Again " });
                }
              });
            }

            // doc.save("output.pdf");
          }, 1000);
        } else {
          console.log("pdffile");
          var data = new FormData();
          var file = new File([e.target.files[0]], `${e.target.id}.pdf`);
          data.append("file", file);
          data.append("firmName", firmNamet);

          fetch(API.api_route + "/aws/uploadtoawss3", {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            body: data,
          }).then((res) => {
            if (res.status === 200) {
              message.success("File Uploaded Successfully!!!");
            } else {
              notification.error({ message: "Try Again " });
            }
          });
        }
      }
    }
  };

  test = () => {
    console.log(this.state.documents);
  };

  handleForm = () => {
    let chk = true;
    const firmName =
      this.state.firmName === ""
        ? this.props.editFormData.firmName
        : this.state.firmName;
    const firmNamed = document.getElementById("firmName");
    const dematAcDetails =
      this.state.dematAcDetails === ""
        ? this.props.editFormData.dematAcDetails
        : this.state.dematAcDetails;
    const dematAcDetailsd = document.getElementById("dematAcDetails");
    const dpName =
      this.state.dpName === ""
        ? this.props.editFormData.dpName
        : this.state.dpName;
    const dpNamed = document.getElementById("dpName");
    const dpid =
      this.state.dpid === "" ? this.props.editFormData.dpid : this.state.dpid;
    const dpidd = document.getElementById("dpid");
    const bank1 =
      this.state.bank1 === ""
        ? this.props.editFormData.bank1
        : this.state.bank1;
    const bank1d = document.getElementById("bank1");
    const bankAcName =
      this.state.bankAcName === ""
        ? this.props.editFormData.bankAcName
        : this.state.bankAcName;
    const bankAcNamed = document.getElementById("bankAcName");
    const bankAcNo =
      this.state.bankAcNo === ""
        ? this.props.editFormData.bankAcNo
        : this.state.bankAcNo;
    const bankAcNod = document.getElementById("bankAcNo");
    const ifscCode =
      this.state.ifscCode === ""
        ? this.props.editFormData.ifscCode
        : this.state.ifscCode;
    const ifscCoded = document.getElementById("ifscCode");
    const branch =
      this.state.branch === ""
        ? this.props.editFormData.branch
        : this.state.branch;
    const branchd = document.getElementById("branch");
    const bank2 =
      this.state.bank2 === ""
        ? this.props.editFormData.bank2
        : this.state.bank2;
    // const bank2d = document.getElementById("bank2");
    const contactPerson =
      this.state.contactPerson === ""
        ? this.props.editFormData.contactPerson
        : this.state.contactPerson;
    const contactPersond = document.getElementById("contactPerson");
    const mob1 =
      this.state.mob1 === "" ? this.props.editFormData.mob1 : this.state.mob1;
    const mob1d = document.getElementById("mob1");
    const mob2 =
      this.state.mob2 === "" ? this.props.editFormData.mob2 : this.state.mob2;
    const mob2d = document.getElementById("mob2");
    const landline =
      this.state.landline === ""
        ? this.props.editFormData.landline
        : this.state.landline;
    const landlined = document.getElementById("landline");
    const address =
      this.state.address === ""
        ? this.props.editFormData.address
        : this.state.address;
    const addressd = document.getElementById("address");
    const email =
      this.state.email === ""
        ? this.props.editFormData.email
        : this.state.email;
    const emaild = document.getElementById("email");
    const panNo =
      this.state.panNo === ""
        ? this.props.editFormData.panNo
        : this.state.panNo;
    const panNod = document.getElementById("panNo");

    if (firmName === "" || firmName === undefined) {
      this.setError(firmNamed, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(firmNamed);
    }
    if (dematAcDetails === "" || dematAcDetails === undefined) {
      this.setError(dematAcDetailsd, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(dematAcDetailsd);
    }
    if (dpName === "" || dpName === undefined) {
      this.setError(dpNamed, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(dpNamed);
    }
    if (dpid === "" || dpid === undefined) {
      this.setError(dpidd, "This field can't be blank");
      chk = false;
    } else {
      this.setSuccess(dpidd);
    }
    if (bank1 === "" || bank1 === undefined) {
      this.setError(bank1d, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(bank1d);
    }
    if (bankAcName === "" || bankAcName === undefined) {
      this.setError(bankAcNamed, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(bankAcNamed);
    }
    if (bankAcNo === "" || bankAcNo === undefined) {
      this.setError(bankAcNod, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(bankAcNod);
    }
    if (ifscCode === "" || ifscCode === undefined) {
      this.setError(ifscCoded, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(ifscCoded);
    }
    if (branch === "" || branch === undefined) {
      this.setError(branchd, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(branchd);
    }

    if (contactPerson === "" || contactPerson === undefined) {
      this.setError(contactPersond, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(contactPersond);
    }

    if (mob1 === "" || mob1 === undefined) {
      this.setError(mob1d, "This Field can't be blank");
      chk = false;
    } else if (!this.isMob(mob1)) {
      this.setError(mob1d, "Please enter valid mobile no");
      chk = false;
    } else {
      this.setSuccess(mob1d);
    }

    // if (mob2 === "" || mob2 === undefined) {
    //   this.setError(mob2d, "This Field can't be blank");
    //   chk = false;
    // } else if (!this.isMob(mob2)) {
    //   this.setError(mob2d, "Please enter valid mobile no");
    //   chk = false;
    // } else {
    //   this.setSuccess(mob2d);
    // }

    // if (landline === "" || landline === undefined) {
    //   this.setError(landlined, "This Field can't be blank");
    //   chk = false;
    // } else if (!this.isLandline(landline)) {
    //   this.setError(landlined, "Please enter valid landline no");
    //   chk = false;
    // } else {
    //   this.setSuccess(landlined);
    // }

    if (address === "" || address === undefined) {
      this.setError(addressd, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(addressd);
    }

    if (email === "" || email === undefined) {
      this.setError(emaild, "This Field can't be blank");
      chk = false;
    } else if (!this.isEmail(email)) {
      this.setError(emaild, "Please enter valid Email Address");
      chk = false;
    } else {
      this.setSuccess(emaild);
    }
    if (panNo === "" || panNo === undefined) {
      this.setError(panNod, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(panNod);
    }

    if (chk === true) {
      if (this.props.editFormData.length === 0) {
        this.addFirm(
          firmName,
          dematAcDetails,
          dpName,
          dpid,
          bank1,
          bankAcName,
          bankAcNo,
          ifscCode,
          branch,
          bank2,
          contactPerson,
          mob1,
          mob2,
          landline,
          address,
          email,
          panNo
        );
      } else {
        this.editSharesCompany(
          firmName,
          dematAcDetails,
          dpName,
          dpid,
          bank1,
          bankAcName,
          bankAcNo,
          ifscCode,
          branch,
          bank2,
          contactPerson,
          mob1,
          mob2,
          landline,
          address,
          email,
          panNo
        );
      }
    }
  };

  addFirm = (
    firmName,
    dematAcDetails,
    dpName,
    dpid,
    bank1,
    bankAcName,
    bankAcNo,
    ifscCode,
    branch,
    bank2,
    contactPerson,
    mob1,
    mob2,
    landline,
    address,
    email,
    panNo
  ) => {
    console.log(
      firmName,
      dematAcDetails,
      bank1,
      bank2,
      contactPerson,
      mob1,
      mob2,
      landline,
      address,
      email,
      panNo
    );
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firmName: firmName,
        dematAcDetails: dematAcDetails,
        dpName: dpName,
        dpid: dpid,
        bank1: bank1,
        bankAcName: bankAcName,
        bankAcNo: bankAcNo,
        ifscCode: ifscCode.toUpperCase(),
        branch: branch,
        bank2: bank2,
        contactPerson: contactPerson,
        mob1: mob1,
        mob2: mob2,
        landline: landline,
        address: address,
        email: email,
        panNo: panNo.toUpperCase(),
      }),
    };
    fetch(API.api_route + "/firm/addFirm", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Firm Added successfully !");
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

  editSharesCompany = (
    firmName,
    dematAcDetails,
    dpName,
    dpid,
    bank1,
    bankAcName,
    bankAcNo,
    ifscCode,
    branch,
    bank2,
    contactPerson,
    mob1,
    mob2,
    landline,
    address,
    email,
    panNo
  ) => {
    // console.log(compName, compAdd, authPerson, contact, rtaName, rtaContactPerson, rtaMob, rtaLandline, rtaEmail);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.props.editFormData.id,
        firmName: firmName,
        dematAcDetails: dematAcDetails,
        dpName: dpName,
        dpid: dpid,
        bank1: bank1,
        bankAcName: bankAcName,
        bankAcNo: bankAcNo,
        ifscCode: ifscCode.toUpperCase(),
        branch: branch,
        bank2: bank2,
        contactPerson: contactPerson,
        mob1: mob1,
        mob2: mob2,
        landline: landline,
        address: address,
        email: email,
        panNo: panNo.toUpperCase(),
      }),
    };
    fetch(API.api_route + "/firm/editFirm", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Firm Added successfully !");
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
          firmName: this.props.editFormData.firmName,
        }),
      };
      fetch(API.api_route + "/firm/delete", requestOptions)
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
                        Firm Name
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.firmName}`
                          }
                          onChange={this.handleFields}
                          placeholder="Firm Name"
                          type="text"
                          id="firmName"
                          disabled={
                            this.props.editFormData.length === 0 ? false : true
                          }
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Demat Account Details
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.dematAcDetails}`
                          }
                          placeholder="Demat Account Details"
                          type="text"
                          id="dematAcDetails"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        DP Name
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.dpName}`
                          }
                          placeholder="DP Name"
                          type="text"
                          id="dpName"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        DPID-Client ID
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.dpid}`
                          }
                          placeholder="DPID-Client ID"
                          type="text"
                          id="dpid"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Bank-1{" "}
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          className="form-control"
                          placeholder="Bank-1"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.bank1}`
                          }
                          type="text"
                          id="bank1"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Bank A/c Name
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          className="form-control"
                          placeholder="Bank A/c Name"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.bankAcName}`
                          }
                          type="text"
                          id="bankAcName"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Bank A/c No
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          className="form-control"
                          placeholder="Bank A/c No"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.bankAcNo}`
                          }
                          type="number"
                          id="bankAcNo"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        IFSC Code
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          className="form-control"
                          placeholder="IFSC Code"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.ifscCode}`
                          }
                          type="text"
                          id="ifscCode"
                          style={{ textTransform: "uppercase" }}
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Branch
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          className="form-control"
                          placeholder="Branch"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.branch}`
                          }
                          type="text"
                          id="branch"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-url-input"
                        className="col-md-2 col-form-label"
                      >
                        Bank-2
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          className="form-control"
                          type="text"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.bank2}`
                          }
                          id="bank2"
                          placeholder="Bank-2"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Contact Person's Name
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Contact Person's Name"
                          className="form-control"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.contactPerson}`
                          }
                          type="text"
                          id="contactPerson"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Mobile-1
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Mobile-1"
                          className="form-control"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.mob1}`
                          }
                          type="number"
                          id="mob1"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Mobile-2
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Mobile-2"
                          className="form-control"
                          type="number"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.mob2}`
                          }
                          id="mob2"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Landline
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Landline"
                          className="form-control"
                          type="number"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.landline}`
                          }
                          id="landline"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Address
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Address"
                          className="form-control"
                          type="text"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.address}`
                          }
                          id="address"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        AddressDoc
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleDocs}
                          placeholder="Address"
                          className="form-control"
                          type="file"
                          id="addressDoc"
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
                          className="form-control"
                          type="email"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.email}`
                          }
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
                        Pan No
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          style={{ textTransform: "uppercase" }}
                          placeholder="Pan No"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.panNo}`
                          }
                          className="form-control"
                          type="text"
                          id="panNo"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Pan Doc
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleDocs}
                          placeholder="Pan Image"
                          className="form-control"
                          type="file"
                          id="panDoc"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Aadhar No.
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Aadhar No."
                          className="form-control"
                          type="number"
                          id="aadhar"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Aadhar
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleDocs}
                          placeholder="Aadhar img"
                          className="form-control"
                          type="file"
                          id="aadhar"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        NSDL
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleDocs}
                          placeholder="NSDL"
                          className="form-control"
                          type="file"
                          id="nsdl"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        CDSL
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleDocs}
                          placeholder="CDSL"
                          className="form-control"
                          type="file"
                          id="cdsl"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Cancelled Cheque
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleDocs}
                          placeholder="Cancelled Cheque"
                          className="form-control"
                          type="file"
                          id="CancelCheque"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Sign Image
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleDocs}
                          placeholder="Sign"
                          className="form-control"
                          type="file"
                          id="sign"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <button
                      disabled={
                        this.props.editFormData.length === 0
                          ? this.state.signU
                          : false
                      }
                      // onClick={this.handleForm}
                      onClick={this.handleForm}
                      className="btn btn-primary btn-sm"
                    >
                      Save Firm
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

export default FirmsFormElements;
