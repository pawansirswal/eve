import React, { Component, useParams } from "react";
import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Card,
  CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import API from "../../config/config";
import { notification, message } from "antd";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

class ViewTableBillingComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      firmName: "",
    };
  }

  componentWillMount() {
    this.setState({
      firmName: this.props.location.pathname.slice(17),
    });
  }

  handleView = (filename) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firmName: this.state.firmName,
        filename: filename,
      }),
    };
    fetch(API.api_route + "/aws/retreivefromawss3forBilling", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (false) {
            notification.error({ message: "No such file is saved " });
          } else {
            message.success("file retreive successfully !");
            window.open(data.url);
            console.log(data.url);
          }
        } else {
          notification.error({
            message: "No such file is saved, kindly upload the file first",
          });
        }
      });
  };

  render() {
    // const expandRow = {
    //   renderer: (row) => (
    //     <>
    //       Action :
    //       <Link
    //         onClick={this.props.prophandleForm}
    //         className="mr-3 text-primary"
    //       >
    //         <i className="mdi mdi-pencil font-size-18"></i>
    //       </Link>
    //       <Link to="#" className="text-danger">
    //         <i className="mdi mdi-trash-can font-size-18"></i>
    //       </Link>
    //     </>
    //   ),
    //   showExpandColumn: true,
    //   expandByColumnOnly: true,
    // };
    // const rowEvents = {
    //   onClick: (e, row) => {
    //     console.log(row);
    //     this.setState({
    //       editFormData : row
    //     })
    //   }
    // }
    const data = {
      columns: [
        {
          dataField: "File",
          text: "Files",
        },
        {
          dataField: "File",
          text: "View",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-success btn-xs"
                onClick={() => this.handleView(row.File)}
              >
                View
              </button>
            );
          },
        },
      ],
      rows: [
        {
          firmName: "shubham",
          File: "aadhar.pdf",
        },
        {
          firmName: "shubham",
          File: "addressDoc.pdf",
        },
        {
          firmName: "shubham",
          File: "CancelCheque.pdf",
        },
        {
          firmName: "shubham",
          File: "panDoc.pdf",
        },
        {
          firmName: "shubham",
          File: "cdsl.pdf",
        },
        {
          firmName: "shubham",
          File: "nsdl.pdf",
        },
      ],
    };

    const options = {
      // pageStartIndex: 0,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: false,
      showTotal: true,
      sizePerPageList: [
        {
          text: "5th",
          value: 10,
        },
        {
          text: "10th",
          value: 10,
        },
        {
          text: "All",
          value: data.rows.length,
        },
      ],
    };

    // const selectRow = {
    //   mode: 'checkbox',
    //   clickToSelect: true
    // };

    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          console.log("A Td Element was clicked!");
          console.log("it produced this event:", e);
          console.log("It was in this column:", column);
          console.log("It was in this row:", rowInfo);
          console.log("It was in this table instance:", instance);
        },
      };
    };
    if (this.props.isLoading) {
      return (
        <React.Fragment>
          <div style={{ marginTop: "87px" }}>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Dropdown
                    isOpen={this.state.menu}
                    toggle={() => this.setState({ menu: !this.state.menu })}
                    className="float-right"
                  >
                    <DropdownToggle tag="i" className="arrow-none card-drop">
                      <i className="mdi mdi-dots-vertical"></i>
                    </DropdownToggle>
                    <DropdownMenu right></DropdownMenu>
                  </Dropdown>

                  <h4 className="card-title mb-4">
                    Firm Documents of {this.props.location.pathname.slice(17)}
                  </h4>

                  <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div style={{ marginTop: "87px" }}>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Dropdown
                    isOpen={this.state.menu}
                    toggle={() => this.setState({ menu: !this.state.menu })}
                    className="float-right"
                  >
                    <DropdownToggle tag="i" className="arrow-none card-drop">
                      <i className="mdi mdi-dots-vertical"></i>
                    </DropdownToggle>
                    <DropdownMenu right></DropdownMenu>
                  </Dropdown>

                  <h4 className="card-title mb-4">
                    Billing Documents of{" "}
                    {this.props.location.pathname.slice(17)}
                  </h4>

                  <BootstrapTable
                    keyField="id"
                    data={data.rows}
                    columns={data.columns}
                    wrapperClasses="table-responsive"
                    rowClasses="text-nowrap"
                    filter={filterFactory()}
                    // expandRow={ expandRow }
                    pagination={paginationFactory(options)}
                    getTrProps={onRowClick}
                    rowEvents={this.props.rowEvents}
                  // selectRow={ selectRow }
                  />
                </CardBody>
              </Card>
            </Col>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default ViewTableBillingComp;
