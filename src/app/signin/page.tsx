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
        // alert("Google 로그인에 실패했습니다. 다시 시도해주세요.");
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

      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginBottom: "15%",
        })}
      >
        <button
          onClick={handleGoogleSignIn}
          className={css({
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
            marginBottom: "16px",
          })}
        >
          Sign in with Google
        </button>

        <p
          className={css({
            fontSize: "12px",
            color: "#666",
            textAlign: "center",
            width: "80%",
          })}
        >
          By tapping Continue with Google, you agree to KompozeNote's{" "}
          <a
            href="/terms"
            className={css({
              color: "#2f3e2f",
              textDecoration: "underline",
            })}
          >
            Terms of Use
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className={css({
              color: "#2f3e2f",
              textDecoration: "underline",
            })}
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
