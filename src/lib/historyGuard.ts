const HISTORY_KEYWORDS = [
  "history",
  "war",
  "empire",
  "revolution",
  "dynasty",
  "ancient",
  "medieval",
  "modern",
  "civilization",
  "king",
  "queen",
  "independence",
  "treaty",
  "world war",
  "mughal",
  "roman",
  "greek",
  "maurya",
  "ashoka",
  "british raj",
  "timeline",
];

export function isHistoryRelated(text: string) {
  const normalized = text.toLowerCase();
  return HISTORY_KEYWORDS.some((keyword) => normalized.includes(keyword));
}
