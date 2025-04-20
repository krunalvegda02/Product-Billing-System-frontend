import { THEME, THEME_CONFIG } from "../../../constants/Theme";

const currentTheme = THEME.LIGHT;

const HomeView = () => (
  <div className={`${THEME_CONFIG[currentTheme].BACKGROUND_GRADIENT} min-h-screen p-6`}>
    {/* Header Section */}
    <h1 className={`${THEME_CONFIG[currentTheme].TEXT_COLOR} text-3xl mb-4`}>
      Welcome to Roast & Relax Café
    </h1>
    
    {/* Button */}
    <button className={`${THEME_CONFIG[currentTheme].BUTTON} px-6 py-2 rounded`}>
      Order Now
    </button>

    {/* Accent Element */}
    <div className={`${THEME_CONFIG[currentTheme].ACCENT} p-4 rounded-lg mt-6`}>
      <p className={`${THEME_CONFIG[currentTheme].TEXT_COLOR} text-lg`}>
        Enjoy the best flavors of India with a cozy atmosphere.
      </p>
    </div>

    {/* Input Example */}
    <div className="mt-8">
      <input
        type="text"
        placeholder="Enter your name"
        className={`${THEME_CONFIG[currentTheme].INPUT} px-4 py-2 rounded-lg w-full max-w-md`}
      />
    </div>

    {/* Badge Example */}
    <div className="mt-8">
      <span className={`${THEME_CONFIG[currentTheme].BADGE}`}>
        New Arrival: Masala Chai!
      </span>
    </div>

    {/* Table Header Example */}
    <div className="mt-8">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className={`${THEME_CONFIG[currentTheme].TABLE_HEADER} px-4 py-2`}>Dish</th>
            <th className={`${THEME_CONFIG[currentTheme].TABLE_HEADER} px-4 py-2`}>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`${THEME_CONFIG[currentTheme].TABLE_ROW_HOVER}`}>
            <td className="px-4 py-2">Butter Chicken</td>
            <td className="px-4 py-2">₹400</td>
          </tr>
          <tr className={`${THEME_CONFIG[currentTheme].TABLE_ROW_HOVER}`}>
            <td className="px-4 py-2">Aloo Gobi</td>
            <td className="px-4 py-2">₹200</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Status Example */}
    <div className="mt-8">
      <p className={`${THEME_CONFIG[currentTheme].SUCCESS} text-lg`}>
        Your order is confirmed! Enjoy your meal.
      </p>
      <p className={`${THEME_CONFIG[currentTheme].WARNING} text-lg`}>
        Please note: There may be a slight delay during peak hours.
      </p>
      <p className={`${THEME_CONFIG[currentTheme].ERROR} text-lg`}>
        Unfortunately, the dish you ordered is out of stock.
      </p>
    </div>

    {/* Modal Example */}
    <div className={`${THEME_CONFIG[currentTheme].MODAL_OVERLAY} fixed inset-0 flex justify-center items-center`}>
      <div className={`${THEME_CONFIG[currentTheme].MODAL_BG} w-1/2`}>
        <h2 className={`${THEME_CONFIG[currentTheme].TEXT_COLOR} text-2xl mb-4`}>
          Special Offer
        </h2>
        <p className={`${THEME_CONFIG[currentTheme].TEXT_COLOR} mb-6`}>
          Get 10% off on your next order! Use code ROAST10.
        </p>
        <button className={`${THEME_CONFIG[currentTheme].BUTTON} px-6 py-2 rounded`}>
          Claim Offer
        </button>
      </div>
    </div>
  </div>
);

export default HomeView;
