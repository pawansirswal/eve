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
import "./csvUploadforNewletter.css";
// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import API from "../../config/config";
import { Link } from "react-router-dom";
import { message, notification } from "antd";
import imageCompression from "browser-image-compression";
import Select from "react-select";
import Modall from "./modall";

class PostcardBackUpload extends Component {
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
      loader: false,
    };
  }

  componentDidMount() {
    fetch(API.api_route + "/analytics/fetchCompanies")
      .then((response) => response.json())
      .then((json) => this.setState({ companies: json }));
  }

  handleChange = (e) => {
    console.log(e.id, e.value);
    this.setState({
      [e.id]: e.value,
    });
  };

  csvUpload = () => {
    this.setState({
      loader: true,
    });
    if (this.state.selectedFiles.length !== 0) {
      if (this.state.selectedFiles[0].name.slice(-3) !== "csv" && false) {
        console.log("please upload CSV only");
        notification.error({ message: "please upload CSV only" });
      } else {
        console.log(this.state.selectedFiles[0]);

        var imageFile = this.state.selectedFiles[0];

        console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        var options = {
          maxSizeMB: 1,
          maxWidth: 491,
          maxHeight: 299,
          useWebWorker: true,
        };
        var that = this;
        imageCompression(imageFile, options)
          .then(function (compressedFile) {
            console.log("compressedFile instanceof Blob", compressedFile); // true
            var fileName = that.state.companyName.replace(
              /[^A-Za-z0-9_]/gi,
              "_"
            );
            var file = new File([compressedFile], fileName);
            console.log(file);
            console.log(
              `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
            ); // smaller than maxSizeMB
            var data = new FormData();
            data.append("file", file);

            fetch(API.api_route + "/aws/uploadpttoawss3", {
              method: "POST",
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
              body: data,
            }).then((res) => {
              console.log("aws", res);
              if (res.status === 200) {
                message.success("Template Uploaded!!!");
                that.setState({
                  loader: false,
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
                                    {/* <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    /> */}
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
                        {this.state.loader ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          `Send File`
                        )}
                      </Button>
                      {this.state.selectedFiles[0] === undefined ? (
                        <div></div>
                      ) : (
                        <Modall
                          btnTitle="Preview"
                          imgSrc={
                            this.state.selectedFiles[0] === undefined
                              ? "error.jpg"
                              : this.state.selectedFiles[0].preview
                          }
                        />
                      )}
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

export default PostcardBackUpload;
