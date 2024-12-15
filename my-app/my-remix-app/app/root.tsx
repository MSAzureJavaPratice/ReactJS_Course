import { Links, LiveReload, Outlet, Scripts } from "@remix-run/react";

export const meta = () => ({
  charset: "utf-8",
  title: "Movie App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Movie App</title>
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
