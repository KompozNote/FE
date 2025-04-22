import React, { useState } from "react";
import { css } from "@/../../styled-system/css";
import Button from "./Buttons/Button";

interface TagProps {
  category?: string;
  tags: string[];
  predefinedTags?: string[];
  editable?: boolean;
  onChange?: (tags: string[]) => void;
}

const Tag: React.FC<TagProps> = ({
  category,
  tags,
  predefinedTags = [],
  editable = false,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [currentTags, setCurrentTags] = useState(tags);

  const handleAddTag = () => {
    if (inputValue.trim() && !currentTags.includes(inputValue.trim())) {
      const updatedTags = [...currentTags, inputValue.trim()];
      setCurrentTags(updatedTags);
      onChange?.(updatedTags);
      setInputValue("");
    }
  };

  const handleToggleTag = (tag: string) => {
    let updatedTags;
    if (currentTags.includes(tag)) {
      updatedTags = currentTags.filter((t) => t !== tag); // 태그 선택 해제
    } else {
      updatedTags = [...currentTags, tag]; // 태그 선택
    }
    setCurrentTags(updatedTags);
    onChange?.(updatedTags);
  };

  return (
    <div>
      {category && (
        <h3
          className={css({
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "4px",
          })}
        >
          {category}
        </h3>
      )}
      <div
        className={css({
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          gridTemplateColumns: "repeat(3, 1fr)", // 3개의 열로 구성
          gridAutoRows: "1fr", // 행의 높이를 열의 비율에 맞게 설정
        })}
      >
        {[
          ...predefinedTags,
          ...currentTags.filter((tag) => !predefinedTags.includes(tag)),
        ].map((tag, index) => (
          <div
            key={index}
            className={css({
              backgroundColor: currentTags.includes(tag)
                ? "#007bff"
                : "#e0e0e0",
              color: currentTags.includes(tag) ? "#fff" : "#000",
              padding: "6px 8px",
              borderRadius: "16px",
              fontSize: "14px",
              cursor: "pointer",
              height: "fit-content",
            })}
            onClick={() => handleToggleTag(tag)}
          >
            {tag}
          </div>
        ))}
        {editable && (
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "0.3em",
            })}
          >
            <input
              className={css({
                border: "1px solid #ccc",
                borderRadius: "16px",
                padding: "4px 0px",
                paddingLeft: "12px",
                fontSize: "14px",
              })}
              type="text"
              value={inputValue}
              placeholder="Add a tag"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <Button
              variant="icon"
              onClick={handleAddTag}
              className={css({ padding: "unset" })}
            >
              +
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tag;
