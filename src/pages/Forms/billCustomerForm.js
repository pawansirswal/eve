import Api, { api_route } from "../../config/config";
import React, { Component } from "react";
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
import { message, notification, Modal } from "antd";

class BillCustomerFormElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Forms Elements", link: "#" },
      ],
      customchk: true,
      toggleSwitch: true,
      dealerList: [],
      dealerId: "",
      buyerName: "",
      panNo: "",
      email: "",
      contactNo: "",
      bankName: "",
      bankAc: "",
      acType: "",
      category: "Retailer",
      ifscCode: "",
      branch: "",
      dpName: "",
      dpid: "",
      dpName_nsdl: "",
      dpid_nsdl: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      cmnt1: "",
      visible: false,
    };
  }

  componentDidMount() {
    this.fetchDealers();
  }

  fetchDealers = () => {
    fetch(API.api_route + "/dealer/fetchDealer")
      .then((response) => response.json())
      .then((json) => this.setState({ dealerList: json }))
      .catch((e) => {
        console.log(e);
        notification.error({ message: "error" });
      });
  };

  handleSelect = (e) => {
    console.log(e.id, e.value, e.key);
    this.setState({
      dealerId: e.key,
    });
  };

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

  handleDocs = (e) => {
    e.preventDefault();

    const buyerNamet =
      this.state.buyerName === ""
        ? this.props.editFormData.buyerName
        : this.state.buyerName;
    if (buyerNamet === "" || buyerNamet === undefined) {
      notification.error({ message: "Please Provide Buyer Name First" });
    } else {
      console.log(e.target.files[0]);
      if (e.target.files[0] !== undefined) {
        var data = new FormData();
        var file = new File([e.target.files[0]], `${e.target.id}.pdf`);
        data.append("file", file);
        data.append("buyerName", buyerNamet);

        fetch(API.api_route + "/aws/uploadtoawss3billingCustDocs", {
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
  };

  handleForm = () => {
    let chk = true;
    const buyerName =
      this.state.buyerName === ""
        ? this.props.editFormData.buyerName
        : this.state.buyerName;
    const buyerNamed = document.getElementById("buyerName");
    const panNo =
      this.state.panNo === ""
        ? this.props.editFormData.panNo
        : this.state.panNo;
    const panNod = document.getElementById("panNo");
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
    const contactNo =
      this.state.contactNo === ""
        ? this.props.editFormData.contactNo
        : this.state.contactNo;
    const contactNod = document.getElementById("contactNo");
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

    const bankName =
      this.state.bankName === ""
        ? this.props.editFormData.bankName
        : this.state.bankName;
    const bankNamed = document.getElementById("bankName");

    const bankAc =
      this.state.bankAc === ""
        ? this.props.editFormData.bankAc
        : this.state.bankAc;
    const bankAcd = document.getElementById("bankAc");
    const acType =
      this.state.acType === ""
        ? this.props.editFormData.acType
        : this.state.acType;
    const acTyped = document.getElementById("acType");
    const category =
      this.state.category === ""
        ? this.props.editFormData.category
        : this.state.category;
    const categoryd = document.getElementById("category");
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
    const dpName =
      this.state.dpName === ""
        ? this.props.editFormData.dpName
        : this.state.dpName;
    const dpNamed = document.getElementById("dpName");
    const dpId =
      this.state.dpid === "" ? this.props.editFormData.dpid : this.state.dpid;
    const dpidd = document.getElementById("dpid");
    const dpName_nsdl =
      this.state.dpName_nsdl === ""
        ? this.props.editFormData.dpName_nsdl
        : this.state.dpName_nsdl;
    const dpName_nsdld = document.getElementById("dpName_nsdl");
    const dpId_nsdl =
      this.state.dpid_nsdl === ""
        ? this.props.editFormData.dpid_nsdl
        : this.state.dpid_nsdl;
    const dpid_nsdld = document.getElementById("dpid_nsdl");
    const state =
      this.state.state === ""
        ? this.props.editFormData.state
        : this.state.state;
    const stated = document.getElementById("state");
    const dealerId =
      this.state.dealerId === ""
        ? this.props.editFormData.dealerId
        : this.state.dealerId;
    const dealerIdd = document.getElementById("dealerId");

    if (buyerName === "" || buyerName === undefined) {
      this.setError(buyerNamed, "Buyer Name can't be blank");
      chk = false;
    } else {
      this.setSuccess(buyerNamed);
    }
    if (dealerId === "" || dealerId === undefined) {
      this.setError(dealerIdd, "Dealer Id can't be blank");
      chk = false;
    } else {
      this.setSuccess(dealerIdd);
    }
    if (panNo === "" || panNo === undefined) {
      this.setError(panNod, "Company Address can't be blank");
      chk = false;
    } else {
      this.setSuccess(panNod);
    }
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

    if (bankName === "" || bankName === undefined) {
      this.setError(bankNamed, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(bankNamed);
    }

    if (contactNo === "" || contactNo === undefined) {
      this.setError(contactNod, "This Field can't be blank");
      chk = false;
    }
    //  else if (!this.isMob(contactNo)) {
    //   this.setError(contactNod, "Enter valid mobile no.");
    //   chk = false;
    // }
    else {
      this.setSuccess(contactNod);
    }

    if (email === "" || email === undefined) {
      this.setError(emaild, "This Field can't be blank");
      chk = false;
    } else if (!this.isEmail(email)) {
      this.setError(emaild, "Enter valid Email Address");
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
    if (bankAc === "" || bankAc === undefined) {
      this.setError(bankAcd, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(bankAcd);
    }
    if (acType === "" || acType === undefined) {
      this.setError(acTyped, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(acTyped);
    }
    if (category === "" || category === undefined) {
      this.setError(categoryd, "This Field can't be blank");
      chk = false;
    } else {
      this.setSuccess(categoryd);
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

    if (
      (dpName === "" || dpName === undefined) &&
      (dpName_nsdl === "" || dpName_nsdl === undefined)
    ) {
      notification.error({ message: "Please select either of DP Name" });
      chk = false;
    } else {
      this.setSuccess(dpName_nsdld);
    }
    if (
      (dpId === "" || dpId === undefined) &&
      (dpId_nsdl === "" || dpId_nsdl === undefined)
    ) {
      // this.setError(dpidd, "This Field can't be blank");
      notification.error({ message: "Please select either of DPID" });
      chk = false;
    } else {
      this.setSuccess(dpid_nsdld);
    }
    // if (state === "" || state === undefined) {
    //   this.setError(stated, "This Field can't be blank");
    //   chk = false;
    // } else {
    //   this.setSuccess(stated);
    // }

    if (chk === true) {
      if (this.props.editFormData.length === 0) {
        this.addSharesCompany(
          buyerName,
          panNo,
          address,
          city,
          pincode,
          bankName,
          contactNo,
          email,
          cmnt1,
          bankAc,

          acType,
          category,
          ifscCode,
          branch,
          dpName,
          dpId,
          dpName_nsdl,
          dpId_nsdl,
          state,
          dealerId
        );
      } else {
        this.editSharesCompany(
          buyerName,
          panNo,
          address,
          city,
          pincode,
          bankName,
          contactNo,
          email,
          cmnt1,
          bankAc,
          acType,
          category,
          ifscCode,
          branch,
          dpName,
          dpId,
          dpName_nsdl,
          dpId_nsdl,
          state,
          dealerId
        );
      }
    }
  };

  addSharesCompany = (
    buyerName,
    panNo,
    address,
    city,
    pincode,
    bankName,
    contactNo,
    email,
    cmnt1,
    bankAc,
    acType,
    category,
    ifscCode,
    branch,
    dpName,
    dpId,
    dpName_nsdl,
    dpId_nsdl,
    state,
    dealerId
  ) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        buyerName: buyerName,
        panNo: panNo,
        address: address,
        city: city,
        pincode: pincode,
        bankName: bankName,
        contactNo: contactNo,
        email: email,
        cmnt1: cmnt1,
        bankAc: bankAc,
        acType: acType,
        category: category,
        ifscCode: ifscCode,
        branch: branch,
        dpName: dpName,
        dpid: dpId,
        dpName_nsdl: dpName_nsdl,
        dpid_nsdl: dpId_nsdl,
        state: state,
        dealerId: dealerId,
      }),
    };
    fetch(Api.api_route + "/customer/addCustomerforBilling", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Customer Added successfully !");
          this.props.fetchCustomerforBilling();
          this.props.scrollback();
          this.props.ThandleForm();
        } else {
          notification.error({ message: data.msg });
        }
      });

    // console.log("addSharesCompany");
  };
  editSharesCompany = (
    buyerName,
    panNo,
    address,
    city,
    pincode,
    bankName,
    contactNo,
    email,
    cmnt1,
    bankAc,
    acType,
    category,
    ifscCode,
    branch,
    dpName,
    dpId,
    dpName_nsdl,
    dpId_nsdl,
    state,
    dealerId
  ) => {
    // console.log(compName, compAdd, authPerson, contact, rtaName, rtaContactPerson, rtaMob, rtaLandline, rtaEmail);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.props.editFormData.id,
        buyerName: buyerName,
        panNo: panNo,
        address: address,
        city: city,
        pincode: pincode,
        bankName: bankName,
        contactNo: contactNo,
        email: email,
        cmnt1: cmnt1,
        bankAc: bankAc,
        acType: acType,
        category: category,
        ifscCode: ifscCode,
        branch: branch,
        dpName: dpName,
        dpid: dpId,
        dpName_nsdl: dpName_nsdl,
        dpid_nsdl: dpId_nsdl,
        state: state,
        dealerId: dealerId,
      }),
    };
    fetch(Api.api_route + "/customer/editCustomerforBilling", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.success("Customer Updated successfully !");
          this.props.fetchCustomerforBilling();
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
      fetch(API.api_route + "/bill/delete", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            message.success("customer Deleted successfully !");
            this.props.fetchCustomerforBilling();
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
    console.log(e.target.id, e.target.value);
    this.setState({
      [e.target.id]: e.target.value,
    });
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

  handleSelectField = (e, id) => {
    fetch(api_route + "/bill/updateTag/" + id + "/" + e.target.value, {
      method: "GET",
    }).then((res) => {
      console.log(res);
    });
  };

  render() {
    const dealer = [];
    this.state.dealerList.map((ele) =>
      dealer.push({
        id: `dealerId`,
        key: `${ele.id}`,
        label: `${ele.full_name}`,
        value: `${ele.full_name}`,
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
              title="Add / Edit Customer"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    {this.props.editFormData.length !== 0 && (
                      <FormGroup row>
                        <Label
                          htmlFor="example-search-input"
                          className="col-md-2 col-form-label"
                        >
                          Tag
                        </Label>
                        <Col md={10}>
                          <select
                            style={{ width: "90px" }}
                            id={"tag"}
                            className="form-control"
                            onChange={(e) =>
                              this.handleSelectField(
                                e,
                                this.props.editFormData.id
                              )
                            }
                            name="tag"
                          >
                            <option value="green">Select</option>
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="yellow">Yellow</option>
                          </select>

                          <span className="registration_input-msg"></span>
                        </Col>
                      </FormGroup>
                    )}
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Buyer Name
                      </Label>
                      <Col md={10}>
                        <Input
                          className="form-control"
                          onChange={this.handleFields}
                          placeholder="Buyer Name"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.buyerName}`
                          }
                          type="text"
                          id="buyerName"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="col-md-2 col-form-label">
                        Category
                      </Label>
                      <Col md={10}>
                        <select
                          onChange={this.handleFields}
                          id="category"
                          className="form-control"
                        >
                          <option>Retailer</option>
                          <option>Dealer</option>
                        </select>
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Pan No
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          className="form-control"
                          placeholder="Pan No"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.panNo}`
                          }
                          type="text"
                          style={{ textTransform: "uppercase" }}
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
                        Contact No.
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Contact"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.contactNo}`
                          }
                          className="form-control"
                          type="number"
                          id="contactNo"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Bank Name
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Bank Name"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.bankName}`
                          }
                          className="form-control"
                          type="text"
                          id="bankName"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Bank Account No.
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Bank Account"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.bankAc}`
                          }
                          className="form-control"
                          type="text"
                          id="bankAc"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Dealer
                      </Label>
                      <Col md={10}>
                        <Select
                          onChange={this.handleSelect}
                          // className="form-control"
                          // onBlur={this.props.fetchCustDetailsWithName}

                          type="text"
                          id="dealerId"
                          options={dealer}
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="col-md-2 col-form-label">
                        Account Type
                      </Label>
                      <Col md={10}>
                        <select
                          onChange={this.handleFields}
                          id="acType"
                          className="form-control"
                        >
                          <option>Select</option>
                          <option>Current</option>
                          <option>Savings</option>
                        </select>
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        IFSC Code
                      </Label>
                      <Col md={10}>
                        <Input
                          style={{ textTransform: "uppercase" }}
                          onChange={this.handleFields}
                          placeholder="IFSC Code"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.ifscCode}`
                          }
                          className="form-control"
                          type="text"
                          id="ifscCode"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Branch
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="Branch"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.branch}`
                          }
                          className="form-control"
                          type="text"
                          id="branch"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        DP Name (CDSL)
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="DP Name for CDSL"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.dpName}`
                          }
                          className="form-control"
                          type="text"
                          id="dpName"
                        />

                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        DPID / Client Id (CDSL)
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="DPID / Client Id for CDSL"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.dpid}`
                          }
                          className="form-control"
                          type="text"
                          id="dpid"
                        />

                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        DP Name (NSDL)
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="DP Name for NSDL"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.dpName_nsdl}`
                          }
                          className="form-control"
                          type="text"
                          id="dpName_nsdl"
                        />

                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        DPID / Client Id (NSDL)
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="DPID / Client Id for NSDL"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.dpid_nsdl}`
                          }
                          className="form-control"
                          type="text"
                          id="dpid_nsdl"
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
                        State
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleFields}
                          placeholder="State"
                          defaultValue={
                            this.props.editFormData.length === 0
                              ? ""
                              : `${this.props.editFormData.state}`
                          }
                          className="form-control"
                          type="text"
                          id="state"
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
                        Address Proof
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
                        Aadhar Doc
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
                        Cancelled Cheque / Bank Details
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.handleDocs}
                          placeholder="Cancelled Cheque/Bank Details"
                          className="form-control"
                          type="file"
                          id="CancelCheque"
                        />
                        <span className="registration_input-msg"></span>
                      </Col>
                    </FormGroup>
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

export default BillCustomerFormElements;
