import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { Play } from "lucide-react";
import { useUser, SignInButton } from "@clerk/clerk-react";

const Hero = () => {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);
  const { user } = useUser();

  return (
    <div className="px-4 sm:px-20 xl:p-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen">
      {/* Heading + Sub */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
          Create amazing content <br /> with{" "}
          <span className="text-primary">AI tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        {user ? (
          <button
            onClick={() => navigate("/ai")}
            className="bg-primary text-white px-10 py-3 rounded-lg hover:bg-blue-700 shadow-lg shadow-primary/30 transition cursor-pointer font-medium"
          >
            Start creating now
          </button>
        ) : (
          <SignInButton mode="modal" fallbackRedirectUrl="/ai">
            <button
              className="bg-primary text-white px-10 py-3 rounded-lg hover:bg-blue-700 shadow-lg shadow-primary/30 transition cursor-pointer font-medium"
            >
              Start creating now
            </button>
          </SignInButton>
        )}
          <button onClick={() => setShowDemo(true)} className="bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer">
          Watch demo
        </button>
      </div>

      {/* Trusted Section */}
      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={assets.user_group} alt="users" className="h-8" /> Trusted by
        10k+ people
      </div>

      {/* Logos Marquee */}
      <div className="overflow-hidden mt-16 w-full flex justify-center">
        <div className="w-full max-w-5xl">
          {" "}
          {/* constrain width */}
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            <img
              src={assets.facebook}
              alt="Facebook"
              className="h-8 inline-block"
            />
            <img src={assets.slack} alt="Slack" className="h-8 inline-block" />
            <img
              src={assets.framer}
              alt="Framer"
              className="h-8 inline-block"
            />
            <img
              src={assets.netflix}
              alt="Netflix"
              className="h-8 inline-block"
            />
            <img
              src={assets.google}
              alt="Google"
              className="h-8 inline-block"
            />
            <img
              src={assets.linkedin}
              alt="LinkedIn"
              className="h-8 inline-block"
            />

            {/* Duplicate for seamless loop */}
            <img
              src={assets.facebook}
              alt="Facebook"
              className="h-8 inline-block"
            />
            <img src={assets.slack} alt="Slack" className="h-8 inline-block" />
            <img
              src={assets.framer}
              alt="Framer"
              className="h-8 inline-block"
            />
            <img
              src={assets.netflix}
              alt="Netflix"
              className="h-8 inline-block"
            />
            <img
              src={assets.google}
              alt="Google"
              className="h-8 inline-block"
            />
            <img
              src={assets.linkedin}
              alt="LinkedIn"
              className="h-8 inline-block"
            />
          </div>
        </div>
      </div>

      {showDemo && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-3xl aspect-video relative flex flex-col justify-center items-center shadow-2xl animate-in zoom-in-95">
            <button 
              onClick={() => setShowDemo(false)} 
              className="absolute -top-4 -right-4 bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg font-bold text-xl cursor-pointer hover:bg-gray-100"
            >
              &times;
            </button>
            <div className="w-20 h-20 bg-primary/10 rounded-full flex justify-center items-center mb-6 shadow-outer">
               <Play className="w-10 h-10 text-primary ml-2" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Demo Video Coming Soon!</h2>
            <p className="text-gray-500">We are currently preparing an amazing showcase of our AI tools.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
