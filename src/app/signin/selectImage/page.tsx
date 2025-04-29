"use client";

import { useState } from "react";
import { css } from "@/../../styled-system/css";
import { useRouter } from "next/navigation";

export default function SelectImage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 예시: 휴대폰에서 불러온 사진들
  const images = [
    "../images/music/artists/sarah-chen.svg",
    "../images/music/artists/elena-rodriguez.svg",
    "../images/music/artists/marcus-kim.svg",
    "../images/music/artists/city-sound.svg",
    "../album1.jpg",
  ];

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  const onClickBack = () => {
    router.back();
  };

  const handleUsePhoto = async () => {
    if (selectedImage) {
      try {
        const response = await fetch("/api/upload-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: selectedImage }),
        });

        if (response.ok) {
          router.push("/"); // 성공적으로 전송된 후 "/"로 이동
        } else {
          //   console.error("Failed to upload image");
          router.push("/"); // 성공적으로 전송된 후 "/"로 이동
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#fff",
      })}
    >
      {/* 상단 헤더 */}
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #ddd",
        })}
      >
        <button
          className={css({
            background: "none",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          })}
          onClick={onClickBack}
        >
          &lt;
        </button>
        <button
          onClick={handleUsePhoto}
          disabled={!selectedImage} // 사진이 선택되지 않았을 때 비활성화
          className={css({
            fontSize: "16px",
            fontWeight: "bold",
            color: selectedImage ? "#2f3e2f" : "#aaa", // 활성화/비활성화 색상
            cursor: selectedImage ? "pointer" : "not-allowed", // 커서 스타일 변경
            background: "none",
            border: "none",
          })}
        >
          Use Photo
        </button>
      </div>

      {/* 선택된 사진 */}
      <div
        className={css({
          flex: "0 0 auto",
          width: "100%", // 정사각형 비율 유지
          aspectRatio: "1", // 정사각형 비율
          backgroundColor: "#2f3e2f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px", // 가운데 정렬 및 아래 여백
          position: "relative", // 겹치는 요소를 위한 상대 위치
        })}
      >
        {/* 겹치는 원 */}
        <div
          className={css({
            position: "absolute",
            top: "50%",
            left: "50%",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)", // 가운데 정렬
            width: "100%", // 겹치는 원의 크기
            height: "100%", // 겹치는 원의 크기
            backgroundColor: "rgba(255, 255, 255, 0.5)", // 반투명 배경
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
          })}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              className={css({
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                overflow: "hidden",
              })}
            />
          ) : (
            <span
              className={css({
                color: "#fff",
                fontSize: "16px",
              })}
            >
              No image selected
            </span>
          )}
        </div>
      </div>

      {/* 사진 그리드 */}
      <div
        className={css({
          flex: "1 1 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
          padding: "16px",
          overflowY: "auto",
        })}
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageSelect(image)}
            className={css({
              width: "100%",
              aspectRatio: "1",
              borderRadius: "8px",
              overflow: "hidden",
              border:
                selectedImage === image
                  ? "2px solid #2f3e2f"
                  : "1px solid #ddd",
              cursor: "pointer",
            })}
          >
            <img
              src={image}
              alt={`Photo ${index + 1}`}
              className={css({
                width: "100%",
                height: "100%",
                objectFit: "cover",
              })}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
