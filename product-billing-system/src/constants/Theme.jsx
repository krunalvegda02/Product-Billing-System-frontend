export const THEME = {
  DARK: "DARK",
  LIGHT: "LIGHT",
  GENERAL: "GENERAL",
};

export const THEME_CONFIG = {

  [THEME.GENERAL]: {
    BACKGROUND_COLOR: "bg-[#f0f0fa]",
    BACKGROUND_GRADIENT: "bg-gradient-to-br from-[#f6f6fb] to-[#e6e6f4]",
    TEXT_COLOR: "text-[#212121]",
    BG_HEADER: "bg-[#fdfdfd]",
    BG_ASIDE: "bg-[#fdfdfd]",
    BG_ACCENT: "bg-[#FF6877]",
    BG_SECONDARY_ACCENT: "bg-[#BC2634]",
    HOVER_SECONDARY_ACCENT: "hover:bg-[#BC2634]",
    BORDER_COLOR: "border-[#FF6877]",
    BUTTON: "bg-[#FF6877] text-white hover:bg-[#BC2634]",
    SHADOW: "shadow-md",

    // Typography
    FONT_PRIMARY: "font-sans",
    FONT_SECONDARY: "font-serif",
    HEADER_TEXT_SIZE: "text-3xl",
    BODY_TEXT_SIZE: "text-sm",

    // Input Styles
    INPUT: "bg-white border border-[#bdbdbd] placeholder:text-[#757575] focus:outline-none focus:ring-2 focus:ring-[#ff5722]",

    // Badge Styles
    BADGE: "bg-[#ff7043] text-white px-2 py-1 rounded-full text-xs font-bold",

    // Modal
    MODAL_OVERLAY: "bg-black bg-opacity-50",
    MODAL_BG: "bg-white p-6 rounded-xl shadow-xl",

    // Table
    TABLE_HEADER: "bg-[#eeeeee] text-[#212121] font-semibold",
    TABLE_ROW_HOVER: "hover:bg-[#f5f5f5]",

    // Link & Icon
    LINK: "text-[#ff5722] hover:text-[#ff7043]",
    ICON_COLOR: "text-[#ff5722]",

    // Card
    CARD_BG: "bg-white shadow-md border border-[#eeeeee] rounded-xl p-3",

    // Status colors
    SUCCESS: "text-green-600",
    WARNING: "text-yellow-600",
    ERROR: "text-red-600",
  },
};
