import "./App.css";
import CategoryComponents from "./components/Admin Components/CategoryComponents";
import ProductManagement from "./components/Admin Components/ProductManagement";
import Toast from "./components/helperComponent/Toast";
import useToast from "./hooks/useToast";
function App() {
  const { toasts, removeToast } = useToast();
  return (
    <>
      <Toast toasts={toasts} removeToast={removeToast} />
      <CategoryComponents />
    </>
  );
}

export default App;

// import React, { useState } from "react";
// import CustomModal from "./components/helperComponent/customModal.jsx";

// export default function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
//       >
//         Open Modal
//       </button>

//       <CustomModal isOpen={isModalOpen}  onClose={() => setIsModalOpen(false)}>
//         <p className="text-gray-700">This is a modal using only Tailwind CSS transitions.</p>
//       </CustomModal>
//     </div>
//   );
// }
