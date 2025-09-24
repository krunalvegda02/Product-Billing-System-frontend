import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

const HomeView = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme.BACKGROUND_GRADIENT}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${theme.BG_HEADER}/80 backdrop-blur-md z-50 border-b ${theme.BORDER_COLOR}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className={`w-10 h-10 ${theme.BG_ACCENT} rounded-full flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className={`text-2xl font-light ${theme.TEXT_COLOR}`}>Roast & Relax</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'Menu', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className={`${theme.TEXT_COLOR} ${theme.LINK} transition-colors font-medium`}
                >
                  {item}
                </a>
              ))}
            </div>
            
            <Link 
              to="/menu" 
              className={`${theme.BUTTON} px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300`}
            >
              Order Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${theme.BACKGROUND_COLOR}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/20 to-amber-50/20"></div>
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className={`inline-flex items-center space-x-2 ${theme.CARD_BG} backdrop-blur-sm rounded-full px-4 py-2 mb-8 border ${theme.BORDER_COLOR}`}>
            <div className={`w-2 h-2 ${theme.BG_ACCENT} rounded-full animate-pulse`}></div>
            <span className={`${theme.TEXT_SECONDARY} text-sm font-medium`}>Now serving authentic Indian cuisine</span>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-light mb-6 ${theme.TEXT_COLOR} leading-tight`}>
            Where <span className="font-serif italic">Flavor</span> Meets
            <span className={`block ${theme.BG_ACCENT} bg-clip-text text-transparent`}>Serenity</span>
          </h1>
          
          <p className={`text-xl ${theme.TEXT_SECONDARY} mb-12 max-w-2xl mx-auto leading-relaxed`}>
            Experience the perfect blend of aromatic coffees, authentic Indian delicacies, 
            and a tranquil ambiance designed for your ultimate relaxation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/menu" 
              className={`group ${theme.BUTTON} px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2`}
            >
              <span>Explore Our Menu</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <button className={`group border ${theme.BORDER_COLOR} ${theme.TEXT_COLOR} px-8 py-4 rounded-full font-medium hover:border-slate-400 transition-all duration-300 flex items-center space-x-2`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Watch Story</span>
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 animate-bounce">
          <svg className={`w-6 h-6 ${theme.ICON_SECONDARY}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${theme.BACKGROUND_COLOR}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`${theme.BG_ACCENT} font-semibold tracking-wider`}>EXPERIENCE</span>
            <h2 className={`text-4xl font-light ${theme.TEXT_COLOR} mt-2`}>The Roast & Relax Difference</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "☕",
                title: "Artisan Coffee Blends",
                description: "Single-origin beans roasted to perfection, delivering rich flavors and aromatic experiences in every cup.",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: "🍛",
                title: "Authentic Indian Cuisine",
                description: "Traditional recipes crafted with modern techniques, using locally sourced, fresh ingredients daily.",
                color: "from-rose-500 to-pink-500"
              },
              {
                icon: "🌿",
                title: "Sustainable Practices",
                description: "Eco-friendly packaging, zero-waste initiatives, and support for local farmers and communities.",
                color: "from-emerald-500 to-teal-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`relative z-10 ${theme.CARD_BG} p-8 rounded-2xl hover:shadow-xl transition-all duration-500 h-full ${theme.CARD_HOVER}`}>
                  <div className={`w-16 h-16 ${theme.BG_ACCENT} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-semibold ${theme.TITLE_TEXT} mb-4`}>{feature.title}</h3>
                  <p className={`${theme.TEXT_SECONDARY} leading-relaxed`}>{feature.description}</p>
                </div>
                <div className={`absolute inset-0 ${theme.BG_ACCENT} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atmosphere Section */}
      <section className={`py-20 ${theme.BACKGROUND_GRADIENT} ${theme.TEXT_COLOR}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className={`${theme.ICON_COLOR} font-semibold tracking-wider`}>ATMOSPHERE</span>
              <h2 className="text-4xl font-light mt-2 mb-6">Designed for Peaceful Moments</h2>
              <p className={`${theme.TEXT_SECONDARY} text-lg leading-relaxed mb-8`}>
                Our space is carefully curated to provide a sanctuary from the hustle of daily life. 
                With comfortable seating, soft lighting, and subtle aromas, every corner invites you 
                to unwind and savor the moment.
              </p>
              
              <div className="space-y-4">
                {[
                  "Comfortable lounge seating with privacy partitions",
                  "Soft, warm lighting for relaxed ambiance",
                  "Curated background music at perfect volume",
                  "Free high-speed Wi-Fi for digital nomads",
                  "Power outlets at every table"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 ${theme.BG_ACCENT} rounded-full flex items-center justify-center`}>
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className={theme.TEXT_SECONDARY}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className={`${theme.BG_ACCENT} h-64 rounded-2xl`}></div>
                  <div className={`${theme.BG_ASIDE} h-32 rounded-2xl`}></div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className={`${theme.BG_ASIDE} h-32 rounded-2xl`}></div>
                  <div className={`${theme.BG_ACCENT} h-64 rounded-2xl`}></div>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-20 h-20 ${theme.BACKGROUND_COLOR}/10 backdrop-blur-sm rounded-full flex items-center justify-center border ${theme.BORDER_COLOR}/20`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Items */}
      <section className={`py-20 ${theme.BACKGROUND_COLOR}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`${theme.BG_ACCENT} font-semibold tracking-wider`}>SPECIALTIES</span>
            <h2 className={`text-4xl font-light ${theme.TEXT_COLOR} mt-2`}>Our Signature Creations</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Masala Chai Latte", emoji: "🫖", price: "₹180", desc: "Spiced tea with steamed milk" },
              { name: "Filter Coffee", emoji: "☕", price: "₹150", desc: "Traditional South Indian brew" },
              { name: "Butter Chicken", emoji: "🍗", price: "₹420", desc: "Creamy tomato-based curry" },
              { name: "Gulab Jamun", emoji: "🍮", price: "₹160", desc: "Sweet milk dumplings" }
            ].map((item, index) => (
              <div key={index} className={`group relative ${theme.CARD_BG} rounded-2xl p-6 hover:${theme.BG_ACCENT}/10 transition-all duration-500 ${theme.CARD_HOVER}`}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
                <h3 className={`font-semibold ${theme.TEXT_COLOR} mb-1`}>{item.name}</h3>
                <p className={`${theme.TEXT_SECONDARY} text-sm mb-3`}>{item.desc}</p>
                <div className="flex justify-between items-center">
                  <span className={`${theme.BG_ACCENT} font-bold`}>{item.price}</span>
                  <button className={`${theme.ICON_SECONDARY} ${theme.LINK}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={`py-20 ${theme.BG_ACCENT}`}>
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-light text-white mb-6">Ready to Experience Serenity?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Visit us today and discover why Roast & Relax is more than just a café—it's an experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-white text-slate-800 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Make a Reservation
            </Link>
            <button className="border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
              Call Us: +91 12345 67890
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${theme.BG_ASIDE} ${theme.TEXT_SECONDARY}`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-8 h-8 ${theme.BG_ACCENT} rounded-full flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className={`${theme.TEXT_COLOR} text-xl font-light`}>Roast & Relax</span>
              </div>
              <p className={`${theme.TEXT_SECONDARY} text-sm leading-relaxed`}>
                Where every cup tells a story and every meal creates a memory.
              </p>
            </div>
            
            {[
              {
                title: "Hours",
                items: ["Mon-Fri: 8AM - 11PM", "Sat-Sun: 8AM - 1AM", "Holidays: 9AM - 10PM"]
              },
              {
                title: "Contact",
                items: ["123 Spice Street", "Mumbai, India", "info@roastrelax.com"]
              },
              {
                title: "Follow Us",
                items: ["Instagram", "Facebook", "Twitter"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className={`${theme.TEXT_COLOR} font-semibold mb-4`}>{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className={`text-sm hover:${theme.TEXT_COLOR} transition-colors cursor-pointer`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className={`border-t ${theme.BORDER_COLOR} mt-8 pt-8 text-center text-sm`}>
            <p>© 2024 Roast & Relax Café. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeView;