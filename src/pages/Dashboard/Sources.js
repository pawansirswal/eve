import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";

class Sources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Col lg={4}>
          <Card>
            <CardBody>
              <Dropdown
                className="float-right"
                isOpen={this.state.menu}
                toggle={() => this.setState({ menu: !this.state.menu })}
              >
                <DropdownToggle tag="i" className="arrow-none card-drop">
                  <i className="mdi mdi-dots-vertical"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="">Sales Report</DropdownItem>

                  <DropdownItem href="">Export Report</DropdownItem>

                  <DropdownItem href="">Profit</DropdownItem>

                  <DropdownItem href="">Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <h4 className="card-title mb-3">Sources</h4>

              <div>
                <div className="text-center">
                  <p className="mb-2">Total sources</p>
                  <h4>$ 7652</h4>
                  <div className="text-success">
                    <i className="mdi mdi-menu-up font-size-14"> </i>2.2 %
                  </div>
                </div>

                <div className="text-center mt-4">
                  <Link to="#" className="btn btn-primary btn-sm">
                    View more
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    );
  }
}

export default Sources;
