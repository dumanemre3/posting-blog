module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // purge devlopmentta yukarıdaki classları kullanıyor ama productta sadece kullanılan classları alıyor diğerlerini atıyor böylece dosya/file gereksiz yer kaplamamış oluyor.
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          base: "hsl(103, 39%, 13%)",
          dark: "hsl(103, 19%, 41%)",
          light: "hsl(103, 19%, 16%)",
        },
        gray: {
          dark: "#657786",
          light: "#AAB8C2",
          extraLight: "#E1E8ED",
          lightest: "#F5F8FA",
        },
        black: "#14171A",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
