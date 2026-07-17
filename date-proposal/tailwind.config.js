export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f7efe7",
        parchment: "#f2e8df",
        sage: "#9ba394",
        blush: "#ddb2b5",
        driftwood: "#6c5b50",
        lavender: "#8f7d9d",
        dusk: "#181518",
        haze: "#c5b7ab"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(12, 12, 15, 0.16)",
        paper: "0 18px 40px rgba(23, 18, 14, 0.16)"
      },
      backgroundImage: {
        "paper-grid": "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.35) 0%, transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 30%)"
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        handwritten: ["Homemade Apple", "cursive"],
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};
