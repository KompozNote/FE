// components/ui/ContentInput.tsx
import { css } from "../../../styled-system/css";
import { ChangeEventHandler } from "react";

type ContentInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
};

export default function ContentInput({
  placeholder = "Content",
  value,
  onChange,
  rows = 5,
}: ContentInputProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={css({
        width: "100%",
        minHeight: "20em",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        resize: "none",
      })}
    />
  );
}
