"use client";
import { css } from "../../styled-system/css";
import Button from "@/components/Buttons/Button";
import { FaCode } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { LuPlus, LuArrowLeft } from "react-icons/lu";

export default function Home() {
  const router = useRouter();
  return (
    <div
      className={css({
        display: "flex",
        fontSize: "10em",
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.1em",
      })}
    >
      <FaCode />
      <span>Hello World!</span>
      <Button
        variant="back"
        size="lg"
        icon={<LuArrowLeft />}
        onClick={() => router.back()}
      />
    </div>
  );
}
