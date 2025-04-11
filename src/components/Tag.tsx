import React, { useState } from "react";
import style from "./Tag.module.css";

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
    <div className={style.tag_container}>
      {category && <h3 className={style.category}>{category}</h3>}
      <div className={style.tags}>
        {currentTags.map((tag, index) => (
          <div key={index} className={style.tag}>
            {tag}
            {editable && (
              <button
                className={style.remove_button}
                onClick={() => handleRemoveTag(tag)}
              >
                ×
              </button>
            )}
          </div>
        ))}
        {editable && (
          <div className={style.input_wrapper}>
            <input
              className={style.input}
              type="text"
              value={inputValue}
              placeholder="Add a tag"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <button className={style.add_button} onClick={handleAddTag}>
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tag;
