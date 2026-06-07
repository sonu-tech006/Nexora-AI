import React, { useState } from "react";
import { useUser, SignInButton, PricingTable } from "@clerk/clerk-react";
import { X, CreditCard, ShieldCheck } from "lucide-react";

const Plan = () => {
  const { user } = useUser();
  const [activePlan, setActivePlan] = useState("Free");
  const [showBilling, setShowBilling] = useState(false);
  const [billingPlan, setBillingPlan] = useState("");

  const handleSubscribe = (plan) => {
    if (plan === "Free") {
      setActivePlan("Free");
    } else {
      setBillingPlan(plan);
      setShowBilling(true);
    }
  };

  const confirmSubscription = () => {
    setActivePlan(billingPlan);
    setShowBilling(false);
  };

  return (
    <div className="fade-in-on-scroll max-w-2xl mx-auto z-20 my-30">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Choose Your Plan
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      <div className="mt-14 max-sm:mx-8 flex flex-col sm:flex-row gap-6 justify-center items-stretch">
        {/* Free Plan */}
        <div className={`bg-white border rounded-2xl p-8 w-full sm:w-1/2 hover:shadow-xl hover:border-blue-400 hover:bg-blue-50/20 transition-all duration-300 ease-in-out relative flex flex-col ${activePlan === 'Free' ? 'border-blue-200 shadow-md' : 'border-gray-200'}`}>
          {activePlan === "Free" && <div className="absolute top-4 right-4 bg-gray-800 text-white text-[10px] uppercase font-bold px-3 py-1 rounded">Active</div>}
          <h3 className="text-xl font-bold mb-2 text-slate-800">Free</h3>
          <p className="text-4xl font-bold mb-2 text-slate-900">$0</p>
          <p className="text-gray-500 text-sm mb-6">Always free</p>
          
          <div className="border-t border-gray-100 pt-6 flex-1">
            <ul className="text-left text-sm text-gray-600 mb-8 space-y-4">
              <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Title Generation</li>
              <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Article Generation</li>
            </ul>
          </div>

          {!user ? (
            <div className="mt-auto">
              <SignInButton mode="modal">
                <button className="w-full py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition cursor-pointer font-medium text-sm">
                  Sign In to access
                </button>
              </SignInButton>
            </div>
          ) : activePlan !== "Free" && (
            <div className="mt-auto">
               <button onClick={() => handleSubscribe("Free")} className="w-full py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition cursor-pointer font-medium text-sm">
                 Switch to this plan
               </button>
            </div>
          )}
        </div>

        {/* Premium Plan */}
        <div className={`bg-[#fafafa] border rounded-2xl p-8 w-full sm:w-1/2 hover:shadow-xl hover:border-blue-400 hover:bg-blue-50/20 transition-all duration-300 ease-in-out relative flex flex-col ${activePlan === 'Pro' ? 'shadow-md border-blue-200' : 'border-gray-200'}`}>
          {activePlan === "Pro" && <div className="absolute top-4 right-4 bg-gray-800 text-white text-[10px] uppercase font-bold px-3 py-1 rounded">Active</div>}
          
          <h3 className="text-xl font-bold mb-2 text-slate-800">Premium</h3>
          <p className="text-4xl font-bold mb-2 text-slate-900">$16<span className="text-sm text-gray-500 font-normal"> /month</span></p>
          <p className="text-gray-500 text-sm mb-6">Only billed monthly</p>

          <div className="border-t border-gray-100 pt-6 flex-1">
            <ul className="text-left text-sm text-gray-600 mb-8 space-y-4">
              <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Title Generation</li>
              <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Article Generation</li>
              <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Generate Images</li>
              <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Remove Background</li>
              <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Remove Object</li>
              <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Resume Review</li>
            </ul>
          </div>

          {!user ? (
            <div className="mt-auto">
              <SignInButton mode="modal">
                <button className="w-full py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition cursor-pointer font-medium text-sm">
                  Sign In to access
                </button>
              </SignInButton>
            </div>
          ) : activePlan !== "Pro" && (
            <div className="mt-auto">
               <button onClick={() => handleSubscribe("Pro")} className="w-full py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition cursor-pointer font-medium text-sm">
                 Switch to this plan
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Inline Billing Section (Pushes Footer down naturally) */}
      {showBilling && (
        <div className="mt-16 w-full animate-in slide-in-from-top-4 fade-in duration-500">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden w-full max-w-4xl mx-auto flex flex-col relative">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <CreditCard className="text-primary w-6 h-6"/> Complete Subscription
              </h2>
              <button 
                onClick={() => setShowBilling(false)} 
                className="text-gray-500 hover:bg-gray-200 p-2 rounded-full transition cursor-pointer flex-shrink-0"
                aria-label="Close billing"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 w-full">
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-5 mb-8 flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">Selected Plan: {billingPlan}</p>
                  <p className="text-xs text-blue-700">Please finalize your subscription securely via Stripe.</p>
                </div>
                <div className="hidden sm:block">
                  <span className="bg-blue-200 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Step 2 of 2</span>
                </div>
              </div>

              {/* Authentic Clerk PricingTable integration */}
              <div className="w-full flex justify-center mb-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <PricingTable />
              </div>

              {/* Developer Mock Tool */}
              <div className="mt-8 pt-6 border-t border-gray-100 max-w-md mx-auto">
                <p className="text-center text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Virtual Testing</p>
                <button 
                  onClick={confirmSubscription} 
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-lg active:scale-95"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Simulate Instance Activation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;
