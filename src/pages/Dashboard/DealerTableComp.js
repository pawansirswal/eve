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

class DealerTableComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
  }

  render() {
    const data = {
      columns: [
        {
          dataField: "id",
          text: "Dealer Id",
        },
        {
          dataField: "full_name",
          text: "Name",

          filter: textFilter(),
        },
        {
          dataField: "phone",
          text: "Phone",

          filter: textFilter(),
        },
        {
          dataField: "email",
          text: "Email",

          filter: textFilter(),
        },
        {
          dataField: "address",
          text: "Address",

          filter: textFilter(),
        },
        {
          dataField: "panNo",
          text: "PAN",

          filter: textFilter(),
        },
        {
          dataField: "bankName",
          text: "Bank Name",

          filter: textFilter(),
        },
        {
          dataField: "bankAccNo",
          text: "Account No.",

          filter: textFilter(),
        },
        {
          dataField: "ifscCode",
          text: "IFSC code",

          filter: textFilter(),
        },
        {
          dataField: "accType",
          text: "Account type",

          filter: textFilter(),
        },
        {
          dataField: "branch",
          text: "Branch",

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
                      Add Dealer
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <h4 className="card-title mb-4">Dealer Master</h4>

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
                      Add Dealer
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <h4 className="card-title mb-4">Dealer Master</h4>
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

export default DealerTableComp;
