import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
}

function ModalOverlay(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

function Modal(props) {
  const portalOverlays = document.getElementById("overlays")
  return (
    <Fragment>
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalOverlays )}
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalOverlays)}
    </Fragment>
  );
}

export default Modal;
