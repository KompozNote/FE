import { useRef } from "react";
import { css } from "../../../styled-system/css";
import Button from "../Buttons/Button";
import Header from "../Header";
import Text from "../Text";

export default function Mp3PostPage({ basePath }: { basePath: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
    }
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        padding: "30px 16px",
        gap: "16px",
        backgroundColor: "#fff",
      })}
    >
      <Header nextStepUrl={`/post/${basePath}?step=edit`} />

      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          padding: "0 16px",
          marginTop: "30px",
        })}
      >
        <Text as="h1" className={css({ marginBottom: "20px" })}>
          Upload your mp3 file
        </Text>
        <Button onClick={handleFileUpload}>Upload</Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
