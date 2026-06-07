import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const ClerkProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem('mockClerkSignedIn') === 'true'
  );
  const [showSignInModal, setShowSignInModal] = useState(false);

  const signIn = () => {
    localStorage.setItem('mockClerkSignedIn', 'true');
    setIsSignedIn(true);
    setShowSignInModal(false);
  };

  const signOut = () => {
    localStorage.setItem('mockClerkSignedIn', 'false');
    setIsSignedIn(false);
  };

  const val = {
    isSignedIn,
    signIn,
    signOut,
    showSignInModal,
    setShowSignInModal,
  };

  return (
    <AuthContext.Provider value={val}>
      {children}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="p-8 bg-white rounded-xl shadow-xl flex flex-col items-center animate-in fade-in zoom-in w-full max-w-sm relative">
            <button onClick={() => setShowSignInModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold cursor-pointer">&times;</button>
            <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>
            <p className="text-gray-500 mb-6 text-center text-sm">Sign in with our demo account to continue exploring all features.</p>
            <button className="bg-primary hover:bg-blue-700 text-white px-8 py-3 w-full rounded-lg transition shadow-md cursor-pointer" onClick={signIn}>Sign In Demo</button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(AuthContext) || { isSignedIn: false };
  return {
    user: ctx.isSignedIn ? {
      id: "user_123",
      fullName: "Demo User",
      imageUrl: "https://i.pravatar.cc/150?img=11",
    } : null,
    isLoaded: true,
    isSignedIn: ctx.isSignedIn,
  };
};

export const useAuth = () => {
  const ctx = useContext(AuthContext) || { isSignedIn: false };
  return {
    userId: ctx.isSignedIn ? "user_123" : null,
    sessionId: ctx.isSignedIn ? "session_123" : null,
    getToken: async () => ctx.isSignedIn ? "mock_token" : null,
    isLoaded: true,
  };
};

export const useClerk = () => {
  const ctx = useContext(AuthContext) || {};
  return {
    signOut: () => ctx.signOut && ctx.signOut(),
    openUserProfile: () => alert('Mock User Profile Opened'),
    openSignIn: () => ctx.setShowSignInModal && ctx.setShowSignInModal(true),
    session: ctx.isSignedIn ? { id: "session_123" } : null
  };
};

export const SignIn = () => {
  const { signIn } = useContext(AuthContext) || {};
  return (
    <div className="p-8 border border-gray-200 bg-white rounded-xl shadow-sm flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">You must sign in</h2>
      <button className="bg-primary text-white px-8 py-2 rounded-lg cursor-pointer" onClick={signIn}>Sign In to Continue</button>
    </div>
  );
};

export const PricingTable = () => <div className="p-4 border rounded">Pricing Table Mock Engine</div>;

export const UserButton = () => {
  const { signOut } = useContext(AuthContext) || {};
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div className="relative">
      <img 
        src="https://i.pravatar.cc/150?img=11" 
        onClick={() => setMenuOpen(!menuOpen)}
        alt="User" 
        className="w-10 h-10 rounded-full border-2 border-primary shadow-md cursor-pointer hover:scale-105 transition" 
      />
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
             <img src="https://i.pravatar.cc/150?img=11" className="w-8 h-8 rounded-full" alt="avatar"/>
             <div>
               <p className="text-sm font-semibold">Demo User</p>
               <p className="text-xs text-gray-500">demo@xyz.com</p>
             </div>
          </div>
          <button 
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => alert("User profile is mock-only.")}>Manage Account</button>
          <button 
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition cursor-pointer"
            onClick={signOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export const Protect = ({ children }) => {
  const { isSignedIn } = useContext(AuthContext) || {};
  return isSignedIn ? <>{children}</> : null;
};
