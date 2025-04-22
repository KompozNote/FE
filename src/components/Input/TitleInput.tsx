// components/ui/TitleInput.tsx
import { css } from "../../../styled-system/css";

type TitleInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TitleInput({
  placeholder = "Title",
  value,
  onChange,
}: TitleInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={css({
        width: "100%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
      })}
    />
  );
}
