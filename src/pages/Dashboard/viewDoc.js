import React from "react";
// import Viewer, { Worker } from "@phuocng/react-pdf-viewer";
// import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";

function ViewDoc() {
  return (
    <div className="App">
      <iframe
        src="https://cors-anywhere.herokuapp.com/https://s3.amazonaws.com/dashboard.delistedstocks.in/documents/test175/RAJNEESH_KUMAR_TOMAR_20210517062226+(2).pdf"
        height="200"
        width="300"
        title="Iframe Example"
      ></iframe>
    </div>
  );
}

export default ViewDoc;
