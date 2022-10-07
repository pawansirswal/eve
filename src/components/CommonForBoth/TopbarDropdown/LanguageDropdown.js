import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import i18n from "../../../i18n";
import { withNamespaces } from "react-i18next";

class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      lng: "English",
    };
    this.toggle = this.toggle.bind(this);
    this.changeLanguageAction.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }

  changeLanguageAction = (lng) => {
    //set the selected language to i18n
    i18n.changeLanguage(lng);
  };

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default LanguageDropdown;
