import { useState } from "react";
import { FaSearch, FaPhone, FaEnvelope, FaQuestionCircle, FaHome, FaUser, FaHeart, FaShoppingCart, FaKey, FaComments } from "react-icons/fa";

const GetHelp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const helpCategories = [
    {
      id: "buying",
      icon: <FaHome className="text-2xl" />,
      title: "Buying & Renting",
      questions: [
        {
          question: "How do I search for houses to buy or rent?",
          answer: "Use the 'Buy' or 'Rent' sections in the navigation. You can filter by location, price range, bedrooms, bathrooms, and property type. Save your searches to get notified about new listings."
        },
        {
          question: "How do I contact property owners or sellers?",
          answer: "Click the 'View Details' button on any property listing, then use the contact information provided or send a message directly through our platform."
        },
        {
          question: "What's the difference between buying and renting listings?",
          answer: "Buying listings are for permanent ownership, while renting listings are for temporary occupancy. Each has different pricing, requirements, and contact processes."
        }
      ]
    },
    {
      id: "selling",
      icon: <FaKey className="text-2xl" />,
      title: "Selling Properties",
      questions: [
        {
          question: "How do I list my property for sale?",
          answer: "Go to your dashboard and click 'Add House'. Fill in property details, upload photos, set the price, and specify if it's for sale or rent. Your listing will be visible after verification."
        },
        {
          question: "What information do I need to list a property?",
          answer: "You'll need: property title, description, price, location, bedrooms, bathrooms, square footage, photos, and contact information. The more details, the better for potential buyers."
        },
        {
          question: "How do I manage my property listings?",
          answer: "Go to 'My Properties' in your dashboard to view, edit, or remove your listings. You can also see views and interest in your properties."
        }
      ]
    },
    {
      id: "account",
      icon: <FaUser className="text-2xl" />,
      title: "Account & Profile",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' in the top navigation. You'll need to provide your email, create a password, and fill in basic information. Choose between 'customer' or 'seller' role based on your needs."
        },
        {
          question: "How do I update my profile picture and information?",
          answer: "Go to your profile by clicking your user icon in the navigation. You can upload a profile picture and update your personal information in the settings."
        },
        {
          question: "I forgot my password. How do I reset it?",
          answer: "Click 'Login' then 'Forgot Password'. Enter your email address and we'll send you a password reset link."
        }
      ]
    },
    {
      id: "favorites",
      icon: <FaHeart className="text-2xl" />,
      title: "Favorites & Likes",
      questions: [
        {
          question: "How do I save properties to favorites?",
          answer: "Click the heart icon on any property listing. The heart will turn red when the property is added to your favorites. You can view all your favorite properties in the 'Favorite' section."
        },
        {
          question: "Where can I see my liked properties?",
          answer: "Go to the 'Favorite' section in the navigation to see all properties you've liked. You can organize them and get back to them easily."
        },
        {
          question: "Can I share my favorite properties with others?",
          answer: "Currently, you can view your favorites in your account. Sharing functionality is coming soon in future updates."
        }
      ]
    },
    {
      id: "cart",
      icon: <FaShoppingCart className="text-2xl" />,
      title: "Property Cart",
      questions: [
        {
          question: "What is the property cart?",
          answer: "The cart shows properties you've added for consideration. It helps you compare and keep track of homes you're interested in before making decisions."
        },
        {
          question: "How do I add properties to my cart?",
          answer: "Properties are automatically added to your cart when you show interest. You can view them in the 'Cart' section to compare and manage your selections."
        },
        {
          question: "How many properties can I have in my cart?",
          answer: "There's no limit! Add as many properties as you want to compare and consider for your home search."
        }
      ]
    }
  ];

  const popularArticles = [
    "How to filter property searches effectively",
    "Understanding property pricing in different areas",
    "Tips for taking great property photos",
    "How to contact sellers directly",
    "Managing your property notifications",
    "Understanding the verification process"
  ];

  const filteredQuestions = helpCategories.flatMap(category => 
    category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredCategories = activeCategory === "all" 
    ? helpCategories 
    : helpCategories.filter(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Get Help with HomeFinder
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-amber-100">
            Find answers about buying, selling, and managing properties
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search for help with properties, accounts, favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl border-0 text-gray-900 text-lg focus:ring-2 focus:ring-amber-300 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Quick Support Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl bg-amber-50 border border-amber-200 hover:shadow-md transition-all duration-300">
              <FaPhone className="text-3xl text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Get immediate help with property issues</p>
              <a href="tel:+250790000000" className="text-amber-600 font-semibold hover:text-amber-700">
                +250 790 000 000
              </a>
            </div>

            <div className="text-center p-6 rounded-2xl bg-amber-50 border border-amber-200 hover:shadow-md transition-all duration-300">
              <FaEnvelope className="text-3xl text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Detailed help within 24 hours</p>
              <a href="mailto:support@homefinder.com" className="text-amber-600 font-semibold hover:text-amber-700">
                support@homefinder.com
              </a>
            </div>

            <div className="text-center p-6 rounded-2xl bg-amber-50 border border-amber-200 hover:shadow-md transition-all duration-300">
              <FaComments className="text-3xl text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Real-time help with our team</p>
              <button className="text-amber-600 font-semibold hover:text-amber-700">
                Start Chat Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Help Topics</h3>
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeCategory === "all"
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  All Topics
                </button>
                {helpCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                      activeCategory === category.id
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {category.icon}
                      <span>{category.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              {searchQuery ? (
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-6">
                    Search Results for "{searchQuery}"
                  </h2>
                  {filteredQuestions.length > 0 ? (
                    <div className="space-y-6">
                      {filteredQuestions.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{item.question}</h3>
                          <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-2xl">
                      <FaQuestionCircle className="text-4xl text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                      <p className="text-gray-600">Try different keywords or browse our help topics</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredCategories.map((category) => (
                    <div key={category.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white">
                          {category.icon}
                        </div>
                        <h2 className="text-3xl font-black text-gray-900">{category.title}</h2>
                      </div>
                      
                      <div className="space-y-6">
                        {category.questions.map((item, index) => (
                          <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.question}</h3>
                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">Need More Help?</h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Our Rwanda-based support team understands the local property market and is here to help you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-amber-50 transition-colors">
              Contact Support Team
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              Visit Our Office
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-amber-400 border-opacity-30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
              <div>
                <h4 className="text-lg font-bold mb-3 text-white">Contact Information</h4>
                <p className="text-amber-100 text-sm mb-2">
                  <strong>Phone:</strong> +250 790 000 000
                </p>
                <p className="text-amber-100 text-sm mb-2">
                  <strong>Email:</strong> support@homefinder.com
                </p>
                <p className="text-amber-100 text-sm">
                  <strong>Hours:</strong> Mon-Sun, 7AM-9PM
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3 text-white">Office Location</h4>
                <p className="text-amber-100 text-sm">
                  Kigali, Rwanda<br />
                  Visit us for in-person property consultation and support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetHelp;