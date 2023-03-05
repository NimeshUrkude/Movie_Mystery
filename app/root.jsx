import {Links,LiveReload,Meta,Outlet,Scripts,ScrollRestoration,useCatch} from "@remix-run/react";
import appcss from "./helper/app.css";

export const meta = () => ({
  charset: "utf-8",
  title: "Movie Mystery",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () =>{
  return[
      {
        rel:"stylesheet",
        href:appcss,
      },
  ];
}    

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({error}) {
  return(
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="app_div">
          <p className="app_title">Error</p>
          <p className="app_description">{error.message}</p>
        </div>
      </body>
    </html>
  );
}


export function CatchBoundary(){
  const caught = useCatch();

  return(
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="app_div">
          <p className="app_title">{caught.data.status}</p>
          <p className="app_description">{caught.data.message}</p>
        </div>
      </body>
    </html>
  );
}