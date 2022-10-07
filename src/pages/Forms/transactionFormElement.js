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
  // CustomInput,
} from "reactstrap";
import Select from "react-select";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import API from "../../config/config";
import { notification } from "antd";

class TransactionFormElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Billing", link: "#" },
        { title: "Billing Form", link: "#" },
      ],
      customchk: true,
      toggleSwitch: true,
      companies: [],
      firms: [],
      loader: false,
      custNames: [],
      today: "",
      commision: 0,
      dtypes: [],
    };
  }

  componentDidMount() {
    this.fetchCompany();
    this.fetchFirm();
    this.fetchCustNames();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    this.setState({
      today: yyyy + "-" + mm + "-" + dd,
    });
  }

  fetchCompany = () => {
    fetch(API.api_route + "/analytics/fetchCompanies")
      .then((response) => response.json())
      .then((json) => this.setState({ companies: json }))
      .catch((e) => {
        console.log(e);
        notification.error({ message: "error" });
      });
  };

  fetchFirm = () => {
    fetch(API.api_route + "/analytics/fetchFirmwithDemat")
      .then((response) => response.json())
      .then((json) => this.setState({ firms: json }))
      .catch((e) => {
        console.log(e);
        notification.error({ message: "error" });
      });
  };

  fetchCustNames = () => {
    fetch(API.api_route + "/analytics/fetchCustNames")
      .then((response) => response.json())
      .then((json) => this.setState({ custNames: json }))
      .catch((e) => {
        console.log(e);
        notification.error({ message: "error" });
      });
  };

  handleFields = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  calculateComm = () => {
    let comm =
      (parseInt(this.props.userPrice) - parseInt(this.props.dealerPrice)) *
      this.props.qty;
    console.log("hello", comm);
    this.setState({
      commision: comm,
    });
  };

  render() {
    const names = [];
    this.state.custNames.map((name) =>
      names.push({
        id: `name`,
        key: `${name.dealerId}`,
        label: `${name.buyerName}`,
        value: `${name.buyerName}`,
      })
    );

    const firmNames = [];
    this.state.firms.map((firm) =>
      firmNames.push({
        id: `otherParty`,
        label: `${firm.firmName}`,
        value: `${firm.firmName}`,
      })
    );

    const compNames = [];
    this.state.companies.map((company) =>
      compNames.push({
        id: `companyName`,
        label: `${company.companyName}`,
        value: `${company.companyName}`,
      })
    );

    const dTypes = [
      { id: `dtype`, label: `CDSL`, value: `CDSL` },
      { id: `dtype`, label: `NSDL`, value: `NSDL` },
    ];

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Billing Form"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    <FormGroup row>
                      <Label className="col-md-2 col-form-label">
                        Transaction Type
                      </Label>
                      <Col md={10}>
                        <select
                          onChange={this.props.handleChange}
                          id="tranType"
                          className="form-control"
                        >
                          <option>Select</option>
                          <option>buy</option>
                          <option>sell</option>
                        </select>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label className="col-md-2 col-form-label">
                        Company Name
                      </Label>
                      <Col md={10}>
                        <Select
                          options={compNames}
                          onChange={this.props.handleSelect}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label
                        htmlFor="example-email-input"
                        className="col-md-2 col-form-label"
                      >
                        Name
                      </Label>
                      <Col md={10}>
                        {/* <Input
                          onChange={this.props.handleChange}
                          className="form-control"
                          onBlur={this.props.fetchCustDetailsWithName}
                          type="text"
                          defaultValue={
                            this.props.custDetails.length !== 0
                              ? this.props.custDetails[0].buyerName
                              : ""
                          }
                          id="name"
                        /> */}

                        <Select
                          onChange={this.props.handleSelect}
                          // className="form-control"
                          // onBlur={this.props.fetchCustDetailsWithName}
                          type="text"
                          defaultValue={
                            this.props.custDetails.length !== 0
                              ? this.props.custDetails[0].buyerName
                              : ""
                          }
                          id="name"
                          options={names}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label className="col-md-2 col-form-label">
                        Demat type
                      </Label>
                      <Col md={10}>
                        <Select
                          options={this.props.dtypes}
                          onChange={this.props.handleSelect}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Phone Number
                      </Label>
                      <Col md={10}>
                        <Input
                          // onChange={this.props.handleChange}
                          // onBlur={this.props.fetchCustDetails}
                          className="form-control"
                          defaultValue={
                            this.props.custDetails.length !== 0
                              ? this.props.custDetails[0].contactNo
                              : ""
                          }
                          disabled="true"
                          style={{ textTransform: "uppercase" }}
                          type="text"
                          id="phn"
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Pan No.
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.props.handleChange}
                          // onBlur={this.props.fetchCustDetails}
                          className="form-control"
                          defaultValue={
                            this.props.custDetails.length !== 0
                              ? this.props.custDetails[0].panNo
                              : ""
                          }
                          style={{ textTransform: "uppercase" }}
                          type="text"
                          id="panNo"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-url-input"
                        className="col-md-2 col-form-label"
                      >
                        Execution Date
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.props.handleChange}
                          className="form-control"
                          type="date"
                          defaultValue={this.state.today}
                          placeholder="yyyy-mm-dd"
                          id="executionDate"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-tel-input"
                        className="col-md-2 col-form-label"
                      >
                        Quantity
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.props.handleChange}
                          onBlur={this.props.fetchSettlementAmount}
                          className="form-control"
                          type="number"
                          defaultValue=""
                          id="qty"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-password-input"
                        className="col-md-2 col-form-label"
                      >
                        Rate Per Share
                      </Label>
                      <Col md={10}>
                        <Input
                          onBlur={this.props.fetchSettlementAmount}
                          onChange={this.props.handleChange}
                          className="form-control"
                          type="number"
                          defaultValue=""
                          id="rps"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-number-input"
                        className="col-md-2 col-form-label"
                      >
                        Settlement Amount
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.props.handleChange}
                          className="form-control"
                          type="number"
                          defaultValue={
                            this.props.isSetAmt
                              ? Math.round(this.props.settAmount)
                              : ""
                          }
                          id="settlementAmount"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-number-input"
                        className="col-md-2 col-form-label"
                      >
                        Customer Price
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.props.handleChange}
                          className="form-control"
                          type="number"
                          id="userPrice"
                          onBlur={this.props.fetchComm}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-number-input"
                        className="col-md-2 col-form-label"
                      >
                        Dealer Price
                      </Label>
                      <Col md={10}>
                        <Input
                          onChange={this.props.handleChange}
                          className="form-control"
                          type="number"
                          id="dealerPrice"
                          onBlur={this.props.fetchComm}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        htmlFor="example-number-input"
                        className="col-md-2 col-form-label"
                      >
                        Commision
                      </Label>
                      <Col md={10}>
                        <Input
                          defaultValue={
                            this.props.isSetComm
                              ? this.props.commision.toFixed(2)
                              : ""
                          }
                          className="form-control"
                          type="number"
                          id="commision"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="col-md-2 col-form-label">
                        Mode of Delivery
                      </Label>
                      <Col md={10}>
                        <select
                          className="form-control"
                          onChange={this.props.handleChange}
                          id="mod"
                          disabled={true}
                        >
                          <option>Demat</option>
                          <option>Demat</option>
                          <option>Physical</option>
                        </select>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="col-md-2 col-form-label">
                        Bill Generation Party
                      </Label>
                      <Col md={10}>
                        {/* <select
                          id="otherParty"
                          className="form-control"
                          onChange={this.props.handleChange}
                        >
                          <option>Select</option>
                          {this.state.firms.map((item, i) => (
                            <option> {item.firmName} </option>
                          ))}
                        </select> */}
                        <Select
                          style={{ padding: "20px" }}
                          options={firmNames}
                          onChange={this.props.handleSelect}
                        />
                      </Col>
                    </FormGroup>
                  </CardBody>
                </Card>
                <button
                  onClick={this.props.generateBill}
                  className="btn btn-primary btn-sm"
                  disabled={this.props.loader}
                >
                  {this.props.loader ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    `Generate and Download Bill`
                  )}
                </button>{" "}
                {/* <input
                  type="checkbox"
                  onClick={() => {
                    this.props.toggleNode();
                  }}
                  data-toggle="toggle"
                /> */}
                {/* <button
                  style={{
                    display: `${
                      this.props.btnVisible ? "inline-block" : "none"
                    }`,
                  }}
                  onClick={this.props.createAndDownloadPdf}
                  className="btn btn-primary btn-sm"
                >
                  Download Bill 
                </button>{" "}*/}
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default TransactionFormElements;
