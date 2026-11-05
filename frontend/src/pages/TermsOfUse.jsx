import { useState } from "react";
import {
    FaGavel,
    FaShoppingCart,
    FaUserCheck,
    FaExclamationTriangle,
    FaHandshake
} from "react-icons/fa";

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

            <section className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-br from-amber-50 to-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 sm:mb-6 text-amber-500">
                        Terms of Use
                    </h1>

                    <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed text-gray-600">
                        Please read these terms carefully before using HomeFinder.
                    </p>

                    <div className="text-xs sm:text-sm text-gray-500 bg-white px-4 py-2 rounded-full inline-block shadow-sm">
                        Effective date: {new Date().toLocaleDateString()}
                    </div>

                </div>
            </section>

            <section className="py-10 sm:py-12 md:py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">

                        <div className="lg:col-span-1">

                            <div className="lg:sticky lg:top-28 space-y-3 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">

                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Sections
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">

                                    {termsSections.map((section, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveSection(index)}
                                            className={`w-full text-left px-3 sm:px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                                                activeSection === index
                                                    ? "bg-amber-500 text-white shadow-md"
                                                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-transparent hover:border-amber-200"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">

                                                <span className="text-lg shrink-0">
                                                    {section.icon}
                                                </span>

                                                <span className="text-sm sm:text-base">
                                                    {section.title}
                                                </span>

                                            </div>
                                        </button>
                                    ))}

                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">

                            <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">

                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-5 sm:mb-6">

                                    <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 bg-amber-500 rounded-xl flex items-center justify-center text-white">
                                        {termsSections[activeSection].icon}
                                    </div>

                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">
                                        {termsSections[activeSection].title}
                                    </h2>

                                </div>

                                <div className="max-w-none">

                                    <pre className="whitespace-pre-wrap break-words font-sans text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg border border-gray-200 overflow-x-auto">
                                        {termsSections[activeSection].content}
                                    </pre>

                                </div>
                            </div>

                            <div className="mt-6 sm:mt-8 bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-6">

                                <div className="flex items-start gap-3 sm:gap-4">

                                    <FaExclamationTriangle className="text-xl sm:text-2xl text-red-600 mt-1 shrink-0" />

                                    <div>

                                        <h3 className="text-lg sm:text-xl font-black text-red-900 mb-2">
                                            Important Legal Notice
                                        </h3>

                                        <p className="text-sm sm:text-base text-red-800 leading-relaxed">
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

            <section className="py-12 sm:py-14 md:py-16 bg-gradient-to-r from-amber-500 to-amber-600 text-white">

                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-5 sm:mb-6">
                        Agreement Acceptance
                    </h2>

                    <p className="text-base sm:text-lg md:text-xl text-white mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                        By creating an account or using our services, you confirm that you have read,
                        understood, and agree to be bound by these Terms of Use.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-3xl mx-auto">

                        <div className="bg-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">

                            <FaGavel className="text-3xl sm:text-4xl text-white mx-auto mb-4" />

                            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">
                                Governing Law
                            </h3>

                            <p className="text-sm sm:text-base text-white">
                                These terms are governed by the laws of Rwanda
                            </p>

                        </div>

                        <div className="bg-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">

                            <FaHandshake className="text-3xl sm:text-4xl text-white mx-auto mb-4" />

                            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">
                                User Agreement
                            </h3>

                            <p className="text-sm sm:text-base text-white">
                                Your continued use constitutes acceptance of our terms and policies
                            </p>

                        </div>

                    </div>

                    <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/30">

                        <p className="text-white text-xs sm:text-sm break-words">
                            For questions about these terms, contact:{" "}

                            <a
                                href="mailto:niyomugaboetiene53@gmail.com"
                                className="text-white hover:text-amber-100 font-medium underline"
                            >
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