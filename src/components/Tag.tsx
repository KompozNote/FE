import React, { useState } from "react";
import { css } from "@/../../styled-system/css";
import Button from "./Buttons/Button";

interface TagProps {
  category?: string;
  tags: string[];
  predefinedTags?: string[]; // 미리 정의된 태그
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

  const handleRemoveTag = (tag: string) => {
    const updatedTags = currentTags.filter((t) => t !== tag);
    setCurrentTags(updatedTags);
    onChange?.(updatedTags);
  };

  const handleSelectPredefinedTag = (tag: string) => {
    if (!currentTags.includes(tag)) {
      const updatedTags = [...currentTags, tag];
      setCurrentTags(updatedTags);
      onChange?.(updatedTags);
    }
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
        })}
      >
        {predefinedTags.map((tag, index) => (
          <div
            key={index}
            className={css({
              backgroundColor: currentTags.includes(tag)
                ? "#007bff"
                : "#e0e0e0",
              color: currentTags.includes(tag) ? "#fff" : "#000",
              padding: "8px 12px",
              borderRadius: "16px",
              fontSize: "14px",
              cursor: "pointer",
            })}
            onClick={() => handleSelectPredefinedTag(tag)}
          >
            {tag}
          </div>
        ))}
        {editable && (
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "4px",
            })}
          >
            <input
              className={css({
                border: "1px solid #ccc",
                borderRadius: "16px",
                padding: "8px 12px",
                fontSize: "14px",
              })}
              type="text"
              value={inputValue}
              placeholder="Add a tag"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <Button variant="icon" onClick={handleAddTag}>
              +
            </Button>
          </div>
        )}
      </div>
      <div
        className={css({
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "8px",
        })}
      >
        {currentTags.map((tag, index) => (
          <div
            key={index}
            className={css({
              backgroundColor: "#FFF",
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "16px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            })}
          >
            {tag}
            {editable && (
              <Button variant="icon" onClick={() => handleRemoveTag(tag)}>
                -
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tag;
