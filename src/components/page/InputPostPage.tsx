import TitleInput from "../Input/TitleInput";
import { css } from "../../../styled-system/css";
import Header from "../Header";
import Text from "../Text";

type InputPostPageProps = {
  title: string;
  basePath: string;
  nextStepUrl?: string;
};

export default function InputPostPage({
  title,
  basePath,
  nextStepUrl,
}: InputPostPageProps) {
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
      <Header nextStepUrl={`/post/${basePath}?step=${nextStepUrl}`} />

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
          {title}
        </Text>
        <TitleInput />
      </div>
    </div>
  );
}
