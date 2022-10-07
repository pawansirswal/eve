import React, { useState } from "react";
import { Modal } from "antd";
import { Button } from "reactstrap";

export default function Modall(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        style={{ marginLeft: "10px" }}
        color="primary"
        onClick={showModal}
      >
        {props.btnTitle}
      </Button>
      <Modal
        title={props.btnTitle}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <img
          data-dz-thumbnail=""
          height="250"
          width="450"
          className="rounded bg-light"
          alt={"Image"}
          src={props.imgSrc}
        />
      </Modal>
    </>
  );
}
