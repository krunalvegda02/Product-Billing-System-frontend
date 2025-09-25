export const THEME = {
  DARK: "DARK",
  LIGHT: "LIGHT",
  GENERAL: "GENERAL",
  SUNSET: "SUNSET",
  OCEAN: "OCEAN",
};

export const THEME_CONFIG = {
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
  [THEME.GENERAL]: {
    // Main Backgrounds
    BACKGROUND_COLOR: "bg-[#fff5f5]",
    BACKGROUND_GRADIENT: "bg-gradient-to-br from-[#fffafa] to-[#ffeaea]",
    TEXT_COLOR: "text-[#5c2a2a]",
    TEXT_SECONDARY: "text-[#8b5d5d]",
    BG_HEADER: "bg-[#ffffff]",
    BG_ASIDE: "bg-[#ffffff]",

    // Beautiful Light Red Theme Colors
    BG_ACCENT: "bg-[#e53e3e]", // Vibrant red
    BG_SECONDARY_ACCENT: "bg-[#c53030]",
    HOVER_SECONDARY_ACCENT: "hover:bg-[#c53030]",
    BORDER_COLOR: "border-[#e53e3e]",
    BUTTON: "bg-[#e53e3e] text-white hover:bg-[#c53030] transition-colors duration-200",
    BUTTON_SECONDARY: "bg-[#fed7d7] text-[#5c2a2a] hover:bg-[#feb2b2] border border-[#feb2b2]",
    SHADOW: "shadow-lg shadow-[#e53e3e]/15",

    // Typography
    FONT_PRIMARY: "font-inter",
    FONT_SECONDARY: "font-serif",
    HEADER_TEXT_SIZE: "text-3xl",
    BODY_TEXT_SIZE: "text-sm",
    TITLE_TEXT: "text-[#5c2a2a] font-semibold",

    // Input Styles
    INPUT:
      "bg-white border border-[#fed7d7] placeholder:text-[#a0aec0] focus:outline-none focus:ring-2 focus:ring-[#e53e3e] focus:border-[#e53e3e] transition-colors",
    INPUT_ERROR: "border-[#e53e3e] focus:ring-[#e53e3e]",

    // Badge Styles
    BADGE: "bg-[#e53e3e] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_SUCCESS: "bg-[#38a169] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_WARNING: "bg-[#dd6b20] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_ERROR: "bg-[#e53e3e] text-white px-3 py-1 rounded-full text-xs font-medium",

    // Modal
    MODAL_OVERLAY: "bg-black/50 backdrop-blur-sm",
    MODAL_BG: "bg-white p-6 rounded-xl shadow-2xl border border-[#fed7d7]",

    // Table
    TABLE_HEADER: "bg-[#fff5f5] text-[#5c2a2a] font-semibold border-b border-[#fed7d7]",
    TABLE_ROW: "bg-white border-b border-[#ffeaea]",
    TABLE_ROW_HOVER: "hover:bg-[#fff5f5] transition-colors",
    TABLE_BORDER: "border-[#fed7d7]",

    // Link & Icon
    LINK: "text-[#e53e3e] hover:text-[#c53030] transition-colors",
    ICON_COLOR: "text-[#e53e3e]",
    ICON_SECONDARY: "text-[#8b5d5d]",

    // Card
    CARD_BG: "bg-white shadow-md border border-[#fed7d7] rounded-xl p-4",
    CARD_HOVER: "hover:shadow-lg transition-shadow duration-200",

    // Status colors
    SUCCESS: "text-[#276749]",
    SUCCESS_BG: "bg-[#c6f6d5]",
    WARNING: "text-[#dd6b20]",
    WARNING_BG: "bg-[#feebc8]",
    ERROR: "text-[#c53030]",
    ERROR_BG: "bg-[#fed7d7]",
    INFO: "text-[#3182ce]",
    INFO_BG: "bg-[#bee3f8]",

    // Navigation
    NAV_ACTIVE: "bg-[#fed7d7] text-[#e53e3e] border-r-2 border-[#e53e3e]",
    NAV_INACTIVE: "text-[#8b5d5d] hover:bg-[#fff5f5] hover:text-[#5c2a2a]",

    FOCUS_RING: "focus:ring-[#e53e3e]",
  },

  [THEME.SUNSET]: {
    // Main Backgrounds
    BACKGROUND_COLOR: "bg-[#fff7ed]",
    BACKGROUND_GRADIENT: "bg-gradient-to-br from-[#fff7ed] to-[#fed7aa]",
    TEXT_COLOR: "text-[#7c2d12]",
    TEXT_SECONDARY: "text-[#9a3412]",
    BG_HEADER: "bg-[#ffffff]",
    BG_ASIDE: "bg-[#ffffff]",

    // Sunset Theme Colors (Warm Orange/Pink)
    BG_ACCENT: "bg-[#ea580c]", // Vibrant orange
    BG_SECONDARY_ACCENT: "bg-[#c2410c]",
    HOVER_SECONDARY_ACCENT: "hover:bg-[#c2410c]",
    BORDER_COLOR: "border-[#ea580c]",
    BUTTON: "bg-[#ea580c] text-white hover:bg-[#c2410c] transition-colors duration-200",
    BUTTON_SECONDARY: "bg-[#ffedd5] text-[#7c2d12] hover:bg-[#fed7aa] border border-[#fdba74]",
    SHADOW: "shadow-lg shadow-[#ea580c]/15",

    // Typography
    FONT_PRIMARY: "font-inter",
    FONT_SECONDARY: "font-serif",
    HEADER_TEXT_SIZE: "text-3xl",
    BODY_TEXT_SIZE: "text-sm",
    TITLE_TEXT: "text-[#7c2d12] font-semibold",

    // Input Styles
    INPUT:
      "bg-white border border-[#fdba74] placeholder:text-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] transition-colors",
    INPUT_ERROR: "border-[#dc2626] focus:ring-[#dc2626]",

    // Badge Styles
    BADGE: "bg-[#ea580c] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_SUCCESS: "bg-[#16a34a] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_WARNING: "bg-[#d97706] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_ERROR: "bg-[#dc2626] text-white px-3 py-1 rounded-full text-xs font-medium",

    // Modal
    MODAL_OVERLAY: "bg-black/50 backdrop-blur-sm",
    MODAL_BG: "bg-white p-6 rounded-xl shadow-2xl border border-[#fdba74]",

    // Table
    TABLE_HEADER: "bg-[#ffedd5] text-[#7c2d12] font-semibold border-b border-[#fdba74]",
    TABLE_ROW: "bg-white border-b border-[#fed7aa]",
    TABLE_ROW_HOVER: "hover:bg-[#ffedd5] transition-colors",
    TABLE_BORDER: "border-[#fdba74]",

    // Link & Icon
    LINK: "text-[#ea580c] hover:text-[#c2410c] transition-colors",
    ICON_COLOR: "text-[#ea580c]",
    ICON_SECONDARY: "text-[#9a3412]",

    // Card
    CARD_BG: "bg-white shadow-md border border-[#fdba74] rounded-xl p-4",
    CARD_HOVER: "hover:shadow-lg transition-shadow duration-200",

    // Status colors
    SUCCESS: "text-[#166534]",
    SUCCESS_BG: "bg-[#dcfce7]",
    WARNING: "text-[#9a3412]",
    WARNING_BG: "bg-[#fed7aa]",
    ERROR: "text-[#dc2626]",
    ERROR_BG: "bg-[#fecaca]",
    INFO: "text-[#0369a1]",
    INFO_BG: "bg-[#e0f2fe]",

    // Navigation
    NAV_ACTIVE: "bg-[#ffedd5] text-[#ea580c] border-r-2 border-[#ea580c]",
    NAV_INACTIVE: "text-[#9a3412] hover:bg-[#fff7ed] hover:text-[#7c2d12]",

    FOCUS_RING: "focus:ring-[#ea580c]",
  },

  [THEME.OCEAN]: {
    // Main Backgrounds
    BACKGROUND_COLOR: "bg-[#f0f9ff]",
    BACKGROUND_GRADIENT: "bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]",
    TEXT_COLOR: "text-[#0c4a6e]",
    TEXT_SECONDARY: "text-[#0369a1]",
    BG_HEADER: "bg-[#ffffff]",
    BG_ASIDE: "bg-[#ffffff]",

    // Ocean Theme Colors (Cool Blues/Teals)
    BG_ACCENT: "bg-[#0284c7]", // Ocean blue
    BG_SECONDARY_ACCENT: "bg-[#0369a1]",
    HOVER_SECONDARY_ACCENT: "hover:bg-[#0369a1]",
    BORDER_COLOR: "border-[#0284c7]",
    BUTTON: "bg-[#0284c7] text-white hover:bg-[#0369a1] transition-colors duration-200",
    BUTTON_SECONDARY: "bg-[#e0f2fe] text-[#0c4a6e] hover:bg-[#bae6fd] border border-[#7dd3fc]",
    SHADOW: "shadow-lg shadow-[#0284c7]/15",

    // Typography
    FONT_PRIMARY: "font-inter",
    FONT_SECONDARY: "font-serif",
    HEADER_TEXT_SIZE: "text-3xl",
    BODY_TEXT_SIZE: "text-sm",
    TITLE_TEXT: "text-[#0c4a6e] font-semibold",

    // Input Styles
    INPUT:
      "bg-white border border-[#bae6fd] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-[#0284c7] transition-colors",
    INPUT_ERROR: "border-[#dc2626] focus:ring-[#dc2626]",

    // Badge Styles
    BADGE: "bg-[#0284c7] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_SUCCESS: "bg-[#059669] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_WARNING: "bg-[#d97706] text-white px-3 py-1 rounded-full text-xs font-medium",
    BADGE_ERROR: "bg-[#dc2626] text-white px-3 py-1 rounded-full text-xs font-medium",

    // Modal
    MODAL_OVERLAY: "bg-black/40 backdrop-blur-sm",
    MODAL_BG: "bg-white p-6 rounded-xl shadow-2xl border border-[#bae6fd]",

    // Table
    TABLE_HEADER: "bg-[#e0f2fe] text-[#0c4a6e] font-semibold border-b border-[#bae6fd]",
    TABLE_ROW: "bg-white border-b border-[#f0f9ff]",
    TABLE_ROW_HOVER: "hover:bg-[#e0f2fe] transition-colors",
    TABLE_BORDER: "border-[#bae6fd]",

    // Link & Icon
    LINK: "text-[#0284c7] hover:text-[#0369a1] transition-colors",
    ICON_COLOR: "text-[#0284c7]",
    ICON_SECONDARY: "text-[#0369a1]",

    // Card
    CARD_BG: "bg-white shadow-sm border border-[#bae6fd] rounded-xl p-4",
    CARD_HOVER: "hover:shadow-md transition-shadow duration-200",

    // Status colors
    SUCCESS: "text-[#047857]",
    SUCCESS_BG: "bg-[#d1fae5]",
    WARNING: "text-[#d97706]",
    WARNING_BG: "bg-[#fef3c7]",
    ERROR: "text-[#dc2626]",
    ERROR_BG: "bg-[#fee2e2]",
    INFO: "text-[#0284c7]",
    INFO_BG: "bg-[#e0f2fe]",

    // Navigation
    NAV_ACTIVE: "bg-[#e0f2fe] text-[#0284c7] border-r-2 border-[#0284c7]",
    NAV_INACTIVE: "text-[#0369a1] hover:bg-[#f0f9ff] hover:text-[#0c4a6e]",

    FOCUS_RING: "focus:ring-[#0284c7]",
  },
};
