import { THEME_CONFIG } from "../../../constants/Theme";
import { Link } from "react-router-dom";

const HomeView = ({ 
  theme = "GENERAL", 
  popularDishes = [], 
  customerFeedback = [],
  showAllFeedback = false,
  onShowMoreFeedback 
}) => {
  const themeConfig = THEME_CONFIG[theme];
  
  return (
    <div className={`${themeConfig.BACKGROUND_GRADIENT} min-h-screen p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 py-12">
          <div className="inline-block p-3 rounded-full bg-white shadow-lg mb-6">
            <div className="text-4xl">☕</div>
          </div>
          <h1 className={`${themeConfig.TEXT_COLOR} text-4xl md:text-5xl font-bold mb-6 ${themeConfig.FONT_PRIMARY}`}>
            Welcome to <span className="text-[#FF6877]">Roast & Relax</span> Café
          </h1>
          <p className={`${themeConfig.TEXT_COLOR} text-lg md:text-xl max-w-2xl mx-auto mb-10 ${themeConfig.FONT_SECONDARY}`}>
            Experience authentic Indian cuisine in a warm and inviting atmosphere
          </p>
          
          <Link to="/menu" className="inline-block">
            <button className={`${themeConfig.BUTTON} px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${themeConfig.SHADOW} flex items-center mx-auto`}>
              Order Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className={`${themeConfig.CARD_BG} p-6 rounded-2xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl`}>
            <div className={`${themeConfig.BG_ACCENT} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <span className="text-white text-2xl">☕</span>
            </div>
            <h3 className={`${themeConfig.TEXT_COLOR} text-xl font-semibold mb-3`}>Premium Coffee</h3>
            <p className={`${themeConfig.TEXT_COLOR} ${themeConfig.BODY_TEXT_SIZE}`}>Freshly brewed from select Indian coffee beans</p>
          </div>
          
          <div className={`${themeConfig.CARD_BG} p-6 rounded-2xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl`}>
            <div className={`${themeConfig.BG_ACCENT} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <span className="text-white text-2xl">🍛</span>
            </div>
            <h3 className={`${themeConfig.TEXT_COLOR} text-xl font-semibold mb-3`}>Authentic Cuisine</h3>
            <p className={`${themeConfig.TEXT_COLOR} ${themeConfig.BODY_TEXT_SIZE}`}>Traditional recipes passed down through generations</p>
          </div>
          
          <div className={`${themeConfig.CARD_BG} p-6 rounded-2xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl`}>
            <div className={`${themeConfig.BG_ACCENT} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <span className="text-white text-2xl">🌿</span>
            </div>
            <h3 className={`${themeConfig.TEXT_COLOR} text-xl font-semibold mb-3`}>Cozy Ambiance</h3>
            <p className={`${themeConfig.TEXT_COLOR} ${themeConfig.BODY_TEXT_SIZE}`}>Relax and unwind in our comfortable setting</p>
          </div>
        </div>

        {/* Accent Element */}
        <div className={`${themeConfig.BG_ACCENT} p-8 rounded-2xl mb-16 text-center ${themeConfig.SHADOW} relative overflow-hidden`}>
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white opacity-10"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white opacity-10"></div>
          <p className={`text-white text-xl md:text-2xl font-medium ${themeConfig.FONT_SECONDARY} relative z-10`}>
            "Enjoy the best flavors of India with a cozy atmosphere."
          </p>
        </div>

        {/* Popular Dishes with Images */}
        <div className="mb-16">
          <h2 className={`${themeConfig.TEXT_COLOR} text-3xl font-bold mb-10 text-center ${themeConfig.FONT_PRIMARY}`}>
            Our <span className="text-[#FF6877]">Popular</span> Dishes
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDishes.map((dish, index) => (
              <div key={index} className={`${themeConfig.CARD_BG} rounded-xl overflow-hidden ${themeConfig.SHADOW} transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg`}>
                <div className="relative h-40 bg-gradient-to-r from-amber-400 to-orange-500 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl text-white">{dish.emoji}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white text-sm font-semibold truncate">{dish.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`${themeConfig.TEXT_COLOR} font-semibold text-sm truncate`}>{dish.name}</span>
                    <span className={`${themeConfig.BG_ACCENT} text-white px-2 py-1 rounded-full text-xs font-bold`}>{dish.price}</span>
                  </div>
                  <p className={`${themeConfig.TEXT_COLOR} ${themeConfig.BODY_TEXT_SIZE} mb-3 line-clamp-2`}>
                    {dish.description}
                  </p>
                  <button className={`${themeConfig.BUTTON} w-full py-1.5 rounded-lg text-xs font-semibold`}>
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/menu" className={`inline-flex items-center ${themeConfig.LINK} font-semibold text-sm`}>
              View Full Menu
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Customer Feedback Section */}
        <div className="mb-16">
          <h2 className={`${themeConfig.TEXT_COLOR} text-3xl font-bold mb-10 text-center ${themeConfig.FONT_PRIMARY}`}>
            Customer <span className="text-[#FF6877]">Feedback</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customerFeedback.slice(0, showAllFeedback ? customerFeedback.length : 2).map((feedback, index) => (
              <div key={index} className={`${themeConfig.CARD_BG} p-5 rounded-xl ${themeConfig.SHADOW}`}>
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 bg-[#FF6877] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {feedback.initials}
                  </div>
                  <div>
                    <h4 className={`${themeConfig.TEXT_COLOR} font-semibold text-sm`}>{feedback.customerName}</h4>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className={`${themeConfig.TEXT_COLOR} ${themeConfig.BODY_TEXT_SIZE} italic text-xs`}>
                  "{feedback.comment}"
                </p>
              </div>
            ))}
          </div>
          
          {customerFeedback.length > 2 && (
            <div className="text-center mt-8">
              <button 
                onClick={onShowMoreFeedback}
                className={`${themeConfig.BUTTON} px-6 py-2 rounded-full text-sm font-semibold`}
              >
                {showAllFeedback ? 'Show Less' : `Show More (${customerFeedback.length - 2})`}
              </button>
            </div>
          )}
        </div>

        {/* Cafe Information Section */}
        <div className={`${themeConfig.CARD_BG} rounded-xl p-6 mb-12 ${themeConfig.SHADOW}`}>
          <h2 className={`${themeConfig.TEXT_COLOR} text-xl font-bold mb-5 text-center`}>
            Visit Us Today
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="text-center">
              <div className={`${themeConfig.BG_ACCENT} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className={`${themeConfig.TEXT_COLOR} font-semibold mb-1 text-sm`}>Location</h3>
              <p className={`${themeConfig.TEXT_COLOR} ${themeConfig.BODY_TEXT_SIZE}`}>
                123 Spice Street<br />
                Mumbai, India
              </p>
            </div>
            
            <div className="text-center">
              <div className={`${themeConfig.BG_ACCENT} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`${themeConfig.TEXT_COLOR} font-semibold mb-1 text-sm`}>Opening Hours</h3>
              <p className={`${themeConfig.TEXT_COLOR} ${themeConfig.BODY_TEXT_SIZE}`}>
                Mon-Sun: 8AM - 11PM<br />
                Weekend: 8AM - 1AM
              </p>
            </div>
            
            <div className="text-center">
              <div className={`${themeConfig.BG_ACCENT} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className={`${themeConfig.TEXT_COLOR} font-semibold mb-1 text-sm`}>Contact Us</h3>
              <p className={`${themeConfig.TEXT_COLOR} ${themeConfig.BODY_TEXT_SIZE}`}>
                +91 1234567890<br />
                info@roastrelax.com
              </p>
            </div>
          </div>
        </div>

        {/* Special Offers Section */}
        <div className={`${themeConfig.BG_ACCENT} rounded-xl p-6 mb-12 text-center ${themeConfig.SHADOW} relative overflow-hidden`}>
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white opacity-10"></div>
          <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white opacity-10"></div>
          
          <h2 className="text-white text-xl md:text-2xl font-bold mb-3">Special Weekend Offer!</h2>
          <p className="text-white text-sm mb-4 max-w-2xl mx-auto">
            Enjoy 15% off on all beverages and desserts every Friday & Saturday evening from 6PM to 9PM.
          </p>
          <button className="bg-white text-[#FF6877] px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;