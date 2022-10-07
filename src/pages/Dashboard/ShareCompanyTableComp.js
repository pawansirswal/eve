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

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

class ShareCompanyTableComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
  }

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
        // {
        //   dataField: "id",
        //   text: "No.",
        // },
        {
          dataField: "companyName",
          text: "Company Name",
          sort: true,

          filter: textFilter(),
        },
        {
          dataField: "companyAddress",
          text: "Company Registered Address",

          filter: textFilter(),
        },
        {
          dataField: "authPerson",
          text: "Authorised Person Name",

          filter: textFilter(),
        },
        {
          dataField: "contact",
          text: "Contact Number",

          filter: textFilter(),
        },
        {
          dataField: "rtaName",
          text: "RTA NAME",

          filter: textFilter(),
        },
        {
          dataField: "rtaContactPerson",
          text: "RTA Contact Person",

          filter: textFilter(),
        },
        {
          dataField: "rtaMob",
          text: "RTA Mobile Number",

          filter: textFilter(),
        },
        {
          dataField: "rtaLandline",
          text: "RTA Landline",

          filter: textFilter(),
        },
        {
          dataField: "rtaEmail",
          text: "RTA Email Id",

          filter: textFilter(),
        },
        {
          dataField: "isin",
          text: "ISIN",

          filter: textFilter(),
        },
      ],
      rows: this.props.tableData,
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

    const defaultSortedBy = [
      {
        dataField: "companyName",
        order: "asc", // or desc
      },
    ];
    if (this.props.isLoading) {
      return (
        <React.Fragment>
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
                  <DropdownMenu right>
                    <DropdownItem onClick={this.props.prophandleForm}>
                      Add Share Company
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <h4 className="card-title mb-4">Shares Master</h4>

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
                  <DropdownMenu right>
                    <DropdownItem onClick={this.props.prophandleForm}>
                      Add Share Company
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <h4 className="card-title mb-4">Shares Master</h4>

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
                  defaultSorted={defaultSortedBy}

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

export default ShareCompanyTableComp;
