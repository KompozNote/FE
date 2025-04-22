"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ContentPostPage from "@/components/page/ContentPostPage";
import HashtagPostPage from "@/components/page/HashtagPostPage";

export default function HelpPostPage() {
  const params = useSearchParams();
  const step = params.get("step") ?? "upload"; //null 값 뱉으면 upload를 기본값으로 설정

  return (
    <div>
      {step === "content" && (
        <ContentPostPage
          basePath="team-match"
          showLinks={false}
          titleText="Who would you like to team up with?"
          nextStepUrl="hashtag"
        />
      )}{" "}
      {step === "hashtag" && <HashtagPostPage />}
    </div>
  );
}
