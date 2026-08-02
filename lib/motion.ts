/** Shared motion tokens (Emil Kowalski curves + site defaults). */

export const easeOut = [0.23, 1, 0.32, 1] as const;
export const easeInOut = [0.77, 0, 0.175, 1] as const;
export const easeDrawer = [0.32, 0.72, 0, 1] as const;

export const duration = {
  press: 0.14,
  tooltip: 0.16,
  ui: 0.22,
  section: 0.55,
  hero: 0.75,
} as const;

export const springSoft = { type: "spring" as const, duration: 0.5, bounce: 0.12 };
export const springSnappy = { type: "spring" as const, stiffness: 380, damping: 28 };

export const reveal = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: duration.section, ease: easeOut },
  },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.04 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
};
