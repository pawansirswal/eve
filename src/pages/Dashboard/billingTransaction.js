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

const expandRow = {
  renderer: (row) => (
    <>
      Action :
      <Link to="#" className="mr-3 text-primary">
        <i className="mdi mdi-pencil font-size-18"></i>
      </Link>
      <Link to="#" className="text-danger">
        <i className="mdi mdi-trash-can font-size-18"></i>
      </Link>
    </>
  ),
  showExpandColumn: true,
  expandByColumnOnly: true,
};

class BillingTransaction extends Component {
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
          dataField: "companyName",
          text: "Company Name",
        },
        {
          dataField: "email",
          text: "Email Id",
        },
        {
          dataField: "contact",
          text: "Contact No.",
        },
        {
          dataField: "bank",
          text: "Bank",
        },
        {
          dataField: "bankAcNo",
          text: "Bank A/c No",
        },
        {
          dataField: "accountType",
          text: "Account Type",
        },
        {
          dataField: "ifscCode",
          text: "IFSC Code",
        },
        {
          dataField: "branch",
          text: "branch",
        },
        ,
        {
          dataField: "dpid",
          text: "DPID Client Id",
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
          dataField: "state",
          text: "State",
        },
        {
          dataField: "pincode",
          text: "Pincode",
        },
        {
          dataField: "cmnt1",
          text: "Comment-1",
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
          value: 5,
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
                wrapperClasses="table-responsive"
                rowClasses="text-nowrap"
                hover
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

export default BillingTransaction;
