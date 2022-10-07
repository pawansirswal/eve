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
import { notification, message, Modal } from "antd";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

class PostTempTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      firmName: "",
      templates: [],
      rowId: "",
    };
  }

  componentDidMount() {
    this.fetchTemplated();
  }

  fetchTemplated = () => {
    fetch(API.api_route + "/aws/fetchPostTemp")
      .then((response) => response.json())
      .then((json) => this.setState({ templates: json }));
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
      fetch(API.api_route + "/aws/delete", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            message.success("Template Deleted successfully !");
            this.fetchTemplated();
          } else {
            notification.error({ message: data.msg });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

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

  render() {
    const data = {
      columns: [
        {
          dataField: "stockName",
          text: "Stock",
        },
        {
          dataField: "File",
          text: "View",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-success btn-xs"
                onClick={() => window.open(row.previewUrl)}
              >
                View
              </button>
            );
          },
        },
        {
          dataField: "File",
          text: "Delete",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <button
                className="btn btn-danger btn-xs"
                onClick={() => this.handleModal(row.id)}
              >
                Delete
              </button>
            );
          },
        },
      ],
      rows: this.state.templates,
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
          <Modal
            title="Confirm Delete"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Are you Sure!</p>
          </Modal>

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

                  <h4 className="card-title mb-4">Templates</h4>

                  <div class="d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
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
          <Modal
            title="Confirm Delete"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Are you Sure!</p>
          </Modal>

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

                  <h4 className="card-title mb-4">Templates</h4>

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

export default PostTempTable;
