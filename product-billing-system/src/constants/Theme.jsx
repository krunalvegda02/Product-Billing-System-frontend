export const THEME = {
  DARK: "DARK",
  LIGHT: "LIGHT",
  GENERAL: "GENERAL",
};

export const THEME_CONFIG = {
  [THEME.GENERAL]: {
    // Main Backgrounds
    BACKGROUND_COLOR: "bg-[#f8f6f3]",
    BACKGROUND_GRADIENT: "bg-gradient-to-br from-[#faf8f5] to-[#f0ede8]",
    TEXT_COLOR: "text-[#2c2520]",
    TEXT_SECONDARY: "text-[#5a524a]",
    BG_HEADER: "bg-[#ffffff]",
    BG_ASIDE: "bg-[#ffffff]",

    // Restaurant Theme Colors (Warm & Inviting)
    BG_ACCENT: "bg-[#d97706]", // Warm orange
    BG_SECONDARY_ACCENT: "bg-[#b45309]",
    HOVER_SECONDARY_ACCENT: "hover:bg-[#b45309]",
    BORDER_COLOR: "border-[#d97706]",
    BUTTON: "bg-[#d97706] text-white hover:bg-[#b45309] transition-colors duration-200",
    BUTTON_SECONDARY: "bg-[#f3f4f6] text-[#2c2520] hover:bg-[#e5e7eb] border border-[#d1d5db]",
    SHADOW: "shadow-lg shadow-[#d97706]/10",

    // Typography
    FONT_PRIMARY: "font-inter",
    FONT_SECONDARY: "font-serif",
    HEADER_TEXT_SIZE: "text-3xl",
    BODY_TEXT_SIZE: "text-sm",
    TITLE_TEXT: "text-[#2c2520] font-semibold",

    // Input Styles
    INPUT:
      "bg-white border border-[#d1d5db] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:border-[#d97706] transition-colors",
    INPUT_ERROR: "border-[#ef4444] focus:ring-[#ef4444]",

    // Badge Styles
    BADGE: "bg-[#d97706] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_SUCCESS: "bg-[#10b981] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_WARNING: "bg-[#f59e0b] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_ERROR: "bg-[#ef4444] text-white px-3 py-1 rounded-full text-xs font-medium",

    // Modal
    MODAL_OVERLAY: "bg-black/50 backdrop-blur-sm",
    MODAL_BG: "bg-white p-6 rounded-xl shadow-2xl border border-[#e5e7eb]",

    // Table
    TABLE_HEADER: "bg-[#f9fafb] text-[#2c2520] font-semibold border-b border-[#e5e7eb]",
    TABLE_ROW: "bg-white border-b border-[#f3f4f6]",
    TABLE_ROW_HOVER: "hover:bg-[#fef7ed] transition-colors",
    TABLE_BORDER: "border-[#e5e7eb]",

    // Link & Icon
    LINK: "text-[#d97706] hover:text-[#b45309] transition-colors",
    ICON_COLOR: "text-[#d97706]",
    ICON_SECONDARY: "text-[#6b7280]",

    // Card
    CARD_BG: "bg-white shadow-md border border-[#e5e7eb] rounded-xl p-4",
    CARD_HOVER: "hover:shadow-lg transition-shadow duration-200",

    // Status colors
    SUCCESS: "text-[#059669]",
    SUCCESS_BG: "bg-[#d1fae5]",
    WARNING: "text-[#d97706]",
    WARNING_BG: "bg-[#fef3c7]",
    ERROR: "text-[#dc2626]",
    ERROR_BG: "bg-[#fee2e2]",
    INFO: "text-[#2563eb]",
    INFO_BG: "bg-[#dbeafe]",

    // Navigation
    NAV_ACTIVE: "bg-[#fef7ed] text-[#d97706] border-r-2 border-[#d97706]",
    NAV_INACTIVE: "text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#2c2520]",

    FOCUS_RING: "focus:ring-[#d97706]",
  },

  [THEME.LIGHT]: {
    // Main Backgrounds
    BACKGROUND_COLOR: "bg-[#fafbfc]",
    BACKGROUND_GRADIENT: "bg-gradient-to-br from-[#ffffff] to-[#f8fafc]",
    TEXT_COLOR: "text-[#1f2937]",
    TEXT_SECONDARY: "text-[#6b7280]",
    BG_HEADER: "bg-[#ffffff]",
    BG_ASIDE: "bg-[#ffffff]",

    // Clean Professional Colors
    BG_ACCENT: "bg-[#3b82f6]", // Professional blue
    BG_SECONDARY_ACCENT: "bg-[#1d4ed8]",
    HOVER_SECONDARY_ACCENT: "hover:bg-[#1d4ed8]",
    BORDER_COLOR: "border-[#3b82f6]",
    BUTTON: "bg-[#3b82f6] text-white hover:bg-[#1d4ed8] transition-colors duration-200",
    BUTTON_SECONDARY: "bg-[#f8fafc] text-[#1f2937] hover:bg-[#f1f5f9] border border-[#e2e8f0]",
    SHADOW: "shadow-lg shadow-[#3b82f6]/10",

    // Typography
    FONT_PRIMARY: "font-inter",
    FONT_SECONDARY: "font-serif",
    HEADER_TEXT_SIZE: "text-3xl",
    BODY_TEXT_SIZE: "text-sm",
    TITLE_TEXT: "text-[#1f2937] font-semibold",

    // Input Styles
    INPUT:
      "bg-white border border-[#e2e8f0] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-colors",
    INPUT_ERROR: "border-[#ef4444] focus:ring-[#ef4444]",

    // Badge Styles
    BADGE: "bg-[#3b82f6] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_SUCCESS: "bg-[#10b981] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_WARNING: "bg-[#f59e0b] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_ERROR: "bg-[#ef4444] text-white px-3 py-1 rounded-full text-xs font-medium",

    // Modal
    MODAL_OVERLAY: "bg-black/40 backdrop-blur-sm",
    MODAL_BG: "bg-white p-6 rounded-xl shadow-2xl border border-[#e2e8f0]",

    // Table
    TABLE_HEADER: "bg-[#f8fafc] text-[#1f2937] font-semibold border-b border-[#e2e8f0]",
    TABLE_ROW: "bg-white border-b border-[#f1f5f9]",
    TABLE_ROW_HOVER: "hover:bg-[#f8fafc] transition-colors",
    TABLE_BORDER: "border-[#e2e8f0]",

    // Link & Icon
    LINK: "text-[#3b82f6] hover:text-[#1d4ed8] transition-colors",
    ICON_COLOR: "text-[#3b82f6]",
    ICON_SECONDARY: "text-[#6b7280]",

    // Card
    CARD_BG: "bg-white shadow-sm border border-[#e2e8f0] rounded-xl p-4",
    CARD_HOVER: "hover:shadow-md transition-shadow duration-200",

    // Status colors
    SUCCESS: "text-[#059669]",
    SUCCESS_BG: "bg-[#d1fae5]",
    WARNING: "text-[#d97706]",
    WARNING_BG: "bg-[#fef3c7]",
    ERROR: "text-[#dc2626]",
    ERROR_BG: "bg-[#fee2e2]",
    INFO: "text-[#2563eb]",
    INFO_BG: "bg-[#dbeafe]",

    // Navigation
    NAV_ACTIVE: "bg-[#eff6ff] text-[#3b82f6] border-r-2 border-[#3b82f6]",
    NAV_INACTIVE: "text-[#6b7280] hover:bg-[#f8fafc] hover:text-[#1f2937]",

    // Add to THEME.LIGHT:
    FOCUS_RING: "focus:ring-[#3b82f6]",
  },

  [THEME.DARK]: {
    // Main Backgrounds
    BACKGROUND_COLOR: "bg-[#0f172a]",
    BACKGROUND_GRADIENT: "bg-gradient-to-br from-[#1e293b] to-[#0f172a]",
    TEXT_COLOR: "text-[#f1f5f9]",
    TEXT_SECONDARY: "text-[#cbd5e1]",
    BG_HEADER: "bg-[#1e293b]",
    BG_ASIDE: "bg-[#1e293b]",

    // Dark Theme Colors
    BG_ACCENT: "bg-[#f59e0b]", // Warm amber for dark theme
    BG_SECONDARY_ACCENT: "bg-[#d97706]",
    HOVER_SECONDARY_ACCENT: "hover:bg-[#d97706]",
    BORDER_COLOR: "border-[#f59e0b]",
    BUTTON: "bg-[#f59e0b] text-[#0f172a] hover:bg-[#d97706] transition-colors duration-200",
    BUTTON_SECONDARY: "bg-[#334155] text-[#f1f5f9] hover:bg-[#475569] border border-[#475569]",
    SHADOW: "shadow-2xl shadow-black/25",

    // Typography
    FONT_PRIMARY: "font-inter",
    FONT_SECONDARY: "font-serif",
    HEADER_TEXT_SIZE: "text-3xl",
    BODY_TEXT_SIZE: "text-sm",
    TITLE_TEXT: "text-[#f1f5f9] font-semibold",

    // Input Styles
    INPUT:
      "bg-[#334155] border border-[#475569] text-[#f1f5f9] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-[#f59e0b] transition-colors",
    INPUT_ERROR: "border-[#ef4444] focus:ring-[#ef4444]",

    // Badge Styles
    BADGE: "bg-[#f59e0b] text-[#0f172a] px-3 py-1 rounded-full text-xs font-medium",
    BADGE_SUCCESS: "bg-[#10b981] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_WARNING: "bg-[#f59e0b] text-[#0f172a] px-3 py-1 rounded-full text-xs font-medium",
    BADGE_ERROR: "bg-[#ef4444] text-white px-3 py-1 rounded-full text-xs font-medium",

    // Modal
    MODAL_OVERLAY: "bg-black/70 backdrop-blur-sm",
    MODAL_BG: "bg-[#1e293b] p-6 rounded-xl shadow-2xl border border-[#334155]",

    // Table
    TABLE_HEADER: "bg-[#334155] text-[#f1f5f9] font-semibold border-b border-[#475569]",
    TABLE_ROW: "bg-[#1e293b] border-b border-[#334155]",
    TABLE_ROW_HOVER: "hover:bg-[#334155] transition-colors",
    TABLE_BORDER: "border-[#475569]",

    // Link & Icon
    LINK: "text-[#f59e0b] hover:text-[#fbbf24] transition-colors",
    ICON_COLOR: "text-[#f59e0b]",
    ICON_SECONDARY: "text-[#94a3b8]",

    // Card
    CARD_BG: "bg-[#1e293b] shadow-xl border border-[#334155] rounded-xl p-4",
    CARD_HOVER: "hover:shadow-2xl hover:border-[#475569] transition-all duration-200",

    // Status colors
    SUCCESS: "text-[#34d399]",
    SUCCESS_BG: "bg-[#064e3b]/30",
    WARNING: "text-[#fbbf24]",
    WARNING_BG: "bg-[#451a03]/30",
    ERROR: "text-[#f87171]",
    ERROR_BG: "bg-[#7f1d1d]/30",
    INFO: "text-[#60a5fa]",
    INFO_BG: "bg-[#1e3a8a]/30",

    // Navigation
    NAV_ACTIVE: "bg-[#374151] text-[#f59e0b] border-r-2 border-[#f59e0b]",
    NAV_INACTIVE: "text-[#9ca3af] hover:bg-[#374151] hover:text-[#f1f5f9]",

    // Add to THEME.DARK:
    FOCUS_RING: "focus:ring-[#f59e0b]",
  },
};
