import { useNavigate } from "react-router-dom";
import { AiToolsData } from "../assets/assets";
import { useUser, SignInButton } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="fade-in-on-scroll px-4 sm:px-20 xl:px-32 my-24">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Powerful AI Tools
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </div>

      <div className="flex flex-wrap mt-10 justify-center">
        {AiToolsData.map((tool, index) => {
          const content = (
            <div
              key={index}
              onClick={() => user && navigate(tool.path)}
              className="group p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-2 hover:bg-slate-900 hover:shadow-2xl hover:border-slate-800 transition-all duration-300 cursor-pointer"
            >
              <tool.Icon
                className="w-12 h-12 p-3 text-white rounded-xl shadow-md"
                style={{
                  background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
                }}
              />
              <h3 className="mt-6 mb-3 text-lg font-semibold group-hover:text-white transition-colors duration-300">{tool.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 text-sm max-w-[95%] transition-colors duration-300">
                {tool.description}
              </p>
            </div>
          );

          return user ? (
            content
          ) : (
            <SignInButton key={index} mode="modal" fallbackRedirectUrl={tool.path}>
              {content}
            </SignInButton>
          );
        })}
      </div>
    </div>
  );
};

export default AiTools;
