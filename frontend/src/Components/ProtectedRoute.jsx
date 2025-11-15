import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginModal from "../Components/LoginModal";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(!user);

  // If not logged in → block page and show modal
  if (!user) {
    return (
      <>
        <LoginModal
          open={showModal}
          onClose={() => setShowModal(false)}
        />

        {/* Dim background while modal is open */}
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
      </>
    );
  }

  // If logged in → show protected page
  return children;
}
