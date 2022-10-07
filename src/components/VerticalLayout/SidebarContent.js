import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from "../../store/actions";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.type !== prevProps.type) {
        this.initMenu();
      }
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");

    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t("Menu")}</li>

            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="ri-dashboard-line"></i>
                <span className="badge badge-pill badge-success float-right">
                  3
                </span>
                <span className="ml-1">{this.props.t("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-store-2-line"></i>
                <span className="ml-1">Master Table</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/Firm-master">Firm Master</Link>
                </li>
                <li>
                  <Link to="/Share-comp-master">Share Company Master</Link>
                </li>
                {/* <li>
                  <Link to="/Party-details-master">Customer Master</Link>
                </li> */}
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-store-2-line"></i>
                <span className="ml-1">Billing</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/customerDetailsForBilling">
                    Add / View Customer details
                  </Link>
                </li>
                <li>
                  <Link to="/transaciion">Bill Generation</Link>
                </li>
                {/* <li>
                  <Link to="tranHistory">Transaction History</Link>
                </li> */}
                <li>
                  <Link to="/pendingTransaction">Pending Transaction</Link>
                </li>
                <li>
                  <Link to="/settledTransaction">Settled Transaction</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-store-2-line"></i>
                <span className="ml-1">Share Holders DB</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/analytics">Analytics</Link>
                </li>
                <li>
                  <Link to="/csvUpload">CSV Upload</Link>
                </li>
                <li>
                  <Link to="/Party-details-master">Manual Entry</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-store-2-line"></i>
                <span className="ml-1">customer db </span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/customerDb">Mobile Upload</Link>
                </li>
                <li>
                  <Link to="/customerDbforEmail">Email Upload</Link>
                </li>
                <li>
                  <Link to="/user-master">Mobile Master</Link>
                </li>
                <li>
                  <Link to="/email">Email Master</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="//#" className="has-arrow waves-effect">
                <i className="ri-store-2-line"></i>
                <span className="ml-1">Postcard Temp</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/postcardBackUpload">Upload</Link>
                </li>
                <li>
                  <Link to="/posTemp">Available Templates</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="//#" className="has-arrow waves-effect">
                <i className="ri-store-2-line"></i>
                <span className="ml-1">Dealer Master</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/dealer">Add / View Dealer</Link>
                </li>
                <li>
                  <Link to="/dealComm">Commision</Link>
                </li>
                <li>
                  <Link to="/requestedPayments">Requested Payments</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/addNews">
                <i className="ri-store-2-line"></i>
                <span className="ml-1">Add news article</span>
              </Link>
            </li>
            {(localStorage.getItem("user") == "manishMittal" ||
              localStorage.getItem("user") == "delistedAdmin") && (
              <li>
                <Link to="/logs">
                  <i className="ri-store-2-line"></i>
                  <span className="ml-1">Logs</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withNamespaces()(SidebarContent))
);
