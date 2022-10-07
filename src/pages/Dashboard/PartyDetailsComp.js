import React, { Component } from "react";
import filterFactory from "react-bootstrap-table2-filter";

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

// const expandRow = {
//   renderer: (row) => (
//     <>
//       Action :
//       <Link to="#" className="mr-3 text-primary">
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

class PartyDetailsComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
  }
  componentDidMount() {
    console.log(this.props.tableData);
  }
  render() {
    const data = {
      columns: [
        {
          dataField: "id",
          text: "No.",
        },
        {
          dataField: "folioNo",
          text: "Folio Number",
        },
        {
          dataField: "name",
          text: "Name",
        },
        {
          dataField: "address",
          text: "Address",
        },
        {
          dataField: "city",
          text: "City",
        },
        {
          dataField: "pincode",
          text: "Pincode",
        },
        {
          dataField: "qty",
          text: "Quantity",
        },
        {
          dataField: "contact",
          text: "Contact",
        },
        {
          dataField: "email",
          text: "Email Id",
        },
        {
          dataField: "cmnt1",
          text: "DP ID - CLIENT ID",
        },
        {
          dataField: "caseType",
          text: "Case Type",
        },
        {
          dataField: "quote",
          text: "Our Quote",
        },
        {
          dataField: "partyPrice",
          text: "Party Price",
        },
        {
          dataField: "followedBy",
          text: "Followed By",
        },
        {
          dataField: "companyName",
          text: "Company Name",
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
    if (this.props.isLoading) {
      return (
        <React.Fragment>
          <Col lg={15}>
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
                      Add Customer
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <h4 className="card-title mb-4">Customers Master</h4>
                <div class="d-flex justify-content-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
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
          <Col lg={50}>
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
                      Add Customer
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <h4 className="card-title mb-4">Party Details Master</h4>

                <BootstrapTable
                  keyField="id"
                  data={data.rows}
                  columns={data.columns}
                  wrapperClasses="table-responsive"
                  rowClasses="text-nowrap"
                  filter={filterFactory()}
                  // expandRow={ expandRow }
                  pagination={paginationFactory(options)}
                  rowEvents={this.props.rowEvents}
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

export default PartyDetailsComp;
