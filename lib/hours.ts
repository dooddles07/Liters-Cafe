/**
 * TODO(owner): these hours are a PLACEHOLDER - no hours were supplied.
 * Correct them here and the "Open now" badge, the footer, and the
 * structured data for Google all update together.
 *
 * Times are 24h in Asia/Manila. Set a day to null to mark it closed.
 */
export type DayHours = { open: string; close: string } | null;

export const hours: Record<number, DayHours> = {
  0: { open: "10:00", close: "21:00" }, // Sunday
  1: { open: "10:00", close: "21:00" },
  2: { open: "10:00", close: "21:00" },
  3: { open: "10:00", close: "21:00" },
  4: { open: "10:00", close: "21:00" },
  5: { open: "10:00", close: "22:00" },
  6: { open: "10:00", close: "22:00" }, // Saturday
};

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TZ = "Asia/Manila";

/** Current weekday + minutes-since-midnight in Manila, wherever the visitor is. */
export function manilaNow(now: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  // Intl gives "24" for midnight in some runtimes; normalise it.
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));

  return {
    day: weekdayMap[get("weekday")] ?? 0,
    minutes: hour * 60 + minute,
  };
}

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0
    ? `${hour12} ${period}`
    : `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export type OpenState = {
  isOpen: boolean;
  /** e.g. "Open now - closes 9 PM" or "Closed - opens Monday 10 AM" */
  label: string;
};

export function getOpenState(now: Date = new Date()): OpenState {
  const { day, minutes } = manilaNow(now);
  const today = hours[day];

  if (today) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (minutes >= open && minutes < close) {
      return { isOpen: true, label: `Open now · closes ${formatTime(today.close)}` };
    }
    if (minutes < open) {
      return { isOpen: false, label: `Closed · opens ${formatTime(today.open)}` };
    }
  }

  // Walk forward to the next day that is actually open.
  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    const h = hours[next];
    if (h) {
      const when = i === 1 ? "tomorrow" : dayNames[next];
      return { isOpen: false, label: `Closed · opens ${when} ${formatTime(h.open)}` };
    }
  }

  return { isOpen: false, label: "Closed" };
}

/** schema.org openingHours strings, for the JSON-LD block. */
export function schemaOpeningHours() {
  const codes = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return Object.entries(hours)
    .filter(([, h]) => h !== null)
    .map(([day, h]) => `${codes[Number(day)]} ${h!.open}-${h!.close}`);
}
