// components/ui/Header.tsx
"use client";

import { css } from "../../styled-system/css";
import Link from "next/link";
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
      <Button variant="icon" onClick={() => window.history.back()}>
        {" "}
        <BackButton />
      </Button>

      {nextStepUrl && (
        <Link
          href={nextStepUrl}
          className={css({
            backgroundColor: "transparent",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          })}
        >
          {nextText}
        </Link>
      )}
    </div>
  );
}
