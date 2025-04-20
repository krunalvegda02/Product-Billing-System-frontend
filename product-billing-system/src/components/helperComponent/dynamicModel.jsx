import React from "react";
import { Modal } from "antd";

const CustomModal = ({ isOpen, title, children, onOk, onCancel, footer, closable = true }) => {
  return (
    <Modal
      title={<h2 className="text-[#FFDBC4E5] text-center font-semibold text-xl">{title}</h2>}
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
      closable={closable}
      centered
      styles={{
        header: {
          backgroundColor: "#FF6200",
          borderRadius: "1rem",
          padding: "0.2rem",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        },
        content: {
          backgroundColor: "#FFDBC4E5",
          borderRadius: "1rem",
          padding: "1rem",
        },
      }}
      okButtonProps={{
        className: "!bg-[#FF6200] !hover:bg-[#FF62000A] !border-none !text-white !rounded-xl !px-5 !py-1.5 !shadow-md",
      }}
      cancelButtonProps={{
        className: "!border-[#FFA167] !text-[#FF6200] !rounded-xl !px-5 !py-1.5 !shadow-md",
      }}
    >
      <div className="text-[#333]">{children}</div>
    </Modal>
  );
};

export default CustomModal;
