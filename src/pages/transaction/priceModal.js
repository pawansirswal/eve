import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "antd";
import API from "../../config/config";
import { notification } from "antd";
import Select from "react-select";

function PriceModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [price, setPrice] = useState("");
  const [isCompanyModalVisible, setIsCompanyModalVisible] = useState(false);
  const [firmName, setFirmName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [firms, setFirms] = useState([]);
  const [backTemplates, setBackTemplates] = useState([]);
  const [backTemp, setBackTemp] = useState(false);

  const selectInputRef = useRef();
  useEffect(() => {
    fetchFirm();
    fetchBackTemplate();
  }, []);

  const fetchFirm = () => {
    fetch(API.api_route + "/analytics/fetchFirm")
      .then((response) => response.json())
      .then((json) => setFirms(json))
      .catch((e) => {
        console.log(e);
        notification.error({ message: "error" });
      });
  };

  const fetchBackTemplate = () => {
    fetch(API.api_route + "/analytics/fetchBackTemplate")
      .then((response) => response.json())
      .then((json) => setBackTemplates(json))
      .catch((e) => {
        console.log(e);
        notification.error({ message: "error" });
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
    // console.log(isModalVisible);
  };

  const handleOk = () => {
    props.sendEmails(price);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFields = (e) => {
    setPrice(e.target.value);
  };

  const showCompanyModal = () => {
    setIsCompanyModalVisible(true);
    // console.log(isModalVisible);
  };

  const CompanyhandleOk = () => {
    if (firmName != "") {
      props.sendPostcard(firmName, previewUrl);
    } else {
      notification.error({ message: "Select FirmName to download postcard" });
    }
    setIsCompanyModalVisible(false);
  };

  const CompanyhandleCancel = () => {
    setIsCompanyModalVisible(false);
  };

  const CompanyhandleFields = (e) => {
    setFirmName(e.value);
  };

  const backtemphandleFields = (e) => {
    setPreviewUrl(e.value);
  };

  const firmNames = [];
  firms.map((firm) =>
    firmNames.push({
      id: `firmName`,
      label: `${firm.firmName}`,
      value: `${firm.firmName}`,
    })
  );
  const BackTemps = [];
  backTemplates.map((Bt) =>
    BackTemps.push({
      id: `backTemp`,
      label: `${Bt.stockName}`,
      value: `${Bt.previewUrl}`,
    })
  );

  return (
    <>
      {/* <Button
        style={{ background: "#4FCE5D", color: "white" }}
        onClick={() => {
          props.sendWhatsapp();
        }}
      >
        Send Whatsapp Messaage
      </Button> */}
      <Button type="primary" onClick={showModal}>
        Send Email
      </Button>

      <Button
        style={{ background: "wheat", color: "black" }}
        onClick={showCompanyModal}
      >
        Download Postcard
      </Button>

      <Modal
        title="Provide price"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label htmlFor="price">
          Price:
          <input onChange={handleFields} />
        </label>
      </Modal>

      <Modal
        title="Select Company Name"
        visible={isCompanyModalVisible}
        onOk={CompanyhandleOk}
        onCancel={CompanyhandleCancel}
      >
        <label htmlFor="price" style={{ width: "100%" }}>
          Select Company Name
          <Select options={firmNames} onChange={CompanyhandleFields} />
        </label>
        <br />
        {!backTemp && (
          <Button
            type="primary"
            onClick={() => {
              setBackTemp(true);
            }}
          >
            Add back Template
          </Button>
        )}
        {backTemp && (
          <label htmlFor="price" style={{ width: "100%" }}>
            Select Back Template
            <Select
              options={BackTemps}
              ref={selectInputRef}
              onChange={backtemphandleFields}
            />
          </label>
        )}
        {previewUrl != "" ? (
          <div>
            <Button
              type="primary"
              onClick={() => {
                window.open(previewUrl);
              }}
            >
              Preview
            </Button>{" "}
            <Button
              type="primary"
              onClick={() => {
                setPreviewUrl("");
                setBackTemp(false);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </Modal>
    </>
  );
}

export default PriceModal;
