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
import PriceModal from "../priceModal";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Button } from "antd";

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

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      showModal: false,
    };
  }
  componentDidMount() {
    console.log(this.props.tableData);
  }

  showModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handleOk = () => {
    this.setState({
      showModal: false,
    });
  };

  handleCancel = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const data = {
      columns: [
        // {
        //   dataField: "id",
        //   text: "No.",
        // },
        {
          dataField: "folioNo",
          text: "Folio Number",
          filter: textFilter(),
        },
        {
          dataField: "name",
          text: "Name",
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
          dataField: "pincode",
          text: "Pincode",
          filter: textFilter(),
        },
        {
          dataField: "qty",
          text: "Quantity",
          filter: textFilter(),
        },
        {
          dataField: "contact",
          text: "Contact",
          filter: textFilter(),
        },
        {
          dataField: "email",
          text: "Email Id",
          filter: textFilter(),
        },
        {
          dataField: "cmnt1",
          text: "DP ID - CLIENT ID",
          filter: textFilter(),
        },
        {
          dataField: "caseType",
          text: "Case Type",
          filter: textFilter(),
        },
        {
          dataField: "quote",
          text: "Our Quote",
          filter: textFilter(),
        },
        {
          dataField: "partyPrice",
          text: "Party Price",
          filter: textFilter(),
        },
        {
          dataField: "followedBy",
          text: "Followed By",
          filter: textFilter(),
        },
        {
          dataField: "companyName",
          text: "Company Name",
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
    if (this.props.isLoading && this.props.btnClicked) {
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
                  <DropdownMenu right></DropdownMenu>
                </Dropdown>

                <h4 className="card-title mb-4">Customer</h4>

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
          <Col lg={15}>
            <Card>
              {/* {this.props.isLoading ? (
                <div></div>
              ) : (
                // <div style={{ width: "100%" }}>
                <Button
                  onClick={this.props.sendPostcardInfo}
                  style={{ display: "block", marginTop: "10px" }}
                  type="primary"
                >
                  postcard
                </Button>
                // </div>
              )} */}
              <CardBody>
                {/* <Dropdown
                  isOpen={this.state.menu}
                  toggle={() => this.setState({ menu: !this.state.menu })}
                  className="float-right"
                >
                  <DropdownToggle tag="i" className="arrow-none card-drop">
                    <i className="mdi mdi-dots-vertical"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <PriceModal />
                    </DropdownItem>
                    <DropdownItem>Postcard</DropdownItem>
                  </DropdownMenu>
                </Dropdown> */}

                <h4 className="card-title mb-4">Share Holder Master</h4>

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
              {this.props.isLoading || this.props.tableData.length === 0 ? (
                <div></div>
              ) : (
                // <div style={{ width: "100%" }}>
                <PriceModal
                  sendPostcard={this.props.sendPostcard}
                  sendEmails={this.props.sendEmails}
                  sendWhatsapp={this.props.sendWhatsapp}
                />
                // </div>
              )}
            </Card>
          </Col>
        </React.Fragment>
      );
    }
  }
}

export default ResultTable;
