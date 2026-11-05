import { useState } from "react";
import {
    FaShieldAlt,
    FaUserLock,
    FaDatabase,
    FaCookie,
    FaEye,
    FaUserCheck
} from "react-icons/fa";

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState(0);

    const privacySections = [
        {
            icon: <FaUserLock className="text-2xl" />,
            title: "Information We Collect",
            content: `HomeFinder collects information to provide better services to our users:

• Personal Information: Name, email, phone number when you register
• Property Data: Details of properties you list or search for
• Usage Data: How you interact with our platform
• Device Information: Browser type, IP address for security purposes
• Location Data: To show relevant properties in your area

We collect this information only when you provide it voluntarily or through your use of our services.`
        },
        {
            icon: <FaDatabase className="text-2xl" />,
            title: "How We Use Your Information",
            content: `We use the collected information for:

• Providing and improving our real estate services
• Personalizing your property search experience
• Communicating important updates about your account
• Ensuring platform security and preventing fraud
• Analyzing usage patterns to enhance user experience
• Sending relevant property recommendations (with your consent)

We never sell your personal information to third parties.`
        },
        {
            icon: <FaCookie className="text-2xl" />,
            title: "Cookies & Tracking",
            content: `HomeFinder uses cookies and similar technologies:

• Essential Cookies: Required for basic site functionality
• Preference Cookies: Remember your settings and preferences
• Analytics Cookies: Help us understand how users interact with our platform
• Marketing Cookies: Show relevant property advertisements

You can control cookie settings through your browser. However, disabling essential cookies may affect site functionality.`
        },
        {
            icon: <FaShieldAlt className="text-2xl" />,
            title: "Data Security",
            content: `We take your data security seriously:

• Encryption: All data is encrypted in transit and at rest
• Access Controls: Strict role-based access to personal information
• Regular Audits: Security assessments and vulnerability testing
• Employee Training: Staff trained in data protection principles
• Secure Infrastructure: Hosted on protected servers with regular backups

While we implement strong security measures, no online service is 100% secure.`
        },
        {
            icon: <FaEye className="text-2xl" />,
            title: "Your Rights & Choices",
            content: `You have control over your personal data:

• Access: Request a copy of your personal information
• Correction: Update or correct inaccurate data
• Deletion: Request deletion of your account and data
• Opt-out: Unsubscribe from marketing communications
• Data Portability: Receive your data in a readable format
• Objection: Object to certain data processing activities

Contact us to exercise any of these rights.`
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-20">

            <section className="relative py-14 sm:py-16 md:py-20 bg-gradient-to-br from-amber-50 to-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6">
                        <FaShieldAlt className="text-2xl sm:text-3xl text-white" />
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 text-amber-500">
                        Privacy Policy
                    </h1>

                    <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed text-gray-600">
                        Protecting your privacy is fundamental to how we build HomeFinder.
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center text-xs sm:text-sm text-gray-500">
                        <span className="bg-white px-4 py-2 rounded-full shadow-sm">
                            Last updated: {new Date().toLocaleDateString()}
                        </span>

                        <span className="bg-white px-4 py-2 rounded-full shadow-sm">
                            🔒 Your data is safe with us
                        </span>
                    </div>
                </div>
            </section>

            <section className="py-10 sm:py-12 md:py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">

                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-28 space-y-2 sm:space-y-3 bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-sm border border-gray-200">

                                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                                    <FaShieldAlt className="text-amber-500" />
                                    Policy Sections
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                                    {privacySections.map((section, index) => (
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
                                                <span className="text-lg flex-shrink-0">
                                                    {section.icon}
                                                </span>

                                                <span className="text-xs sm:text-sm">
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

                                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                                        {privacySections[activeSection].icon}
                                    </div>

                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">
                                        {privacySections[activeSection].title}
                                    </h2>
                                </div>

                                <div className="max-w-none">
                                    <pre className="whitespace-pre-wrap break-words font-sans text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg border border-gray-200 overflow-x-auto">
                                        {privacySections[activeSection].content}
                                    </pre>
                                </div>
                            </div>

                            <div className="mt-6 sm:mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 md:p-6">

                                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">

                                    <FaUserCheck className="text-2xl text-blue-600 mt-1 flex-shrink-0" />

                                    <div>
                                        <h3 className="text-lg sm:text-xl font-black text-blue-900 mb-2">
                                            Your Privacy Matters
                                        </h3>

                                        <p className="text-sm sm:text-base text-blue-800 leading-relaxed">
                                            We are committed to protecting your personal information and being transparent
                                            about how we use it. This policy explains what data we collect, why we collect it,
                                            and how you can manage your privacy settings. We comply with applicable data
                                            protection laws and regularly review our practices to ensure your information is safe.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-14 md:py-16 bg-gradient-to-r from-amber-500 to-amber-600 text-white">

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6">
                        Our Privacy Commitment
                    </h2>

                    <p className="text-base sm:text-lg md:text-xl text-amber-100 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                        We believe your real estate journey should be secure and private.
                        Here's how we protect you:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">

                        <div className="bg-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm border border-amber-400/30 hover:bg-white/20 transition-all duration-300">
                            <FaShieldAlt className="text-4xl text-white mx-auto mb-4" />

                            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">
                                Transparency
                            </h3>

                            <p className="text-white/90 text-sm">
                                Clear communication about how we use your data
                            </p>
                        </div>

                        <div className="bg-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm border border-amber-400/30 hover:bg-white/20 transition-all duration-300">
                            <FaUserLock className="text-4xl text-white mx-auto mb-4" />

                            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">
                                Security
                            </h3>

                            <p className="text-white/90 text-sm">
                                Advanced protection for your personal information
                            </p>
                        </div>

                        <div className="bg-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm border border-amber-400/30 hover:bg-white/20 transition-all duration-300 sm:col-span-2 md:col-span-1">
                            <FaDatabase className="text-4xl text-white mx-auto mb-4" />

                            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">
                                Control
                            </h3>

                            <p className="text-white/90 text-sm">
                                You decide how your data is used and shared
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-amber-400/30">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-left max-w-3xl mx-auto">

                            <div>
                                <h4 className="text-lg font-bold mb-3 text-white">
                                    Contact Us
                                </h4>

                                <p className="text-amber-100 text-sm mb-2">
                                    Questions about privacy? We're here to help.
                                </p>

                                <a
                                    href="mailto:niyomugaboetiene53@gmail.com"
                                    className="text-white hover:text-amber-100 font-medium underline text-sm break-all"
                                >
                                    niyomugaboetiene53@gmail.com
                                </a>
                            </div>

                            <div>
                                <h4 className="text-lg font-bold mb-3 text-white">
                                    Policy Updates
                                </h4>

                                <p className="text-amber-100 text-sm leading-relaxed">
                                    We may update this policy. Continued use of HomeFinder after changes constitutes acceptance.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;