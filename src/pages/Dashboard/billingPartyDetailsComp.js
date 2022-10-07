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

class BillingPartyDetailsComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
  }
  componentDidMount() {
    console.log(this.props.tableData);
  }

  handleSelectField = (e, row) => {
    console.log(e, row);
  };
  render() {
    const data = {
      columns: [
        {
          dataField: "id",
          text: "Customer Id",
        },

        {
          dataField: "dealerId",
          text: "Dealer Id",
          filter: textFilter(),
        },
        {
          dataField: "dealerId",
          text: "Tag",
          formatter: (cellContent, row) => {
            if (row.tag == "green") {
              return (
                <img
                  className="img-fluid text-center"
                  style={{ height: "20px" }}
                  src={require("../../assets/images/greenCircle.png")}
                  alt="redcircle"
                />
              );
            } else if (row.tag == "red") {
              return (
                <img
                  className="img-fluid text-center"
                  style={{ height: "20px" }}
                  src={require("../../assets/images/redCircle.png")}
                  alt="redcircle"
                />
              );
            } else if (row.tag == "yellow") {
              return (
                <img
                  className="img-fluid text-center"
                  style={{ height: "20px" }}
                  src={require("../../assets/images/yellowCircle.png")}
                  alt="redcircle"
                />
              );
            } else {
              return <p>no tag given yet</p>;
            }
          },
        },
        {
          dataField: "buyerName",
          text: "Buyer Name",
          style: {
            width: "50 px",
          },
          filter: textFilter(),
        },
        {
          dataField: "category",
          text: "Category",
          filter: textFilter(),
        },
        {
          dataField: "panNo",
          text: "Pan No",
          filter: textFilter(),
        },
        {
          dataField: "email",
          text: "Email Id",
          filter: textFilter(),
        },
        {
          dataField: "contactNo",
          text: "Contact No.",
          filter: textFilter(),
        },
        {
          dataField: "bankName",
          text: "Bank",
          filter: textFilter(),
        },
        {
          dataField: "bankAc",
          text: "Bank A/c No",
          filter: textFilter(),
        },
        {
          dataField: "acType",
          text: "Account Type",
          filter: textFilter(),
        },
        {
          dataField: "ifscCode",
          text: "IFSC Code",
          filter: textFilter(),
        },
        {
          dataField: "branch",
          text: "branch",
          filter: textFilter(),
        },
        {
          dataField: "dpName",
          text: "DP Name (CDSL)",
          filter: textFilter(),
        },

        {
          dataField: "dpid",
          text: "DPID Client Id (CDSL)",
          filter: textFilter(),
        },
        {
          dataField: "dpName_nsdl",
          text: "DP Name (NSDL)",
          filter: textFilter(),
        },

        {
          dataField: "dpid_nsdl",
          text: "DPID Client Id (NSDL)",
          filter: textFilter(),
        },
        {
          dataField: "address",
          text: "Address",
          filter: textFilter(),
        },
        {
          dataField: "city",
          text: "City",
          filter: textFilter(),
        },
        {
          dataField: "state",
          text: "State",
          filter: textFilter(),
        },
        {
          dataField: "pincode",
          text: "Pincode",
          filter: textFilter(),
        },
        {
          dataField: "cmnt1",
          text: "Comment-1",
          filter: textFilter(),
        },

        {
          dataField: "buyerName",
          text: "View Docs",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <Link
                to={`/viewtablebilling${row.buyerName.replace(
                  /[^A-Za-z0-9_]/gi,
                  "_"
                )}`}
              >
                <button
                  className="btn btn-success btn-xs"
                  // onClick={() => this.handleDelete(row.transaction_id)}
                >
                  View Docs
                </button>
              </Link>
            );
          },
        },
        {
          dataField: "buyerName",
          text: "Transactions",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <Link to={`/viewtrans/${row.buyerName}`}>
                <button
                  className="btn btn-success btn-xs"
                  // onClick={() => this.handleDelete(row.transaction_id)}
                >
                  Transactions
                </button>
              </Link>
            );
          },
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

                <h4 className="card-title mb-4">Customer Details</h4>
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

                <h4 className="card-title mb-4">Customer Details</h4>

                <BootstrapTable
                  keyField="id"
                  data={data.rows}
                  columns={data.columns}
                  hover
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
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

export default BillingPartyDetailsComp;
