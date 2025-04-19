"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ContentPostPage from "@/components/page/ContentPostPage";
import Mp3PostPage from "@/components/page/Mp3PostPage";
import EditPage from "@/components/page/EditPage";
import InputPostPage from "@/components/page/InputPostPage";
import PicturePostPage from "@/components/page/PicturePostPage";

export default function HelpPostPage() {
  const params = useSearchParams();
  const step = params.get("step") ?? "upload"; //null 값 뱉으면 upload를 기본값으로 설정

  return (
    <div>
      {step === "upload" && <Mp3PostPage />}
      {step === "edit" && <EditPage />}
      {step === "title" && (
        <InputPostPage
          title="Music Title"
          nextStepUrl="/post/help?step=singer"
        />
      )}
      {step === "content" && <PicturePostPage />}
      {step === "reference" && <ContentPostPage showLinks={true} />}
    </div>
  );
}
