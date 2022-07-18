import React from "react";
import ReactDOM from "react-dom";

export default function Modal({ children, parent }: React.PropsWithChildren<{ parent?: string }>) {
  if (parent) {
    const portalElement = document.getElementById(parent)!;
    if (portalElement) {
      return ReactDOM.createPortal(children, portalElement);
    }
  }
  return ReactDOM.createPortal(children, document.getElementById("modal")!);
}
