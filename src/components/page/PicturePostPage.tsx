"use client";

import { css } from "@/../../styled-system/css";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
export default function PicturePostPage({
  basePath,
  nextStepUrl,
}: {
  basePath: string;
  nextStepUrl?: string;
}) {
  const router = useRouter();

  // Mock 데이터: 갤러리 이미지
  const galleryImages = [
    "/images/sample1.jpg",
    "/images/sample2.jpg",
    "/images/sample3.jpg",
    "/images/sample4.jpg",
    "/images/sample5.jpg",
    "/images/sample6.jpg",
  ];

  const handleOpenGallery = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true; // 여러 이미지 선택 가능
    fileInput.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        console.log("Selected files:", files);
        // 선택된 파일을 처리하는 로직 추가 가능
      }
    };
    fileInput.click();
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        padding: "30px 16px",
        gap: "16px",
        backgroundColor: "#fff",
      })}
    >
      <Header nextStepUrl="/post/help?step=reference" />

      <div
        className={css({
          width: "100%",
          height: "60%",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
        })}
      ></div>

      {/* 하단 Navigation */}
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "8px",
        })}
      >
        <button
          onClick={handleOpenGallery} // 갤러리 열기
          className={css({
            backgroundColor: "#e0e0e0",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "14px",
            cursor: "pointer",
          })}
        >
          More &gt;
        </button>
        <button
          onClick={() => router.push("/help/new/skip")}
          className={css({
            backgroundColor: "transparent",
            color: "#AAA",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          })}
        >
          Skip
        </button>
      </div>

      {/* 갤러리 이미지 */}
      <div
        className={css({
          flex: "1",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3열 그리드
          gap: "8px",
          padding: "16px",
          backgroundColor: "#f9f9f9",
        })}
      >
        {/* Camera 버튼 */}
        <div
          className={css({
            width: "100%",
            paddingTop: "100%", // 정사각형 비율 유지
            position: "relative",
            backgroundColor: "#e0e0e0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          })}
          onClick={() => router.push("/help/new/camera")} // 카메라 페이지로 이동
        >
          <span
            className={css({
              fontSize: "16px",
              fontWeight: "bold",
              color: "#555",
            })}
          >
            Camera
          </span>
        </div>

        {/* 갤러리 이미지 */}
        {galleryImages.map((src, index) => (
          <div
            key={index}
            className={css({
              width: "100%",
              position: "relative",
              backgroundColor: "#e0e0e0",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
            })}
            onClick={() => console.log(`Selected image: ${src}`)} // 이미지 선택 시 동작
          >
            <img
              src={src}
              alt={`Gallery Image ${index + 1}`}
              className={css({
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
