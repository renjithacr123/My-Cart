import { join } from "path";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Home from "./components/home";
import template from "./template";

const server = express();

server.use("/assets", express.static(join(__dirname, "assets")));

server.get("/", async (req, res) => {
  const initialState = {};
  const appString = renderToString(<App {...initialState} />);

  res.send(
    template({
      body: appString,
      title: "Hello World from the server",
      initialState: JSON.stringify(initialState),
    })
  );
});

server.listen(8080);

/* eslint-disable no-console */
console.log("listening on 8080");
/* eslint-enable no-console */
