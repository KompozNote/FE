// components/ui/Header.tsx
"use client";

import { css } from "../../styled-system/css";
import { useRouter } from "next/navigation";
import BackButton from "../../public/backButton.svg";
import Button from "./Buttons/Button";

type HeaderProps = {
  nextStepUrl?: string; // 예: "/post/help?step=edit"
  nextText?: string; // 버튼에 들어갈 텍스트
};

export default function Header({
  nextStepUrl,
  nextText = "Next",
}: HeaderProps) {
  const router = useRouter();

  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingRight: "16px",
      })}
    >
      <Button variant="icon">
        {" "}
        <BackButton />
      </Button>

      {nextStepUrl && (
        <button
          onClick={() => router.push(nextStepUrl)}
          className={css({
            backgroundColor: "transparent",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          })}
        >
          {nextText}
        </button>
      )}
    </div>
  );
}
