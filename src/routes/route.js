import React from "react";
import { Route, Redirect } from "react-router-dom";

const AppRoute = ({
  component: Component,
  layout: Layout,
  // isAuthProtected,
  // ...rest
}) => (
  <Route
    // {...rest}
    render={(props) => {
      if (!localStorage.getItem("token")) {
        return (
          <Redirect to={{ pathname: "/login" }} />
          // <Layout>
          //   <Component {...props} />
          // </Layout>
        );
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default AppRoute;
