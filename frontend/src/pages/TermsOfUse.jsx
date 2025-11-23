import { useState } from "react";
import { FaGavel, FaShoppingCart, FaUserCheck, FaExclamationTriangle, FaBalanceScale, FaHandshake } from "react-icons/fa";

const TermsOfUse = () => {
  const [activeSection, setActiveSection] = useState(0);

  const termsSections = [
    {
      icon: <FaUserCheck className="text-2xl" />,
      title: "Account Registration",
      content: `By creating an account with HomeFinder, you agree to:
• Provide accurate and complete registration information
• Maintain the security of your password and account
• Accept responsibility for all activities under your account
• Notify us immediately of any unauthorized use

We reserve the right to refuse service, terminate accounts, or remove content at our discretion.`
    },
    {
      icon: <FaShoppingCart className="text-2xl" />,
      title: "Property Transactions",
      content: `When using HomeFinder for property transactions:
• All prices are in USD unless otherwise specified
• Property listings must be accurate and truthful
• Buyers and sellers are responsible for due diligence
• HomeFinder acts as a platform, not a direct party to transactions`
    },
    {
      icon: <FaGavel className="text-2xl" />,
      title: "User Conduct",
      content: `You agree not to use HomeFinder to:
• Violate any laws or regulations
• Post false or misleading property information
• Harass or threaten other users
• Attempt to gain unauthorized access to accounts
• Engage in fraudulent activities`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <section className="relative py-20 bg-gradient-to-br from-amber-50 to-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-amber-500">
            Terms of Use
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-600">
            Please read these terms carefully before using HomeFinder.
          </p>
          <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full inline-block shadow-sm">
            Effective date: {new Date().toLocaleDateString()}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-3 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Sections</h3>
                {termsSections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSection(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                      activeSection === index
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-transparent hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {section.icon}
                      </span>
                      <span>{section.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white">
                    {termsSections[activeSection].icon}
                  </div>
                  <h2 className="text-3xl font-black text-gray-900">
                    {termsSections[activeSection].title}
                  </h2>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 text-lg leading-relaxed bg-gray-50 p-6 rounded-lg border border-gray-200">
                    {termsSections[activeSection].content}
                  </pre>
                </div>
              </div>

              <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <FaExclamationTriangle className="text-2xl text-red-600 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-black text-red-900 mb-2">Important Legal Notice</h3>
                    <p className="text-red-800 leading-relaxed">
                      These terms constitute a legal agreement between you and HomeFinder. 
                      By using our platform, you acknowledge that you have read, understood, 
                      and agree to be bound by these terms. If you disagree with any part, 
                      please discontinue use immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-linear-to-r from-amber-500 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">Agreement Acceptance</h2>
          <p className="text-xl text-white mb-12 max-w-2xl mx-auto leading-relaxed">
            By creating an account or using our services, you confirm that you have read, 
            understood, and agree to be bound by these Terms of Use.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm border border-amber-400 border-opacity-30 hover:bg-opacity-20 transition-all duration-300">
              <FaGavel className="text-4xl text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-amber-500">Governing Law</h3>
              <p className="text-amber-500">
                These terms are governed by the laws of Rwanda
              </p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm border border-amber-400 border-opacity-30 hover:bg-opacity-20 transition-all duration-300">
              <FaHandshake className="text-4xl text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-amber-500">User Agreement</h3>
              <p className="text-amber-500">
                Your continued use constitutes acceptance of our terms and policies
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-amber-400 border-opacity-30">
            <p className="text-amber-100 text-sm">
              For questions about these terms, contact:{" "}
              <a href="mailto:niyomugaboetiene53@gmail.com" className="text-white hover:text-amber-200 font-medium underline">
                niyomugaboetiene53@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfUse;