import React, { Component } from "react";
import filterFactory from "react-bootstrap-table2-filter";
import API from "../../config/config";
import { message, notification, Modal, Button } from "antd";

import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Card,
  CardBody,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { scryRenderedDOMComponentsWithTag } from "react-dom/test-utils";

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

class NewsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      tableData: [],
      isLoading: false,
      visible: false,
      confirmLoading: false,
      rowId: null,
      loader: false,
      isLoading: true,
    };
  }

  handleModal = (id) => {
    this.setState({
      visible: true,
      rowId: id,
    });
  };

  handleOk = () => {
    this.handleDelete(this.state.rowId);
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      rowId: null,
    });
  };

  handleDelete = (id) => {
    if (id !== undefined) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      };
      fetch(API.api_route + "/dealer/deleteNews", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            message.success("News Deleted successfully !");
            this.props.fetchNews();
          } else {
            notification.error({ message: data.msg });
          }
        })
        .catch((e) => {
          console.log(e);
          notification.error({ message: "ERROR" });
        });
    }
  };

  render() {
    const data = {
      columns: [
        {
          dataField: "id",
          text: "Bill Id",
        },

        {
          dataField: "title",
          text: "Title",
        },
        {
          dataField: "link",
          text: "Link",
        },

        {
          dataField: "id",
          text: "Remove",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-danger btn-xs"
                // onClick={() => this.handleDelete(row.transaction_id)}
                onClick={() => {
                  this.handleModal(row.id);
                }}
              >
                Delete
              </button>
            );
          },
        },
      ],
      rows: this.props.tableData,
    };

    const options = {
      // pageStartIndex: 0,
      hideSizePerPage: true,
      showTotal: true,
      hidePageListOnlyOnePage: false,
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
        <div style={{ marginTop: "87px" }}>
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

                  <h4 className="card-title mb-4">News Table </h4>

                  <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </React.Fragment>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: "87px" }}>
          <React.Fragment>
            <Modal
              title="Confirm Delete"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>Are you Sure!</p>
            </Modal>

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
                  </Dropdown>

                  <h4 className="card-title mb-4">News Table </h4>

                  {this.state.loader ? (
                    <div style={{ marginTop: "60px", textAlign: "center" }}>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <BootstrapTable
                    keyField="id"
                    data={data.rows}
                    columns={data.columns}
                    wrapperClasses="table-responsive"
                    rowClasses="text-nowrap"
                    filter={filterFactory()}
                    // expandRow={ expandRow }
                    pagination={paginationFactory(options)}
                  // selectRow={ selectRow }
                  />
                </CardBody>
              </Card>
            </Col>
          </React.Fragment>
        </div>
      );
    }
  }
}

export default NewsTable;
