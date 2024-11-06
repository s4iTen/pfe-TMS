export const tokensDark = {
  grey: {
    0: "#333333",
    10: "#444444",
    50: "#555555",
    100: "#666666",
    200: "#777777",
    300: "#888888",
    400: "#999999",
    500: "#aaaaaa",
    600: "#bbbbbb",
    700: "#cccccc",
    800: "#dddddd",
    900: "#ffffff",
  },
  primary: {
    100: "#b3e5fc",
    200: "#81d4fa",
    300: "#4fc3f7",
    400: "#29b6f6",
    500: "#03a9f4",
    600: "#0288d1",
    700: "#0277bd",
    800: "#01579b",
    900: "#004d8c",
  },
  secondary: {
    100: "#ffecb3",
    200: "#ffe082",
    300: "#ffd54f",
    400: "#ffca28",
    500: "#ffc107",
    600: "#ffb300",
    700: "#ffa000",
    800: "#ff8f00",
    900: "#ff6f00",
  },
  red: {
    500: "#f44336",
  },
};

export const tokensLight = {
  grey: {
    0: "#ffffff",
    10: "#f2f2f2",
    50: "#e0e0e0",
    100: "#c2c2c2",
    200: "#a3a3a3",
    300: "#858585",
    400: "#666666",
    500: "#4d4d4d",
    600: "#333333",
    700: "#222222",
    800: "#141414",
    900: "#000000",
  },
  primary: {
    100: "#e3f2fd",
    200: "#bbdefb",
    300: "#90caf9",
    400: "#64b5f6",
    500: "#42a5f5",
    600: "#2196f3",
    700: "#1e88e5",
    800: "#1976d2",
    900: "#1565c0",
  },
  secondary: {
    100: "#fff9c4",
    200: "#fff59d",
    300: "#fff176",
    400: "#ffee58",
    500: "#ffeb3b",
    600: "#fdd835",
    700: "#fbc02d",
    800: "#f9a825",
    900: "#f57f17",
  },
  red: {
    500: "#d32f2f",
  },
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
              contrastText: "#fff",
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[10],
            },
            warning: {
              contrastText: "#fff",
              dark: "#FFC107",
              light: "#FFEB3B",
              main: "#FF9800",
            },
            success: {
              contrastText: "#fff",
              dark: "#388e3c",
              light: "#81c784",
              main: "#66bb6a",
            },
          }
        : {
            primary: {
              ...tokensLight.primary,
              main: tokensLight.primary[400],
              light: tokensLight.primary[200],
              contrastText: "#333",
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensLight.secondary[500],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensLight.grey[500],
            },
            background: {
              default: tokensLight.grey[10],
              alt: tokensLight.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: "bold",
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: "bold",
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: "bold",
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: "bold",
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: "bold",
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: "bold",
      },
    },
  };
};
