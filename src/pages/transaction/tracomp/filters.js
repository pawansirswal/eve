import React, { Component } from "react";
import API from "../../../config/config";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  CustomInput,
  InputGroup,
  Form,
  InputGroupAddon,
} from "reactstrap";
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import Select from "react-select";

//Import Breadcrumb
// import Breadcrumbs from '../../components/Common/Breadcrumb';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "Form Validation", link: "#" },
      ],
      fnm: false,
      lnm: false,
      unm: false,
      city: false,
      stateV: false,
      companies: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandeler.bind(this);
  }

  componentDidMount() {
    fetch(API.api_route + "/analytics/fetchCompanies")
      .then((response) => response.json())
      .then((json) => this.setState({ companies: json }));
  }

  handleSubmit(e) {
    e.preventDefault();
    var fnm = document.getElementById("validationTooltip01").value;
    var lnm = document.getElementById("validationTooltip02").value;
    var unm = document.getElementById("validationTooltipUsername").value;
    var city = document.getElementById("validationTooltip03").value;
    var stateV = document.getElementById("validationTooltip04").value;
    document.getElementById("tooltipForm").classList.add("was-validated");

    if (fnm === "") {
      this.setState({ fnm: false });
    } else {
      this.setState({ fnm: true });
    }

    if (lnm === "") {
      this.setState({ lnm: false });
    } else {
      this.setState({ lnm: true });
    }

    if (unm === "") {
      this.setState({ unm: false });
    } else {
      this.setState({ unm: true });
    }

    if (city === "") {
      this.setState({ city: false });
    } else {
      this.setState({ city: true });
    }

    if (stateV === "") {
      this.setState({ stateV: false });
    } else {
      this.setState({ stateV: true });
    }

    var d1 = document.getElementsByName("validate");

    for (var i = 0; i < d1.length; i++) {
      d1[i].style.display = "block";
    }
  }

  //for change tooltip display propery
  changeHandeler(event, eleId) {
    if (event.target.value !== "")
      document.getElementById(eleId).style.display = "none";
    else document.getElementById(eleId).style.display = "block";
  }

  render() {
    const compNames = [];
    this.state.companies.map((company) =>
      compNames.push({
        id: `company`,
        label: `${company.companyName}`,
        value: `${company.companyName}`,
      })
    );
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            {/* <Breadcrumbs title="Form Validation" breadcrumbItems={this.state.breadcrumbItems} /> */}
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="select">Select Company</Label>
                  <Col>
                    <Select
                      options={compNames}
                      onChange={this.props.handleSelect}
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label htmlFor="validationCustom03">
                    Shares Quantity from
                  </Label>
                  <input
                    name="city"
                    onChange={this.props.handleFields}
                    placeholder="from"
                    type="text"
                    errorMessage=" Please provide a valid city."
                    className="form-control"
                    validate={{ required: { value: true } }}
                    id="from"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label htmlFor="validationCustom04">Shares Quantity to</Label>
                  <input
                    name="state"
                    placeholder="to"
                    onChange={this.props.handleFields}
                    type="text"
                    errorMessage="Please provide a valid state."
                    className="form-control"
                    validate={{ required: { value: true } }}
                    id="to"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="select">City</Label>
                  <Col>
                    <input
                      name="city"
                      onChange={this.props.handleFields}
                      placeholder="City"
                      type="text"
                      errorMessage=" Please provide a valid city."
                      className="form-control"
                      validate={{ required: { value: true } }}
                      id="city"
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label htmlFor="validationCustom03">Pincode</Label>
                  <input
                    name="city"
                    onChange={this.props.handleFields}
                    placeholder="Pincode"
                    type="text"
                    errorMessage=" Please provide a valid city."
                    className="form-control"
                    validate={{ required: { value: true } }}
                    id="pincode"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label htmlFor="validationCustom04">Case Type</Label>
                  <input
                    name="state"
                    placeholder="Case Type"
                    onChange={this.props.handleFields}
                    type="text"
                    errorMessage="Please provide a valid state."
                    className="form-control"
                    validate={{ required: { value: true } }}
                    id="caseType"
                  />
                </FormGroup>
              </Col>

              {/* </AvForm> */}
              {/* </CardBody> */}
              {/* </div>  */}
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="select">Quote</Label>
                  <Col>
                    <input
                      name="city"
                      onChange={this.props.handleFields}
                      placeholder="Quote"
                      type="text"
                      errorMessage=" Please provide a valid city."
                      className="form-control"
                      validate={{ required: { value: true } }}
                      id="quote"
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label htmlFor="validationCustom03">Party Price</Label>
                  <input
                    name="city"
                    onChange={this.props.handleFields}
                    placeholder="Party Price"
                    type="text"
                    errorMessage=" Please provide a valid city."
                    className="form-control"
                    validate={{ required: { value: true } }}
                    id="partyPrice"
                  />
                </FormGroup>
              </Col>
              <Col>
                <Label htmlFor="validationCustom03">Send Email?</Label>
                <select
                  onChange={this.props.handleFields}
                  id="sendEmail"
                  className="form-control"
                >
                  <option> Select </option>
                  <option> Yes </option>
                  <option> No </option>
                </select>
              </Col>
            </Row>
            <Row>
              <Button
                style={{ height: "38px", position: "absolute", right: "25px" }}
                onClick={this.props.filterTable}
                color="primary"
                type="submit"
              >
                Submit form
              </Button>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Filter;
