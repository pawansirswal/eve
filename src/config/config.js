// https://api.dashboard.delistedstocks.in/
// http://testdelisted-stocks-prod-1.us-east-1.elasticbeanstalk.com
//http://delistedstocks.us-east-1.elasticbeanstalk.com
// http://delistedstocks-env.eba-xgubankw.us-east-1.elasticbeanstalk.com
// http://localhost:3003
if (process.env.NODE_ENV === "development") {
  module.exports = {
    api_route: "https://node.delistedstocks.in",
  };
} else {
  module.exports = {
    api_route: "https://node.delistedstocks.in",
  };
}
