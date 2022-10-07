import React, { Component } from "react";
import {
  Col,
  Card,
  CardBody,
  Media,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import API, { api_route } from "../../config/config";
import { Link } from "react-router-dom";

class MiniWidgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initGenData: [],
      allGenerators: [],
      loadData: false,
      tableData: [],
      isLoading: true,
      modal_large: false,
      isLoadingflm: true,
      analyt: [],
      genData: [],
      mon: "1",
      months: [
        "month",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
    this.tog_large = this.tog_large.bind(this);
  }
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  tog_large() {
    this.setState((prevState) => ({
      modal_large: !prevState.modal_large,
    }));
    this.removeBodyCss();
  }
  componentDidMount() {
    const d = new Date();
    let month = d.getMonth();
    let val = month + 1;
    this.setState({
      mon: val,
    });
    fetch(API.api_route + "/firm/fetchCount")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({ tableData: json, isLoading: false });
      });
    fetch(API.api_route + "/firm/getCountofTrans")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({ analyt: json, isLoadingflm: false });
      });
    fetch(API.api_route + "/firm/generatorData")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.filterData(json);
      });

    this.getGenerators();
  }

  getGenerators = () => {
    fetch(API.api_route + "/firm/getGenerators")
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          allGenerators: json,
        });

        json.map((itm) => {
          this.setState({
            [itm.generator]: [
              {
                amount: 0,
                cnt: 0,
                transactionType: "sell",
              },
              {
                amount: 0,
                cnt: 0,
                transactionType: "buy",
              },
            ],
          });

          this.handleBillsAna(this.state.mon, itm.generator);
        });
        // setTimeout(() => {
        //   this.setState({
        //     loadData: true,
        //   });
        // }, 5000);
        // this.handleBillsAna(this.state.mon, "manishMittal");
        // this.handleBillsAna(this.state.mon, "jyoti");
      });
  };

  filterData = (arr) => {
    let result = arr.reduce(function (r, a) {
      r[a.gen] = r[a.gen] || [];
      r[a.gen].push(a);
      return r;
    }, Object.create(null));
    console.log(result);
    this.setState({ genData: result, isLoadingflm: false });
  };

  handleBillsAna = (value, generator) => {
    console.log(this.state);
    fetch(
      api_route + "/firm/generatorDataBymonth/" + generator + "/" + value
    ).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          if (data.length != 0) {
            this.setState({
              [generator]: data,
            });
            console.log(data);
          } else {
            this.setState({
              [generator]: [
                {
                  amount: 0,
                  cnt: 0,
                  transactionType: "sell",
                },
                {
                  amount: 0,
                  cnt: 0,
                  transactionType: "buy",
                },
              ],
            });
          }
        });
      }
    });
  };
  inithandleBillsAna = () => {
    fetch(api_route + "/firm/initgeneratorDataBymonth/" + this.state.mon).then(
      (res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            if (data.length != 0) {
              // this.setState({
              //   initGenData: data,
              // });
              // this.filterInitData(data);
            } else {
            }
          });
        }
      }
    );
  };

  render() {
    function capitalizeFirstLetter(str) {
      // converting first letter to uppercase
      const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

      return capitalized;
    }
    if (this.state.isLoading || this.state.isLoadingflm) {
      return (
        <React.Fragment>
          {/* {this.props.reports.map((report, key) => ( */}
          <Col key={1} md={4}>
            <Card>
              <CardBody>
                <Media>
                  <Media body className="overflow-hidden">
                    <p className="text-truncate font-size-14 mb-2">
                      {"Total Firms"}
                    </p>
                    <h4 className="mb-0">
                      <div class="d-flex justify-content-center">
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    </h4>
                  </Media>
                  <div className="text-primary">
                    <i className={"ri-stack-line font-size-24"}></i>
                  </div>
                </Media>
              </CardBody>

              <Modal
                size="lg"
                isOpen={this.state.modal_large}
                toggle={this.tog_large}
              >
                <ModalHeader
                  toggle={() => this.setState({ modal_large: false })}
                >
                  Modal Header{" "}
                </ModalHeader>
                <ModalBody>
                  <p>body</p>
                </ModalBody>
              </Modal>

              <CardBody className="border-top py-3">
                <div className="text-truncate">
                  <span className="badge badge-soft-success font-size-11 mr-1">
                    <i className="mdi mdi-menu-up"> </i> {""}
                  </span>
                  <span className="text-muted ml-2">{""}</span>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col key={2} md={4}>
            <Card>
              <CardBody>
                <Media>
                  <Media body className="overflow-hidden">
                    <p className="text-truncate font-size-14 mb-2">
                      {"Total Firms"}
                    </p>
                    <h4 className="mb-0">
                      <div class="d-flex justify-content-center">
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    </h4>
                  </Media>
                  <div className="text-primary">
                    <i className={"ri-stack-line font-size-24"}></i>
                  </div>
                </Media>
              </CardBody>

              <CardBody className="border-top py-3">
                <div className="text-truncate">
                  <span className="badge badge-soft-success font-size-11 mr-1">
                    <i className="mdi mdi-menu-up"> </i> {""}
                  </span>
                  <span className="text-muted ml-2">{""}</span>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col key={3} md={4}>
            <Card>
              <CardBody>
                <Media>
                  <Media body className="overflow-hidden">
                    <p className="text-truncate font-size-14 mb-2">
                      {"Total Firms"}
                    </p>
                    <h4 className="mb-0">
                      <div class="d-flex justify-content-center">
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    </h4>
                  </Media>
                  <div className="text-primary">
                    <i className={"ri-stack-line font-size-24"}></i>
                  </div>
                </Media>
              </CardBody>

              <CardBody className="border-top py-3">
                <div className="text-truncate">
                  <span className="badge badge-soft-success font-size-11 mr-1">
                    <i className="mdi mdi-menu-up"> </i> {""}
                  </span>
                  <span className="text-muted ml-2">{""}</span>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col key={3} md={4}>
            <Card>
              <CardBody>
                <Media>
                  <Media body className="overflow-hidden">
                    <p className="text-truncate font-size-14 mb-2">
                      {"Total Bills Generated"}
                    </p>
                    <h4 className="mb-0">
                      <div class="d-flex justify-content-center">
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    </h4>
                  </Media>
                  <div className="text-primary">
                    <i className={"ri-stack-line font-size-24"}></i>
                  </div>
                </Media>
              </CardBody>

              <CardBody className="border-top py-3">
                <div className="text-truncate">
                  <span className="badge badge-soft-success font-size-11 mr-1">
                    <i className="mdi mdi-menu-up"> </i> {""}
                  </span>
                  <span className="text-muted ml-2">{""}</span>
                </div>
              </CardBody>
            </Card>
          </Col>

          {/* // ))} */}
        </React.Fragment>
      );
    } else {
      // console.log(
      //   this.state.manishMittal != undefined &&
      //     this.state["manishMittal"][0].amount
      // );
      return (
        <React.Fragment>
          {/* {this.props.reports.map((report, key) => ( */}
          <Col key={1} md={4}>
            <Link to="/Firm-master">
              <Card>
                <CardBody>
                  <Media>
                    <Media body className="overflow-hidden">
                      <p className="text-truncate font-size-14 mb-2">
                        {"Total Firms"}
                      </p>
                      <h4 className="mb-0">
                        {this.state.tableData[0].countFirm}
                      </h4>
                    </Media>
                    <div className="text-primary">
                      <i className={"ri-stack-line font-size-24"}></i>
                    </div>
                  </Media>
                </CardBody>

                <CardBody className="border-top py-3">
                  <div className="text-truncate">
                    <span className="badge badge-soft-success font-size-11 mr-1">
                      <i className="mdi mdi-menu-up"> </i> {""}
                    </span>
                    <span className="text-muted ml-2">{""}</span>
                  </div>
                </CardBody>
              </Card>
            </Link>
          </Col>
          <Col key={2} md={4}>
            <Link to="/Party-details-master">
              <Card>
                <CardBody>
                  <Media>
                    <Media body className="overflow-hidden">
                      <p className="text-truncate font-size-14 mb-2">
                        {"Total Customers"}
                      </p>
                      <h4 className="mb-0">
                        {this.state.tableData[0].countCustomer}
                      </h4>
                    </Media>
                    <div className="text-primary">
                      <i className={"ri-stack-line font-size-24"}></i>
                    </div>
                  </Media>
                </CardBody>

                <CardBody className="border-top py-3">
                  <div className="text-truncate">
                    <span className="badge badge-soft-success font-size-11 mr-1">
                      <i className="mdi mdi-menu-up"> </i> {""}
                    </span>
                    <span className="text-muted ml-2">{""}</span>
                  </div>
                </CardBody>
              </Card>
            </Link>
          </Col>
          <Col key={3} md={4}>
            <Link to="/Share-comp-master">
              <Card>
                <CardBody>
                  <Media>
                    <Media body className="overflow-hidden">
                      <p className="text-truncate font-size-14 mb-2">
                        {"Total Shares Companies"}
                      </p>
                      <h4 className="mb-0">
                        {this.state.tableData[0].countShares}
                      </h4>
                    </Media>
                    <div className="text-primary">
                      <i className={"ri-stack-line font-size-24"}></i>
                    </div>
                  </Media>
                </CardBody>

                <CardBody className="border-top py-3">
                  <div className="text-truncate">
                    <span className="badge badge-soft-success font-size-11 mr-1">
                      <i className="mdi mdi-menu-up"> </i> {""}
                    </span>
                    <span className="text-muted ml-2">{""}</span>
                  </div>
                </CardBody>
              </Card>
            </Link>
          </Col>
          {/* <Col key={3} md={4}>
            <Link to="/">
              <Card>
                <CardBody>
                  <Media>
                    <Media body className="overflow-hidden">
                      <p className="text-truncate font-size-14 mb-2">
                        {"Bill Generator Data"}
                      </p>
                      <h4 className="mb-0">
                        {this.state.genData.map((itm) => (
                          <div>
                            {itm.generator === null ? "No User" : itm.generator}{" "}
                            : {itm.count}
                          </div>
                        ))}
                      </h4>
                    </Media>
                    <div className="text-primary">
                      <i className={"ri-stack-line font-size-24"}></i>
                    </div>
                  </Media>
                </CardBody>

                <CardBody className="border-top py-3">
                  <div className="text-truncate">
                    <span className="badge badge-soft-success font-size-11 mr-1">
                      <i className="mdi mdi-menu-up"> </i> {""}
                    </span>
                    <span className="text-muted ml-2">{""}</span>
                  </div>
                </CardBody>
              </Card>
            </Link>
          </Col> */}

          <Col key={4} md={4}>
            <Link to="/">
              <Card>
                <CardBody>
                  <Media>
                    <Media body className="overflow-hidden">
                      <p className="text-truncate font-size-14 mb-2">
                        {"Total Bill Generated"}
                      </p>
                      <h4 className="mb-0">
                        Total : {this.state.tableData[0].transHistory}
                        {this.state.analyt.map((itm) => (
                          <div
                          //   style={{
                          //     display: "flex",
                          //     justifyContent: "space-between",
                          //   }}
                          // >
                          //   <div>{itm.month}</div>
                          //   <div>{itm.cnt}</div>
                          >
                            {this.state.months[itm.month]} : {itm.cnt}
                          </div>
                        ))}
                      </h4>
                    </Media>
                    <div className="text-primary">
                      <i className={"ri-stack-line font-size-24"}></i>
                    </div>
                  </Media>
                </CardBody>

                <CardBody className="border-top py-3">
                  <div className="text-truncate">
                    <span className="badge badge-soft-success font-size-11 mr-1">
                      <i className="mdi mdi-menu-up"> </i> {""}
                    </span>
                    <span className="text-muted ml-2">{""}</span>
                  </div>
                </CardBody>
              </Card>
            </Link>
          </Col>
          {this.state.manishMittal == undefined ? (
            <Col key={4} md={4}>
              <Card>
                <CardBody>
                  <Media>
                    <Media body className="overflow-hidden">
                      <p className="text-truncate font-size-14 mb-2">
                        {"Bill Generated by"}
                      </p>
                      <div>
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </div>
                    </Media>
                    <div className="text-primary">
                      <i className={"ri-stack-line font-size-24"}></i>
                    </div>
                  </Media>
                </CardBody>

                <CardBody className="border-top py-3">
                  <div className="text-truncate">
                    <span className="badge badge-soft-success font-size-11 mr-1">
                      <i className="mdi mdi-menu-up"> </i> {""}
                    </span>
                    <span className="text-muted ml-2">{""}</span>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ) : (
            this.state.manishMittal != undefined &&
            this.state.allGenerators.map((itm) => (
              <Col key={4} md={4}>
                <Card>
                  <div className="float-right">
                    <select
                      onChange={(e) =>
                        this.handleBillsAna(e.target.value, itm.generator)
                      }
                      className="custom-select custom-select-sm"
                    >
                      <option value="12" selected={this.state.mon == "12"}>
                        Dec
                      </option>
                      <option value="11" selected={this.state.mon == "11"}>
                        Nov
                      </option>
                      <option value="10" selected={this.state.mon == "10"}>
                        Oct
                      </option>
                      <option value="9" selected={this.state.mon == "9"}>
                        Sep
                      </option>
                      <option value="8" selected={this.state.mon == "8"}>
                        Aug
                      </option>
                      <option value="7" selected={this.state.mon == "7"}>
                        Jul
                      </option>
                      <option value="6" selected={this.state.mon == "6"}>
                        Jun
                      </option>
                      <option value="5" selected={this.state.mon == "5"}>
                        May
                      </option>
                      <option value="4" selected={this.state.mon == "4"}>
                        Apr
                      </option>
                      <option value="3" selected={this.state.mon == "3"}>
                        Mar
                      </option>
                      <option value="2" selected={this.state.mon == "2"}>
                        Feb
                      </option>
                      <option value="1" selected={this.state.mon == "1"}>
                        Jan
                      </option>
                    </select>
                  </div>
                  <CardBody>
                    <Media>
                      <Media body className="overflow-hidden">
                        <p className="text-truncate font-size-14 mb-2">
                          {"Bill Generated by"}
                        </p>
                        <div>
                          <h3 style={{ textTransform: "capitalize" }}>
                            {itm.generator == null ? "No User" : itm.generator}{" "}
                          </h3>
                          {/* <div className="table-responsive"> */}
                          {this.state[`${itm.generator}`] != undefined && (
                            <table className="table table-bordered">
                              <thead>
                                <th></th>
                                <th>
                                  {this.state[`${itm.generator}`][0]
                                    .transactionType != undefined
                                    ? this.state[`${itm.generator}`][0]
                                        .transactionType
                                    : "-"}
                                </th>
                                <th>
                                  {this.state[`${itm.generator}`][1] !=
                                  undefined
                                    ? this.state[`${itm.generator}`][1]
                                        .transactionType
                                    : "-"}
                                </th>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>No.</td>
                                  <td>
                                    {this.state[`${itm.generator}`] != undefined
                                      ? this.state[`${itm.generator}`][0].cnt
                                      : 0}
                                  </td>
                                  <td>
                                    {this.state[`${itm.generator}`] !=
                                      undefined &&
                                    this.state[`${itm.generator}`].length > 1
                                      ? this.state[`${itm.generator}`][1].cnt
                                      : 0}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Amt</td>
                                  <td>
                                    {this.state[`${itm.generator}`] != undefined
                                      ? this.state[`${itm.generator}`][0].amount
                                      : 0}
                                  </td>
                                  <td>
                                    {this.state[`${itm.generator}`] !=
                                      undefined &&
                                    this.state[`${itm.generator}`].length > 1
                                      ? this.state[`${itm.generator}`][1].amount
                                      : 0}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}

                          {/* </div> */}
                        </div>
                      </Media>
                      <div className="text-primary">
                        <a>
                          {" "}
                          <i
                            className={"ri-stack-line font-size-24"}
                            onClick={() => {
                              this.tog_large();
                            }}
                          ></i>{" "}
                        </a>
                      </div>
                    </Media>
                  </CardBody>

                  <CardBody className="border-top py-3">
                    <div className="text-truncate">
                      <span className="badge badge-soft-success font-size-11 mr-1">
                        <i className="mdi mdi-menu-up"> </i> {""}
                      </span>
                      <span className="text-muted ml-2">{""}</span>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))
          )}

          {/* // ))} */}
        </React.Fragment>
      );
    }
  }
}

export default MiniWidgets;
