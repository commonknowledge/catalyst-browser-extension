import * as React from "react";
import { ThemeProvider } from "theme-ui";
import { Global, css } from "@emotion/core";
import { Fragment } from "react";
import "@csstools/normalize.css";

export const theme: any = {
  fonts: {
    body: "system-ui, sans-serif",
    heading: "system-ui, sans-serif",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  lineHeights: {
    body: 1.45,
    heading: 1.125
  },
  colors: {
    text: "#111",
    background: "#EFEFEF",
    muted: "#ACACAC",
    primary: "#111",
    secondary: "#FC0D1B",
    accent: "#FC0D1B"
  },
  styles: {
    a: {
      color: "primary",
      textDecoration: "none",
      borderBottom: (t: typeof theme) => "3px solid " + t.colors.accent,
      "&:hover": {
        color: "accent"
      }
    },
    p: {
      lineHeight: "body",
      mb: "0.5em",
      mt: "0.5em"
    },
    h1: { mb: "0.1em", mt: "1em" },
    h2: { mb: "0.1em", mt: "1em" },
    h3: { mb: "0.1em", mt: "1em" },
    h4: { mb: "0.1em", mt: "1em" }
  },
  padding: [3, 4, 5],
  minorColumnWidth: ["48%", "38.196601125%"]
};

export const Theme: React.FC = ({ children }) => (
  <Fragment>
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            padding: 0;
            min-height: 100%;
            background: ${theme.colors.background};
            font-family: ${theme.fonts.body};
            font-size: ${theme.fontSizes[3]}px;
          }
          ::selection {
            background: ${theme.colors.text};
            color: #ffffff;
          }
        `}
      />
      {children}
    </ThemeProvider>
  </Fragment>
);