import "./set-public-path";
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

const bootstrap = [lifecycles.bootstrap];
const mount = [lifecycles.mount];
const unmount = [lifecycles.unmount];

export { bootstrap, mount, unmount };
