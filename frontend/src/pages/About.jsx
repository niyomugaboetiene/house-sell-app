
import {
  FaHome,
  FaUsers,
  FaRocket,
  FaHeart,
  FaMapMarkerAlt,
  FaAward,
  FaHandshake
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Etiene Niyomugabo (temporary)",
      role: "Founder & CEO",
      image: "/team/etiene.jpg",
      description:
        "Passionate about revolutionizing real estate in Rwanda through technology"
    },
    {
      name: "Alice Uwase (temporary)",
      role: "Head of Sales",
      image: "/team/alice.jpg",
      description: "10+ years experience in Rwandan real estate market"
    },
    {
      name: "David Mugisha (temporary)",
      role: "Tech Lead",
      image: "/team/david.jpg",
      description: "Building the future of property technology"
    },
    {
      name: "Marie Iradukunda (temporary)",
      role: "Customer Success",
      image: "/team/marie.jpg",
      description: "Ensuring every user finds their perfect home"
    }
  ];

  const values = [
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Trust & Transparency",
      description:
        "We believe in honest, transparent real estate transactions where everyone wins."
    },
    {
      icon: <FaHeart className="text-3xl" />,
      title: "User First",
      description:
        "Every feature is designed with our users' needs and comfort in mind."
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Innovation",
      description:
        "Constantly improving and adapting to bring you the best property technology."
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Community",
      description:
        "Building connections between buyers, sellers, and agents across Rwanda."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 overflow-hidden">

      <section className="relative py-14 sm:py-20 md:py-24 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">

          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white bg-opacity-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <FaHome className="text-3xl sm:text-4xl text-amber-500" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
            About HomeFinder
          </h1>

          <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed text-amber-100 px-2">
            Revolutionizing real estate in Rwanda, one property at a time
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center text-xs sm:text-sm">

            <span className="bg-white text-amber-500 bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              🏠 Trusted by thousands of Rwandans
            </span>

            <span className="bg-white text-amber-500 bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              📱 Modern property technology
            </span>

          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">

            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-5 sm:mb-6">
                Our Story
              </h2>

              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">

                <p>
                  HomeFinder was born from a simple observation: finding the perfect property in Rwanda
                  should be easier, faster, and more transparent. As the Rwandan real estate market
                  continues to grow rapidly, we saw the need for a modern platform that connects
                  buyers, sellers, and agents seamlessly.
                </p>

                <p>
                  Founded in 2024 by{" "}
                  <a
                    href="https://niyomugaboetiene.vercel.app"
                    className="hover:underline font-bold"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    NIYOMUGABO Etiene
                  </a>
                  , we started with a mission to digitize Rwanda's property market
                  and make home searching an enjoyable experience. From our humble beginnings in Kigali,
                  we've grown to become one of Rwanda's most trusted property platforms.
                </p>

                <p>
                  Today, we're proud to serve thousands of users across the country, helping them
                  find their dream homes, connect with trusted agents, and make informed property
                  decisions with confidence.
                </p>

              </div>
            </div>

            <div className="relative">
              <div className="bg-amber-500 rounded-2xl p-6 sm:p-8 md:p-10 text-white">

                <div className="text-center">
                  <FaMapMarkerAlt className="text-4xl sm:text-5xl mx-auto mb-4 text-amber-200" />

                  <h3 className="text-xl sm:text-2xl font-bold mb-4">
                    Made in Rwanda
                  </h3>

                  <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
                    Proudly built by Rwandans, for Rwandans. We understand the local market,
                    culture, and unique needs of property seekers in our beautiful country.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">

            <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-gray-200">

              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-5 sm:mb-6">
                <FaRocket className="text-xl sm:text-2xl" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
                Our Mission
              </h3>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                To simplify property search and transactions in Rwanda through innovative technology,
                creating a transparent and efficient marketplace where everyone can find their perfect
                space with confidence and ease.
              </p>

            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-gray-200">

              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-5 sm:mb-6">
                <FaAward className="text-xl sm:text-2xl" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
                Our Vision
              </h3>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                To become Rwanda's most trusted property platform, transforming how people discover,
                buy, sell, and rent properties while contributing to the growth of our nation's
                real estate industry.
              </p>

            </div>

          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 sm:mb-12 text-center">
            Our Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">

            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-5 sm:p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300"
              >

                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  {value.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {value.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 sm:mb-12 text-center">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">

            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 sm:p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
              >

                <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white mx-auto mb-4 overflow-hidden">

                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaUsers className="text-2xl" />
                  )}

                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>

                <p className="text-amber-600 font-semibold mb-3 text-sm sm:text-base">
                  {member.role}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

          <h2 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6">
            Join Our Journey
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-amber-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking for your dream home, wanting to sell your property,
            or just curious about Rwanda's real estate market - we're here for you.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">

            <button
              className="w-full sm:w-auto bg-white text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-amber-50 transition-colors"
              onClick={() => navigate("/")}
            >
              Start Property Search
            </button>

            <button
              className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-white hover:text-amber-500 hover:bg-opacity-10 transition-colors"
              onClick={() => navigate("/contact")}
            >
              Contact Our Team
            </button>

          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutUs;
