import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useUser();

  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-1 cursor-pointer select-none"
      >
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
          Nexora
        </span>
        <span className="text-2xl sm:text-3xl font-extrabold text-gray-800">.ai</span>
      </div>

      {user ? (
        <UserButton />
      ) : (
        <SignInButton mode="modal">
          <button
            className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white hover:bg-blue-700 transition px-10 py-2.5 shadow-lg shadow-primary/30"
          >
            Get started <ArrowRight className="w-4 h-4" />
          </button>
        </SignInButton>
      )}
    </div>
  );
};

export default Navbar;
