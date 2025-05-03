export const THEME = {
  DARK: "DARK",
  LIGHT: "LIGHT",
  GENERAL: "GENERAL",
};

export const THEME_CONFIG = {
  [THEME.DARK]: {
    BACKGROUND_COLOR: "bg-[#121212]",
    BACKGROUND_GRADIENT: "bg-gradient-to-br from-[#1a1a1a] via-[#333333] to-[#121212]",
    TEXT_COLOR: "text-white",
    BG_ACCENT: "bg-[#ff7043]",
    BG_SECONDARY_ACCENT: "bg-[#ff5722]",
    BORDER_COLOR: "border-[#ff7043]",
    BUTTON: "bg-[#ff5722] text-white hover:bg-[#ff7043]",
    SHADOW: "shadow-lg",

    // Typography
    FONT_PRIMARY: "font-serif",
    FONT_SECONDARY: "font-sans",
    HEADER_TEXT_SIZE: "text-4xl",
    BODY_TEXT_SIZE: "text-base",

    // Input Styles
    INPUT: "bg-[#333333] border border-[#ff7043] placeholder:text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#ff5722]",

    // Badge Styles
    BADGE: "bg-[#ff7043] text-white px-2 py-1 rounded-full text-xs font-bold",

    // Modal
    MODAL_OVERLAY: "bg-black bg-opacity-70",
    MODAL_BG: "bg-[#121212] p-6 rounded-xl shadow-xl",

    // Table
    TABLE_HEADER: "bg-[#333333] text-white font-semibold",
    TABLE_ROW_HOVER: "hover:bg-[#444444]",

    // Link & Icon
    LINK: "text-[#ff7043] hover:text-[#ff5722]",
    ICON_COLOR: "text-[#ff7043]",

    // Card
    CARD_BG: "bg-[#222222] shadow-md border border-[#444444] rounded-xl p-4",

    // Status colors
    SUCCESS: "text-green-500",
    WARNING: "text-yellow-400",
    ERROR: "text-red-500",
  },

  [THEME.LIGHT]: {
    BACKGROUND_COLOR: "bg-[#fff3e0]",
    BACKGROUND_GRADIENT: "bg-gradient-to-br from-[#fbe9e7] via-[#fdd835] to-[#ff7043]",
    TEXT_COLOR: "text-[#4e342e]",
    BG_ACCENT: "bg-[#bf360c]",
    BG_SECONDARY_ACCENT: "bg-[#ff6f00]",
    BORDER_COLOR: "border-[#ffcc80]",
    BUTTON: "bg-[#e65100] text-white hover:bg-[#bf360c]",
    SHADOW: "shadow-[0_4px_14px_0_rgba(255,111,0,0.4)]",

    // Typography
    FONT_PRIMARY: "font-serif",
    FONT_SECONDARY: "font-sans",
    HEADER_TEXT_SIZE: "text-4xl",
    BODY_TEXT_SIZE: "text-base",

    // Input Styles
    INPUT: "bg-white border border-[#ffcc80] placeholder:text-[#a1887f] focus:outline-none focus:ring-2 focus:ring-[#ff7043]",

    // Badge Styles
    BADGE: "bg-[#ff6f00] text-white px-2 py-1 rounded-full text-xs font-bold",

    // Modal
    MODAL_OVERLAY: "bg-black bg-opacity-50",
    MODAL_BG: "bg-white p-6 rounded-xl shadow-xl",

    // Table
    TABLE_HEADER: "bg-[#ffe0b2] text-[#4e342e] font-semibold",
    TABLE_ROW_HOVER: "hover:bg-[#fff3e0]",

    // Link & Icon
    LINK: "text-[#bf360c] hover:text-[#ff7043]",
    ICON_COLOR: "text-[#bf360c]",

    // Card
    CARD_BG: "bg-white shadow-md border border-[#ffe0b2] rounded-xl p-4",

    // Status colors
    SUCCESS: "text-green-600",
    WARNING: "text-yellow-600",
    ERROR: "text-red-600",
  },

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
    CARD_BG: "bg-white shadow-md border border-[#eeeeee] rounded-xl p-4",

    // Status colors
    SUCCESS: "text-green-600",
    WARNING: "text-yellow-600",
    ERROR: "text-red-600",
  },
};
