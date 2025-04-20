// ? custom model without using any third party library
import React from "react";

const CustomModal = ({
  isOpen,
  title,
  children,
  onOk,
  onCancel,
  footer,
  closable = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#FFDBC4E5] rounded-2xl w-[90%] md:w-[500px] shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 bg-[#FF6200] rounded-t-2xl">
          <h2 className="text-white font-semibold text-xl mx-auto">{title}</h2>
          {closable && (
            <button
              onClick={onCancel}
              className="text-white font-bold text-lg absolute right-4 top-2"
            >
              &times;
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-4 text-[#333]">{children}</div>

        {/* Footer */}
        {footer !== undefined ? (
          footer
        ) : (
          <div className="flex justify-end gap-4 p-4">
            <button
              onClick={onCancel}
              className="border border-[#FFA167] text-[#FF6200] rounded-xl px-5 py-1.5 shadow-md"
            >
              Cancel
            </button>
            <button
              onClick={onOk}
              className="bg-[#FF6200] text-white rounded-xl px-5 py-1.5 shadow-md hover:bg-[#ff62000a]"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomModal;



// ?ANTD Model

// import React from "react";
// // import { Modal } from "antd";\

// const CustomModal = ({ isOpen, title, children, onOk, onCancel, footer, closable = true }) => {
//   return (
//     <Modal
//       title={<h2 className="text-[#FFDBC4E5] text-center font-semibold text-xl">{title}</h2>}
//       open={isOpen}
//       onOk={onOk}
//       onCancel={onCancel}
//       footer={footer}
//       closable={closable}
//       centered
//       styles={{
//         header: {
//           backgroundColor: "#FF6200",
//           borderRadius: "1rem",
//           padding: "0.2rem",
//           display: "flex",
//           justifyContent: "center",
//           alignContent: "center",
//         },
//         content: {
//           backgroundColor: "#FFDBC4E5",
//           borderRadius: "1rem",
//           padding: "1rem",
//         },
//       }}
//       okButtonProps={{
//         className: "!bg-[#FF6200] !hover:bg-[#FF62000A] !border-none !text-white !rounded-xl !px-5 !py-1.5 !shadow-md",
//       }}
//       cancelButtonProps={{
//         className: "!border-[#FFA167] !text-[#FF6200] !rounded-xl !px-5 !py-1.5 !shadow-md",
//       }}
//     >
//       <div className="text-[#333]">{children}</div>
//     </Modal>
//   );
// };

// export default CustomModal;
