"use client";

import { css } from "@/../../styled-system/css";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useState, useRef } from "react";

export default function PicturePostPage({
  basePath,
  nextStepUrl,
}: {
  basePath: string;
  nextStepUrl?: string;
}) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // 카메라 스트림을 처리하는 로직 추가 필요
      // 예: 비디오 요소를 생성하고 스트림을 연결
    } catch (err) {
      console.error("카메라 접근 실패:", err);
    }
  };

  const handleOpenGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setGalleryImages((prev) => [...prev, ...newImages]);
      setSelectedImage(newImages[0]);
    }
  };

  const handleNavigation = () => {
    router.push("/post/help?step=reference");
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        padding: "8px 10px",
        gap: "4px",
        backgroundColor: "#fff",
      })}
    >
      <Header nextStepUrl="/post/help?step=reference" />

      <div
        className={css({
          width: "100%",
          height: "60%",
          backgroundColor: selectedImage ? "transparent" : "#e0e0e0",
          borderRadius: "4px",
          overflow: "hidden",
        })}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            className={css({
              width: "100%",
              height: "100%",
              objectFit: "cover",
            })}
          />
        )}
      </div>

      {/* 갤러리 이미지 */}
      <div
        className={css({
          width: "100%",
          flex: 1,
          backgroundColor: "#f9f9f9",
          borderRadius: "4px",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        })}
      >
        {/* 이미지 그리드 */}
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.5rem",
            overflowY: "auto",
          })}
        >
          {/* Camera 버튼 */}
          <div
            className={css({
              aspectRatio: "1",
              backgroundColor: "#e0e0e0",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#555",
            })}
            onClick={handleOpenCamera}
          >
            Camera
          </div>

          {/* More 버튼 */}
          <div
            className={css({
              aspectRatio: "1",
              backgroundColor: "#e0e0e0",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#555",
            })}
            onClick={handleOpenGallery}
          >
            More &gt;
          </div>

          {galleryImages.map((src, index) => (
            <div
              key={index}
              className={css({
                aspectRatio: "1",
                position: "relative",
                borderRadius: "0.5rem",
                overflow: "hidden",
                cursor: "pointer",
                border: selectedImage === src ? "2px solid #007bff" : "none",
              })}
              onClick={() =>
                setSelectedImage((prev) => (prev === src ? null : src))
              }
            >
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className={css({
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: selectedImage === src ? 0.8 : 1,
                })}
              />
            </div>
          ))}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={handleImageSelect}
        style={{ display: "none" }}
      />
    </div>
  );
}
