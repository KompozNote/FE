"use client";

import { css } from "@/../../styled-system/css";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    try {
      const response = await fetch("/api/auth/google", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url; // Google 로그인 URL로 리다이렉트
      } else {
        router.push("/signin/nickname");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google 로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "100%",
        padding: "16px",
        backgroundColor: "#f9f9f9",
      })}
    >
      <div
        className={css({
          marginTop: "60%",
          fontSize: "30px",
          fontWeight: "extrabold",
          color: "#2f3e2f",
        })}
      >
        KompozeNote
      </div>

      <button
        onClick={handleGoogleSignIn}
        className={css({
          marginBottom: "20%",
          width: "80%",
          padding: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: "#2f3e2f",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          textAlign: "center",
        })}
      >
        Sign in with Google
      </button>
    </div>
  );
}
