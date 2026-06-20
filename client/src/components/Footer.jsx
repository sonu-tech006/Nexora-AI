import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="w-full mt-20">
      <hr className="border-t-2 border-gray-200" />
      <footer className="fade-in-on-scroll px-6 md:px-16 lg:px-24 xl:px-32 pt-16 w-full bg-white text-gray-700 hover:bg-slate-900 group transition-all duration-300 ease-in-out font-normal antialiased">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-300 group-hover:border-slate-700 pb-10 transition-colors duration-300 ease-in-out">
          <div className="md:max-w-96">
            <div className="flex items-center gap-1 select-none">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:via-violet-400 group-hover:to-purple-400">
                Nexora
              </span>
              <span className="text-2xl font-extrabold text-gray-800 group-hover:text-white transition-colors duration-300">.ai</span>
            </div>
            <p className="mt-6 text-sm text-gray-700 group-hover:text-gray-300 transition-colors duration-300 ease-in-out">
              Experience the power of AI with Nexora.ai. <br /> Transform your
              content creation with our suite of premium AI tools. Write articles,
              generate images, and enhance your workflow.
            </p>
          </div>
          <div className="flex-1 flex items-start md:justify-end gap-20">
            <div>
              <h2 className="font-bold mb-5 text-gray-900 group-hover:text-white transition-colors duration-300 ease-in-out">Company</h2>
              <ul className="text-sm space-y-3 relative z-10">
                <li>
                  <a className="text-gray-700 group-hover:text-gray-300 hover:!text-white hover:translate-x-1 inline-block transition-all duration-300 ease-in-out" href="#">Home</a>
                </li>
                <li>
                  <a className="text-gray-700 group-hover:text-gray-300 hover:!text-white hover:translate-x-1 inline-block transition-all duration-300 ease-in-out" href="#">About us</a>
                </li>
                <li>
                  <a className="text-gray-700 group-hover:text-gray-300 hover:!text-white hover:translate-x-1 inline-block transition-all duration-300 ease-in-out" href="#">Contact us</a>
                </li>
                <li>
                  <a className="text-gray-700 group-hover:text-gray-300 hover:!text-white hover:translate-x-1 inline-block transition-all duration-300 ease-in-out" href="#">Privacy policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 group-hover:text-white mb-5 transition-colors duration-300 ease-in-out">
                Subscribe to newsletter
              </h2>
              <div className="text-sm space-y-3">
                <p className="text-gray-700 group-hover:text-gray-300 transition-colors duration-300 ease-in-out">
                  The latest news, articles, and resources, sent weekly.
                </p>
                <div className="flex items-center gap-2 pt-4 relative z-10">
                  <input
                    className="bg-gray-100 group-hover:bg-slate-800 border border-gray-300 group-hover:border-slate-700 text-gray-900 group-hover:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none w-full max-w-64 h-10 rounded-lg px-4 transition-all duration-300 ease-in-out"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button className="bg-primary hover:bg-blue-600 w-28 h-10 text-white rounded-lg cursor-pointer font-bold transition-all duration-300 ease-in-out shadow-lg shadow-primary/20 hover:-translate-y-0.5">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-6 text-center text-xs md:text-sm pb-8 text-gray-600 group-hover:text-gray-400 transition-colors duration-300 ease-in-out">
          Copyright 2025 ©{" "}
          <a className="text-gray-700 font-bold group-hover:text-gray-300 hover:!text-white transition-colors duration-300 ease-in-out relative z-10" target="_blank" href="https://elyse502.github.io/Elysee-Portfolio">
            ElyséeDev
          </a>
          . All Right Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
