import { useRouter } from "next/navigation";
import { useState } from "react";
import TitleInput from "../Input/TitleInput";
import ContentInput from "../Input/ContentInput";
import { css } from "../../../styled-system/css";
import Header from "../Header";
import Button from "../Buttons/Button";
import Text from "../Text";
type ContentPostPageProps = {
  showLinks?: boolean;
  titleText?: string;
};

export default function ContentPostPage({
  showLinks = true,
  titleText = "This is what I meant!",
}: ContentPostPageProps) {
  const router = useRouter();
  const [links, setLinks] = useState<string[]>([""]);

  const handleAddLink = () => {
    if (links.length < 8) {
      setLinks([...links, ""]);
    } else {
      alert("You can only add up to 8 links.");
    }
  };

  const handleRemoveLink = (index: number) => {
    if (links.length > 1) {
      const updatedLinks = links.filter((_, i) => i !== index);
      setLinks(updatedLinks);
    }
  };

  const handleLinkChange = (index: number, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
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
      <Header nextStepUrl="/post/help?step=edit" />

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
          What do you need help with?
        </Text>
        <TitleInput />
        <ContentInput />

        {/* 🔽 링크 입력 영역은 조건부로! */}
        {showLinks && (
          <>
            <div
              className={css({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: "20px",
              })}
            >
              <Text as="h4" className={css({ marginBottom: "20px" })}>
                {titleText}
              </Text>
              <Button variant="icon" onClick={handleAddLink}>
                +
              </Button>
            </div>

            <div
              className={css({
                minHeight: "13em",
                padding: "0",
              })}
            >
              {links.map((link, index) => (
                <div
                  key={index}
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    marginBottom: "8px",
                  })}
                >
                  <TitleInput
                    placeholder="Link"
                    value={link}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleLinkChange(index, e.target.value)
                    }
                  />
                  {links.length > 1 && (
                    <Button
                      variant="icon"
                      onClick={() => handleRemoveLink(index)}
                      position="absolute"
                      right="5px"
                    >
                      -
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
