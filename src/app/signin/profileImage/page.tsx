"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { css } from "@/../../styled-system/css";
import ProfileImg from "@/components/ProfileImg";

export default function ProfileImgPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname") || "User"; // 전달받은 nickname

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  const handleUploadImage = () => {
    router.push("/signin/selectImage"); // Upload Image 클릭 시 이동
  };

  const handleSkip = () => {
    router.push("/"); // Skip for now 클릭 시 이동
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#fff",
        padding: "16px",
      })}
    >
      {/* 상단 헤더 */}
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        })}
      >
        <button
          className={css({
            background: "none",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            color: "#2f3e2f",
          })}
          onClick={() => router.back()}
        >
          &lt;
        </button>
      </div>
      <h1
        className={css({
          fontSize: "20px",
          marginBottom: "16px",
          textAlign: "center", // 텍스트 가운데 정렬
        })}
      >
        Would you like to add a profile image?
      </h1>
      {/* 프로필 이미지 */}
      <div
        className={css({
          display: "flex",
          height: "25em",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "25px",
          marginBottom: "16px",
        })}
      >
        <div
          className={css({
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#2f3e2f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "8px",
          })}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected Profile"
              className={css({
                width: "100%",
                height: "100%",
                objectFit: "cover",
              })}
            />
          ) : (
            <ProfileImg
              src=""
              alt="Default Profile"
              widths="100%"
              heights="100%"
            />
          )}
        </div>
        <div
          className={css({
            marginTop: "15px",
            fontSize: "24px",
            fontWeight: "semibold",
            color: "#2f3e2f",
          })}
        >
          {nickname}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "auto",
          gap: "8px",
        })}
      >
        <button
          onClick={handleUploadImage}
          className={css({
            width: "100%",
            padding: "12px",
            backgroundColor: "#2f3e2f",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          })}
        >
          Upload Image
        </button>
        <button
          onClick={handleSkip}
          className={css({
            background: "none",
            border: "none",
            color: "#2f3e2f",
            fontSize: "14px",
            cursor: "pointer",
          })}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
