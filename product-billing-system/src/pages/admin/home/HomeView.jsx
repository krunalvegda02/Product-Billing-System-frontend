import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { useState } from "react";

const HomeView = () => {
  const { theme } = useTheme();
  const Navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => Navigate("/login");
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <div className={`min-h-screen ${theme.BACKGROUND_GRADIENT}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${theme.BG_HEADER}/80 backdrop-blur-md z-50 border-b ${theme.BORDER_COLOR}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 ${theme.BG_ACCENT} rounded-2xl flex items-center justify-center ${theme.SHADOW}`}>
                <span className="text-white font-bold text-xl">🍴</span>
              </div>
              <div>
                <span className={`text-2xl font-light ${theme.TEXT_COLOR} block leading-5`}>Global Flavors</span>
                <span className={`${theme.TEXT_SECONDARY} text-xs`}>Since 2010</span>
              </div>
            </div>

            <div className="hidden md:flex space-x-8">
              {["Home", "Menu", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`${item.toLowerCase()}`}
                  className={`${theme.TEXT_COLOR} hover:${theme.TEXT_COLOR} transition-all duration-300 font-medium relative group`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${theme.BG_ACCENT} transition-all duration-300 group-hover:w-full`}></span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={openLoginModal}
                className={`${theme.BUTTON_SECONDARY} px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all duration-300 group`}
              >
                <span className="group-hover:scale-105 transition-transform">Login</span>
              </button>
              <Link to="/menu" className={`${theme.BUTTON} px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all duration-300 group`}>
                <span className="group-hover:scale-105 transition-transform">Order Now</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-10 w-80 h-80 ${theme.BG_ACCENT}/20 rounded-full blur-3xl animate-float`}></div>
          <div className={`absolute top-40 right-20 w-96 h-96 ${theme.BG_SECONDARY_ACCENT}/20 rounded-full blur-3xl animate-float-delayed`}></div>
          <div className={`absolute bottom-40 left-1/4 w-64 h-64 ${theme.BG_ACCENT}/15 rounded-full blur-3xl animate-float-slow`}></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* Animated Badge */}
          <div
            className={`inline-flex items-center space-x-3 ${theme.CARD_BG} backdrop-blur-md rounded-2xl px-6 py-3 mb-8 border ${theme.BORDER_COLOR} animate-pulse`}
          >
            <div className={`w-3 h-3 ${theme.BG_ACCENT} rounded-full animate-bounce`}></div>
            <span className={`${theme.TEXT_COLOR} font-medium text-sm`}>🍜 Now serving Chinese, Indian & South Indian Delights!</span>
          </div>

          {/* Main Heading */}
          <h1 className={`text-6xl md:text-8xl font-light mb-6 ${theme.TEXT_COLOR} leading-tight`}>
            Taste. Explore.
            <span className={`block font-serif italic mt-2 ${theme.TEXT_COLOR}`}>Enjoy.</span>
          </h1>

          {/* Subheading */}
          <p className={`text-xl md:text-2xl ${theme.TEXT_SECONDARY} mb-12 max-w-3xl mx-auto leading-relaxed font-light`}>
            From spicy Indian curries to flavorful Chinese stir-fries and authentic South Indian meals — our kitchen brings the world to your plate.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              to="/menu"
              className={`group ${theme.BUTTON} px-10 py-4 rounded-2xl font-semibold text-lg ${theme.SHADOW} transition-all duration-500 transform hover:scale-105 flex items-center space-x-3`}
            >
              <span>Explore Our Menu</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <button
              onClick={openLoginModal}
              className={`group border-2 ${theme.BORDER_COLOR} ${theme.TEXT_COLOR} px-10 py-4 rounded-2xl font-semibold text-lg hover:${theme.BG_ACCENT} hover:text-white transition-all duration-500 transform hover:scale-105 flex items-center space-x-3`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Member Login</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            {[
              { number: "200+", label: "Dishes Across Cuisines" },
              { number: "500+", label: "Happy Customers Daily" },
              { number: "5★", label: "Top-Rated Experience" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${theme.TEXT_COLOR} mb-1`}>{stat.number}</div>
                <div className={`${theme.TEXT_SECONDARY} text-sm`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-light ${theme.TEXT_COLOR} mb-4`}>Why Dine With Us?</h2>
            <p className={`${theme.TEXT_SECONDARY} text-lg max-w-2xl mx-auto`}>
              More than just food, we deliver flavors, experiences, and memories that bring families and friends together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🍛",
                title: "Authentic Recipes",
                description: "Traditional Indian, Chinese & South Indian recipes prepared by expert chefs",
              },
              {
                icon: "🥢",
                title: "Diverse Menu",
                description: "From noodles to biryanis, dosas to Manchurian — all in one place",
              },
              {
                icon: "👨‍🍳",
                title: "Expert Chefs",
                description: "Culinary masters with decades of experience in multi-cuisine cooking",
              },
              {
                icon: "🌿",
                title: "Fresh Ingredients",
                description: "Locally sourced produce and high-quality spices in every dish",
              },
            ].map((feature, index) => (
              <div key={index} className="group text-center">
                <div
                  className={`w-20 h-20 ${theme.CARD_BG} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 ${theme.CARD_HOVER}`}
                >
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className={`text-xl font-semibold ${theme.TEXT_COLOR} mb-3`}>{feature.title}</h3>
                <p className={`${theme.TEXT_SECONDARY} leading-relaxed`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-light ${theme.TEXT_COLOR} mb-4`}>What Our Guests Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Aarav Patel",
                role: "Food Enthusiast",
                text: "Best butter chicken and paneer tikka I’ve had in years! Truly authentic taste.",
                rating: "★★★★★",
              },
              {
                name: "Sophia Lee",
                role: "Travel Blogger",
                text: "The dosa was crisp, the chutneys perfect, and the Chinese platter was just as amazing.",
                rating: "★★★★★",
              },
              {
                name: "David Johnson",
                role: "Local Guide",
                text: "A rare gem — perfect mix of Indian, Chinese, and South Indian cuisines under one roof.",
                rating: "★★★★☆",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`${theme.CARD_BG} backdrop-blur-lg rounded-3xl p-8 border ${theme.BORDER_COLOR} hover:${theme.BORDER_COLOR} transition-all duration-500 ${theme.CARD_HOVER}`}
              >
                <div className={`${theme.ICON_COLOR} text-lg mb-4`}>{testimonial.rating}</div>
                <p className={`${theme.TEXT_SECONDARY} mb-6 italic`}>"{testimonial.text}"</p>
                <div>
                  <div className={`font-semibold ${theme.TEXT_COLOR}`}>{testimonial.name}</div>
                  <div className={`${theme.TEXT_SECONDARY} text-sm`}>{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className={`${theme.BG_ACCENT} rounded-3xl p-12 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-light text-white mb-4">Hungry for Something Delicious?</h2>
              <p className="text-white/90 text-lg mb-8">Join us for a flavorful journey across India, China, and beyond.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/menu"
                  className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  View Full Menu
                </Link>
                <button
                  onClick={openLoginModal}
                  className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:scale-105"
                >
                  Reserve Your Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${theme.BG_HEADER} backdrop-blur-lg border-t ${theme.BORDER_COLOR}`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-10 h-10 ${theme.BG_ACCENT} rounded-xl flex items-center justify-center`}>
                  <span className="text-white text-lg">🍴</span>
                </div>
                <span className={`text-2xl font-light ${theme.TEXT_COLOR}`}>Global Flavors</span>
              </div>
              <p className={`${theme.TEXT_SECONDARY} text-sm leading-relaxed`}>
                Where Chinese spices meet Indian curries and South Indian flavors. Serving happiness on every plate since 2010.
              </p>
            </div>

            {[
              {
                title: "Visit Us",
                items: ["456 Flavor Street", "Foodie Town, FT 67890", "Mon-Sun: 11AM - 11PM"],
              },
              {
                title: "Connect",
                items: ["contact@globalflavors.com", "+91 98765 43210", "Follow us on Social Media"],
              },
              {
                title: "Quick Links",
                items: [
                  <button key="login" onClick={openLoginModal} className={`hover:${theme.TEXT_COLOR} transition-colors`}>
                    Member Login
                  </button>,
                  <Link key="menu" to="/menu" className={`hover:${theme.TEXT_COLOR} transition-colors`}>
                    Menu
                  </Link>,
                  <a key="contact" href="#contact" className={`hover:${theme.TEXT_COLOR} transition-colors`}>
                    Contact
                  </a>,
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className={`${theme.TEXT_COLOR} font-semibold mb-4`}>{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className={`${theme.TEXT_SECONDARY} text-sm hover:${theme.TEXT_COLOR} transition-colors cursor-pointer`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={`border-t ${theme.BORDER_COLOR} mt-8 pt-8 text-center`}>
            <p className={`${theme.TEXT_SECONDARY} text-sm`}>© 2024 Global Flavors. Crafted with ❤️ and a world of spices.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeView;
