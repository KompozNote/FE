"use client";

import { css } from "@/../../styled-system/css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Buttons/Button";

export default function HelpFollowPage() {
  const router = useRouter();
  const [links, setLinks] = useState<string[]>([""]); // 링크 입력 필드 상태

  const handleSubmit = () => {
    console.log("Submitted data:", { links });
    // 등록 버튼 클릭 시 처리할 로직 추가
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        padding: "16px",
        gap: "16px",
        backgroundColor: "#fff",
      })}
    >
      {/* 상단 Navigation */}
      <div
        className={css({
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          padding: "8px 16px",
        })}
      >
        <button
          onClick={() => router.back()}
          className={css({
            backgroundColor: "transparent",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          })}
        >
          &lt;
        </button>
      </div>

      {/* 제목 */}
      <h1
        className={css({
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "left",
          width: "100%",
          padding: "0 17px",
          paddingTop: "16px",
        })}
      >
        Who would you like to team up with?
      </h1>

      {/* 입력 필드 */}
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
          padding: "0 16px",
        })}
      >
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          className={css({
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
          })}
        />

        {/* Content Input */}
        <textarea
          placeholder="Content"
          rows={5}
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

        {/* Song File Input */}
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
            marginBottom: "11em", // 간격 추가
          })}
        >
          <label
            htmlFor="songFile"
            className={css({
              fontSize: "14px",
              fontWeight: "bold",
              color: "#333",
            })}
          >
            Upload a song file:
          </label>
          <input
            type="file"
            id="songFile"
            accept="audio/*" // 오디오 파일만 허용
            className={css({
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            })}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                console.log("Selected song file:", file.name);
                // 파일 처리 로직 추가 가능
              }
            }}
          />
        </div>
        {/* 등록 버튼 */}
        <Button
          onClick={handleSubmit}
          size="lg"
          variant="primary"
          className={css({
            width: "100%", // 버튼이 화면 너비를 차지하도록 설정
            backgroundColor: "#007bff",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            border: "none",
            padding: "6px",
            cursor: "pointer",
          })}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
