import http from "http";
import fs from "fs";
import path from "path";
// import { repeater, sequencer } from "./mock/utils.js";

const content = fs.readFileSync(path.resolve("server/template.html"));

http
  .createServer((request, response) => {
    let body = [];
    request
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        body.push(Buffer.from(chunk));
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        console.log(":::request-body:::\n", body);
        // response.setHeader("Transfer-Encoding", "identity");
        response.setHeader("Content-Type", "text/html");
        // response.setHeader("Content-Length", Buffer.byteLength(content));
        response.writeHead(200);
        response.end(content);
      });
  })
  .listen("8088", () => {
    console.log("server running at 8088 port");
  });
