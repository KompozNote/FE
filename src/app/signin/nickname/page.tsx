"use client";

import { useState } from "react";
import { css } from "@/../../styled-system/css";
import { useRouter } from "next/navigation";

export default function NicknamePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const isValidNickname = (value: string) => {
    const regex = /^[a-zA-Z0-9._]{3,16}$/;
    return regex.test(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/auth/nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname }),
      });

      if (response.ok) {
        router.push(
          `/signin/profileImage?nickname=${encodeURIComponent(nickname)}`
        ); // 메인 페이지로 이동
      } else {
        const data = await response.json();
        setError("Unfortunately, That name is already taken.");
      }
    } catch (error) {
      //   console.error("Nickname submission error:", error);
      //   setError("An error occurred. Please try again.");
      if (nickname) {
        router.push(
          `/signin/profileImage?nickname=${encodeURIComponent(nickname)}`
        ); // nickname 전달
      }
    }
  };

  const isValid = isValidNickname(nickname);

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        padding: "16px",
        backgroundColor: "#f9f9f9",
      })}
    >
      <button
        onClick={() => router.back()}
        className={css({
          alignSelf: "flex-start",
          background: "none",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          marginBottom: "24px",
        })}
      >
        ←
      </button>

      <h1
        className={css({
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "16px",
          marginLeft: "5px",
        })}
      >
        What would you like us to call you?
      </h1>

      <input
        type="text"
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value);
          setError(""); // 입력이 변경되면 에러 메시지 초기화
        }}
        placeholder="nickname"
        className={css({
          width: "90%",
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "16px",
          marginBottom: "8px",
          borderColor: error ? "red" : "#ddd",
          "&:focus": {
            outline: "none",
            borderColor: error ? "red" : "#2f3e2f",
          },
        })}
      />

      <p
        className={css({
          fontSize: "10px",
          color: error ? "red" : "#666",
          marginBottom: "8px",
          marginLeft: "5px",
        })}
      >
        {error ||
          "Username must be 3–16 characters. Letters, numbers, underscores (_) and periods (.) only."}
      </p>

      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className={css({
          width: "90%",
          padding: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: isValid ? "#2f3e2f" : "#ccc",
          border: "none",
          borderRadius: "8px",
          cursor: isValid ? "pointer" : "not-allowed",
          marginTop: "auto",
          marginBottom: "10%",
          alignSelf: "center",
        })}
      >
        {isValid ? "What a lovely name!" : "We'd love to know your name!"}
      </button>
    </div>
  );
}
