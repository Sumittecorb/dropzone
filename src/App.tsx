import { FC, useRef, useState } from "react";
import "./App.css";
import styles from "./styles.module.scss";

const App: FC<{}> = () => {
  const [dropImage, setDropImage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const imgContainerRef = useRef<any>(null);

  const handleDrop = (event: any) => {
    event.nativeEvent.preventDefault();
    if (!event) return;
    const files = event.nativeEvent.dataTransfer.files;
    setError("");
    onUploadImage(files);
  };

  const browseFiles = (event: any) => {
    if (!event) return;
    const files = event.target.files;
    setError("");
    onUploadImage(files);
  };

  const onUploadImage = (files: any) => {
    const fileList = files[0];
    setDropImage(URL.createObjectURL(fileList));
    setError("");
  };
  const onLoadImage = ({ target }: any) => {
    let height = target.clientHeight;
    let width = target.clientWidth;

    if (height > 512 || width > 512) {
      setError("Image Not Fit");
      setDropImage("");
    }
  };

  const generateWatermark = () => {
    const imgContainerSelector =
      imgContainerRef.current.querySelector(".watermarked");
    imgContainerSelector.dataset.watermark = "This is a watermark".repeat(100);
  };
  return (
    <div className="App">
      <div className={styles.PageContent}>
        <div className={styles.headingSec}>
          <h4>Dropzone Image</h4>
        </div>
        <div
          className={styles.contentSec}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.ImgArea} ref={imgContainerRef}>
            <form id="form-file-upload">
              <input
                type="file"
                id="input-file-upload"
                onChange={browseFiles}
              />
              <label id="label-file-upload" htmlFor="input-file-upload">
                <div className="watermarked">
                  {!dropImage && <p>Drag and drop your file here or</p>}
                  {dropImage && (
                    <img src={dropImage} alt="logo" onLoad={onLoadImage} />
                  )}
                </div>
              </label>
            </form>
          </div>
          {dropImage && (
            <button className={styles.generatBtn} onClick={generateWatermark}>
              Generate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
