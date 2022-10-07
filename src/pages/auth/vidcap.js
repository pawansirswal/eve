import React from "react";
import VideoRecorder from "react-video-recorder";

function Vidcap() {
  return (
    <div
      style={{ height: `${window.innerHeight - 100}px`, paddingTop: "50px" }}
    >
      <VideoRecorder
        onRecordingComplete={(videoBlob) => {
          // Do something with the video...
          console.log("videoBlob", videoBlob);
        }}
      />
    </div>
  );
}

export default Vidcap;
