import React, { Component } from "react";
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
import CsvDownload from "react-json-to-csv";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

class NewsLetterTabEmailComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
  }

  render() {
    const data = {
      columns: [
        // {
        //   dataField: "id",
        //   text: "No.",
        // },

        {
          dataField: "email",
          text: "Email",

          filter: textFilter(),
        },
      ],
      rows: this.props.tableData,
    };

    const options = {
      pageStartIndex: 1,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: false,
      showTotal: true,
      sizePerPageList: [
        {
          text: "5th",
          value: 25,
        },
        {
          text: "10th",
          value: 25,
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
    if (this.props.isLoading) {
      return (
        <React.Fragment>
          <Col lg={20}>
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
                  <DropdownMenu right>
                    <DropdownItem onClick={this.props.prophandleForm}>
                      Edit
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <h4 className="card-title mb-4">User Master</h4>

                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Col lg={20}>
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
                  <DropdownMenu right>
                    <DropdownItem onClick={this.props.prophandleForm}>
                      Add Email
                    </DropdownItem>
                    <DropdownItem>
                      {this.props.tableData && (
                        <CsvDownload
                          data={this.props.tableData}
                          filename="user.csv"
                          style={{
                            //pass other props, like styles
                            boxShadow: "inset 0px 1px 0px 0px #5664d2",
                            background:
                              "linear-gradient(to bottom, #5664d2 5%, #5664d2 100%)",
                            backgroundColor: "#5664d2",
                            borderRadius: "6px",
                            border: "1px solid #5664d2",
                            display: "inline-block",
                            cursor: "pointer",
                            color: "#ffffff",
                            fontSize: "15px",
                            fontWeight: "bold",
                            padding: "6px 24px",
                            textDecoration: "none",
                            textShadow: "0px 1px 0px #9b14b3",
                          }}
                        >
                          Download
                        </CsvDownload>
                      )}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <h4 className="card-title mb-4">User Master</h4>
                <BootstrapTable
                  keyField="id"
                  data={data.rows}
                  columns={data.columns}
                  hover
                  wrapperClasses="table-responsive"
                  rowClasses="text-nowrap"
                  filter={filterFactory()}
                  // expandRow={ expandRow }
                  rowEvents={this.props.rowEvents}
                  pagination={paginationFactory(options)}
                // selectRow={ selectRow }
                />
              </CardBody>
            </Card>
          </Col>
        </React.Fragment>
      );
    }
  }
}

export default NewsLetterTabEmailComp;
