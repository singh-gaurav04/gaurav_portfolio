export const animationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  },
  item: {
    hidden: { y: 28, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  },
  card: {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

export const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Real Projects", href: "#real-projects" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Feedback", href: "#feedback" },
  { name: "Contact", href: "#contact" },
];
