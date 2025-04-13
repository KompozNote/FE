// src/app/team-match/[id]/page.tsx
import { use } from "react";
import { notFound } from "next/navigation";

// 동적 라우팅 파라미터 가져오기
type Props = {
  params: { id: string };
};

export default function TeamMatchDetailPage({ params }: Props) {
  const { id } = params;

  return (
    <div>
      <p>팀매칭 ID: {id}</p>
    </div>
  );
}
