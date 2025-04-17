"use client";

import { css } from "@/../../styled-system/css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Buttons/Button";

export default function HelpFollowPage() {
  const router = useRouter();
  const [links, setLinks] = useState<string[]>([""]); // 링크 입력 필드 상태

  const handleAddLink = () => {
    if (links.length < 8) {
      setLinks([...links, ""]); // 새로운 빈 링크 필드 추가
    } else {
      alert("You can only add up to 8 links."); // 경고 메시지
    }
  };

  const handleRemoveLink = (index: number) => {
    if (links.length > 1) {
      const updatedLinks = links.filter((_, i) => i !== index);
      setLinks(updatedLinks);
    }
  };

  const handleLinkChange = (index: number, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value; // 특정 링크 필드 업데이트
    setLinks(updatedLinks);
  };

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
          justifyContent: "space-between",
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
        <button
          onClick={() => router.push("/help/new/follow/tag")}
          className={css({
            backgroundColor: "transparent",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          })}
        >
          Next
        </button>
      </div>

      {/* 제목 */}
      <h1
        className={css({
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "left",
          width: "100%",
          padding: "0 20px",
          paddingTop: "16px",
        })}
      >
        What do you need help with?
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

        {/* Link Section */}
        <div
          className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          })}
        >
          <h4
            className={css({
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "left",
              margin: 0,
              paddingLeft: "4px",
            })}
          >
            This is what I meant!
          </h4>
          <button
            onClick={handleAddLink}
            className={css({
              backgroundColor: "#FFD700",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
            })}
          >
            +
          </button>
        </div>

        {/* Link Inputs */}
        <div
          className={css({
            minHeight: "13em",
            padding: "0",
          })}
        >
          {links.map((link, index) => (
            <div
              key={index}
              className={css({
                display: "flex",
                alignItems: "center",
                position: "relative",
                marginBottom: "8px",
              })}
            >
              <input
                type="text"
                placeholder="Link"
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                className={css({
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                })}
              />
              {links.length > 1 && (
                <button
                  onClick={() => handleRemoveLink(index)}
                  className={css({
                    position: "absolute",
                    right: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#ccc",
                    cursor: "pointer",
                  })}
                >
                  -
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
