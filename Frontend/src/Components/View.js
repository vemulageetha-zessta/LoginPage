import React from "react";
import Modal from "./Modal";
import "./View.css";

const View = (props) => {
  const obj = JSON.parse(localStorage.user);
  return (
    <Modal onClose={props.onClose}>
      <div className="data">
        <img src={obj.Avatar} alt=" " />
        <h2 className="head">{obj.FullName}</h2>
        <p>{obj.Email}</p>
        <div className="button-container">
          <button type="submit" onClick={props.onClose}>Logout</button>
        </div>
      </div>
    </Modal>
  );
};

export default View;
