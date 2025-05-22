import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        helveticaneue: ["Helvetica Neue", "sans-serif"],
        nimbussansl: ["Nimbus Sans L"],
      },
      fontSize: {
        xxs: "0.625rem",
      },
      colors: {
        foreground: "hsl(var(--foreground))",
        color: {
          background: "hsl(var(--color-background))",
          foreground: "hsl(var(--color-foreground))",
        },
        text: {
          primary: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
          tertiary: "hsl(var(--text-tertiary))",
          muted: "hsl(var(--text-muted))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          primary: "hsl(var(--background-primary))",
          secondary: "hsl(var(--background-secondary))",
          tertiary: "hsl(var(--background-tertiary))",
          quaternary: "hsl(var(--background-quaternary))",
          muted: "hsl(var(--background-muted))",
          hover: "hsl(var(--background-hover))",
        },
        status: {
          todo: "hsl(var(--color-status-todo))",
          in_progress: "hsl(var(--color-status-in-progress))",
          done: "hsl(var(--color-status-done))",
          blocked: "hsl(var(--color-status-blocked))",
          review: "hsl(var(--color-status-review))",
        },
        priority: {
          low: "hsl(var(--color-priority-low))",
          medium: "hsl(var(--color-priority-medium))",
          high: "hsl(var(--color-priority-high))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "flip-top": {
          "0%": {
            transform: "rotateX(0deg)",
          },
          "100%": {
            transform: "rotateX(90deg)",
          },
        },
        "flip-bottom": {
          "100%": {
            transform: "rotateX(0deg)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        wiggle: {
          "0%, 100%": {
            transform: "translateX(0%)",
            transformOrigin: "50% 50%",
          },
          "15%": { transform: "translateX(-4px) rotate(-4deg)" },
          "30%": { transform: "translateX(6px) rotate(4deg)" },
          "45%": { transform: "translateX(-6px) rotate(-2.4deg)" },
          "60%": { transform: "translateX(2px) rotate(1.6deg)" },
          "75%": { transform: "translateX(-1px) rotate(-0.8deg)" },
        },
        spinner: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        blink: {
          "0%": {
            opacity: "0.2",
          },
          "20%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0.2",
          },
        },
        shimmer: {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shimmer-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shimmer-width)) 0",
          },
        },
        "image-glow": {
          "0%": {
            opacity: "0",
            "animation-timing-function": "cubic-bezier(.74, .25, .76, 1)",
          },
          "10%": {
            opacity: "0.5",
            "animation-timing-function": "cubic-bezier(.12, .01, .08, .99)",
          },
          "100%": {
            opacity: "0.7",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        flip: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        rotate: {
          to: {
            transform: "rotate(90deg)",
          },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        loading: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      screens: {
        xxs: "320px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        grid: "grid 15s linear infinite",
        wiggle: "wiggle 0.75s infinite",
        spinner: "spinner 1.2s linear infinite",
        blink: "blink 1.4s infinite both",
        shimmer: "shimmer 5s infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "image-glow": "image-glow 4s ease-out 0.6s forwards",
        marquee: "marquee var(--duration) linear infinite",
        flip: "flip 6s infinite steps(2, end)",
        rotate: "rotate 3s linear infinite both",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        loading: "loading 0.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
