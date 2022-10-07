import React, { useRef } from "react";
import S3 from "react-aws-s3";

function Upload() {
  const fileInput = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    let file = fileInput.current.files[0];
    // let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
    const config = {
      bucketName: process.env.BUCKET_NAME,
      // dirName: process.env.REACT_APP_DIR_NAME /* optional */,
      region: process.env.REGION,
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
    };
    const ReactS3Client = new S3(config);
    const newFileName = "test-file";

    ReactS3Client.uploadFile(file, newFileName)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    // ReactS3Client.uploadFile("file", "newFileName").then((data) => {
    //   console.log(data);
    //   if (data.status === 204) {
    //     console.log("success");
    //   } else {
    //     console.log("fail");
    //   }
    // });
  };
  return (
    <>
      <form
        style={{ margin: "90px" }}
        className="upload-steps"
        onSubmit={handleClick}
      >
        <label>
          Upload file:
          <input type="file" ref={fileInput} />
        </label>
        <br />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default Upload;
