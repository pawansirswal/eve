import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import LoginDel from "./pages/auth/logindel";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./theme.scss";
import Vidcap from "./pages/auth/vidcap";
import IdleTimer from "react-idle-timer";
import { api_route } from "./config/config";
import { notification } from "antd";
//Fake backend
// import fakeBackend from "./helpers/AuthType/fakeBackend";

// //Firebase helper
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// // Activating fake backend
// fakeBackend();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// // init firebase backend
// initFirebaseBackend(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getLayout = this.getLayout.bind(this);
  }

  /**
   * Returns the layout
   */
  getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (this.props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  handleOnAction = (event) => {
    // console.log("user did something", event);
  };

  handleOnActive = (event) => {
    // console.log("user is active", event);
    // console.log("time remaining", this.idleTimer.getRemainingTime());
  };

  handleOnIdle = (event) => {
    // console.log("user is idle", event);
    // console.log("last active", this.idleTimer.getLastActiveTime());
    if (
      localStorage.getItem("user") != null &&
      localStorage.getItem("user") != "manishMittal" &&
      localStorage.getItem("user") != "jyoti" &&
      localStorage.getItem("user") != "delistedAdmin"
    ) {
      fetch(api_route + `/firm/userIdle/${localStorage.getItem("user")}`, {
        method: "GET",
      })
        .then((response) => {
          this.updateLogs();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  updateLogs = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("loginId"),
        type: "automatic",
      }),
    };
    fetch(api_route + "/auth/updateLogoutLogs", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log("logs updated");

          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("loginId");
          window.location.reload();
        } else {
          notification.error({ message: data.msg });
        }
      });
  };

  render() {
    const Layout = this.getLayout();

    return (
      <React.Fragment>
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          timeout={1000 * 60 * 30}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />
        <Router>
          <Switch>
            <Route exact path="/login" component={LoginDel} />

            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
