import GoogleButton from "./GoogleButton";
import { X } from "lucide-react"; // nice clean icon

export default function LoginModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-1000 animate-fadeIn"
    >
      {/* MODAL CARD */}
      <div className="relative bg-white/90 backdrop-blur-xl w-[380px] rounded-2xl shadow-2xl border border-white/40 p-7 animate-scaleIn">

        {/* CLOSE BUTTON */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-5 tracking-tight">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 text-center mb-6 text-sm">
          Login to continue accessing recipes
        </p>

        {/* GOOGLE LOGIN */}
        <div className="flex justify-center mb-6">
          <GoogleButton onSuccess={onClose} />
        </div>

        {/* SEPARATOR */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* INFO */}
        <p className="text-center text-gray-600 text-sm">
          We only use your Google account to authenticate.  
          No spam. No extra permissions.
        </p>
      </div>
    </div>
  );
}
