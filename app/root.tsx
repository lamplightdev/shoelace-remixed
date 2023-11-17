import { cssBundleHref } from '@remix-run/css-bundle';
import { json, type LinksFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import shoelaceStyles from '@shoelace-style/shoelace/dist/themes/light.css';
import { ShoelaceContext, useShoelace } from './shoelace';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: shoelaceStyles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = async () => {
  return json({ BASE_URL: process.env.BASE_URL! });
};

export default function App() {
  const { BASE_URL } = useLoaderData<typeof loader>();
  const shoelace = useShoelace({ URL: BASE_URL });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <style>{`
          body { font-family: var(--sl-font-sans); }
        `}</style>
        <Links />
      </head>
      <body>
        <ShoelaceContext.Provider value={shoelace}>
          <Link to="/">Home</Link> | <Link to="/info">Info</Link>
          <Outlet />
        </ShoelaceContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
