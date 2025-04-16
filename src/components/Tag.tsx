import React, { useState } from "react";
import { css } from "@/../../styled-system/css";
import { LuX, LuPlus } from "react-icons/lu";
import Button from "./Buttons/Button";

interface TagProps {
  category?: string;
  tags: string[];
  editable?: boolean;
  onChange?: (tags: string[]) => void;
}

const Tag: React.FC<TagProps> = ({
  category,
  tags,
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

  return (
    <div
      className={css({
        marginBottom: "16px",
      })}
    >
      {category && (
        <h3
          className={css({
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "8px",
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
        {currentTags.map((tag, index) => (
          <div
            key={index}
            className={css({
              backgroundColor: "#e0e0e0",
              padding: "8px 12px",
              borderRadius: "16px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            })}
          >
            {tag}
            {editable && (
              <Button
                className={css({
                  background: "none",
                  border: "none",
                  fontSize: "12px",
                  cursor: "pointer",
                  color: "#888",
                })}
                onClick={() => handleRemoveTag(tag)}
              />
            )}
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
            <Button
              className={css({
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "16px",
                padding: "8px 12px",
                fontSize: "14px",
                cursor: "pointer",
              })}
              onClick={handleAddTag}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tag;
