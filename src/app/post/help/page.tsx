"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ContentPostPage from "@/components/page/ContentPostPage";
import Mp3PostPage from "@/components/page/Mp3PostPage";
import EditPage from "@/components/page/EditPage";
import InputPostPage from "@/components/page/InputPostPage";
import PicturePostPage from "@/components/page/PicturePostPage";
import HashtagPostPage from "@/components/page/HashtagPostPage";

export default function HelpPostPage() {
  const params = useSearchParams();
  const step = params.get("step") ?? "upload"; //null 값 뱉으면 upload를 기본값으로 설정

  return (
    <>
      {step === "upload" && <Mp3PostPage basePath="help" />}
      {step === "edit" && <EditPage basePath="help" />}
      {step === "title" && (
        <InputPostPage
          title="Music Title"
          basePath="help"
          nextStepUrl="content"
        />
      )}
      {step === "content" && <PicturePostPage basePath="help" />}
      {step === "reference" && (
        <ContentPostPage
          showLinks={true}
          basePath="help"
          nextStepUrl="hashtag"
        />
      )}
      {step === "hashtag" && <HashtagPostPage />}
    </>
  );
}
