import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Container,
  Button,
} from "reactstrap";
import Dropzone from "react-dropzone";
import "./FormUpload.css";
// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import API from "../../config/config";
import { Link } from "react-router-dom";
import { message, notification } from "antd";
import Select from "react-select";

class FormUpload extends Component {
  constructor(props) {
    super(props);
    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    this.state = {
      breadcrumbItems: [
        { title: "Forms", link: "#" },
        { title: "From Upload", link: "#" },
      ],
      selectedFiles: [],
      companies: [],
      companyName: "",
    };
  }

  handleChange = (e) => {
    console.log(e.id, e.value);
    this.setState({
      [e.id]: e.value,
    });
  };
  componentDidMount() {
    this.fetchCompany();
  }

  fetchCompany = () => {
    fetch(API.api_route + "/analytics/fetchCompanies")
      .then((response) => response.json())
      .then((json) => this.setState({ companies: json }));
  };

  csvUpload = () => {
    if (this.state.selectedFiles.length !== 0) {
      if (this.state.selectedFiles[0].name.slice(-3) !== "csv") {
        console.log("please upload CSV only");
      } else {
        console.log(this.state.selectedFiles[0]);
        // console.log(e.target.files[0]);
        var data = new FormData();
        data.append("file", this.state.selectedFiles[0]);
        data.append("company_name", this.state.companyName);

        const requestOptions = {
          method: "POST",
          // headers: { "Content-Type": "application/json" },
          body: data,
        };
        fetch("http://18.212.243.177:8080/api/upload/", requestOptions)
          // .then((response) => response.text())
          .then((data) => {
            if (data.status !== 200) {
              notification.error({ message: data.statusText });
            } else if (data.status === 200) {
              data
                .text()
                .then((daa) =>
                  message.success(`csv has been uploaded with ${daa}`)
                );
            }
            // console.log(data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      notification.error({ message: "Make sure a file is uploaded" });
      console.log("Make sure a file is uploaded");
    }
  };

  handleAcceptedFiles = (files) => {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size),
      })
    );

    this.setState({ selectedFiles: files });
  };

  /**
   * Formats the size
   */
  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  render() {
    const compNames = [];
    this.state.companies.map((company) =>
      compNames.push({
        id: `companyName`,
        label: `${company.companyName}`,
        value: `${company.companyName}`,
      })
    );

    return (
      <React.Fragment>
        <div className="page-content">
          {/* <form
          // method="post"
          // action={API.api_route + "/api/upload"}
          // enctype="multipart/form-data"
          // onSubmit={this.csvUpload}
          >
            Upload a csv file:{" "}
            <input
              type="file"
              accept=".csv"
              onChange={(event) => {
                const file = event.target.files[0];
                this.csvUpload(file);
              }}
              name="file"
            />
            <input type="submit" value="Upload" />
          </form> */}

          <Container fluid={true}>
            <Breadcrumbs
              title="Form Upload"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    <CardTitle>Dropzone</CardTitle>
                    {/* <FormGroup row>
                      <Label className="col-md-2 col-form-label">
                        Company Name
                      </Label>
                      <Col md={10}>
                        <select
                          id="companyName"
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option>Select</option>
                          {this.state.companies.map((item, i) => (
                            <option> {item.companyName} </option>
                          ))}
                        </select>
                        
                      </Col>
                    </FormGroup> */}
                    <FormGroup row>
                      <Label
                        className="col-md-2 col-form-label"
                        htmlFor="select"
                      >
                        Company Name
                      </Label>
                      <Col md={10}>
                        <Select
                          options={compNames}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </FormGroup>
                    <Form>
                      <Dropzone
                        onDrop={(acceptedFiles) =>
                          this.handleAcceptedFiles(acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick mt-2"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <div className="mb-3">
                                <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                              <h5>Fields Required...</h5>
                              <div className="csvUpload container">
                                <ul>
                                  <li>Folio No.,</li>

                                  <li>Name,</li>

                                  <li>Address,</li>

                                  <li>City,</li>

                                  <li>Pincode,</li>

                                  <li>Quantity,</li>

                                  <li>Contact Details,</li>

                                  <li>Email ID,</li>

                                  <li>Comment 1,</li>

                                  <li>Case Type,</li>

                                  <li>Our Quote,</li>

                                  <li>Party Price,</li>

                                  <li> Followed By,</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                      >
                        {this.state.selectedFiles.map((f, i) => {
                          return (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </Form>

                    <div className="text-center mt-4">
                      <Button
                        onClick={this.csvUpload}
                        color="primary"
                        type="button"
                        className="waves-effect waves-light"
                      >
                        Send Files
                      </Button>
                    </div>
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

export default FormUpload;
