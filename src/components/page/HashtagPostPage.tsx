"use client";

import { css } from "@/../../styled-system/css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Tag from "@/components/Tag";
import Header from "@/components/Header";
import Button from "@/components/Buttons/Button";
export default function HashtagPostPage({
  nextStepUrl,
}: {
  nextStepUrl?: string;
}) {
  const router = useRouter();

  // 각 카테고리별 태그 상태
  const [genreTags, setGenreTags] = useState<string[]>([]);
  const [moodTags, setMoodTags] = useState<string[]>([]);
  const [stepTags, setStepTags] = useState<string[]>([]);
  const [workingHoursTags, setWorkingHoursTags] = useState<string[]>([]);
  const [regionTags, setRegionTags] = useState<string[]>([]);
  const [skillTags, setSkillTags] = useState<string[]>([]);

  // 미리 정의된 태그 데이터
  const predefinedTags = {
    Genre: [
      "Country",
      "Electronic",
      "Dance",
      "Hip-hop",
      "Jazz",
      "Latin",
      "Pop",
      "Rock",
      "R&B",
      "Classical",
    ],
    Mood: [
      "Happy",
      "Exuberant",
      "Energetic",
      "Frantic",
      "Anxious/Sad",
      "Depression",
      "Calm",
      "Contentment",
    ],
    Step: [
      "Composition",
      "Arrangement",
      "Production",
      "Mixing",
      "Mastering",
      "Vocal",
    ],
    WorkingHours: ["1~3h/day", "4~6h/day", "7~9h/day", "9~12h/day", "12h~/day"],
    Region: [
      "Africa",
      "Asia",
      "Europe",
      "North America",
      "Oceania",
      "South America",
    ],
    Skill: [
      "Creativity",
      "Communication",
      "Rhythmic",
      "Grasp music theory concepts",
      "Instrument playing",
      "Sing",
    ],
  };

  const handleSubmit = () => {
    console.log("Submitted data:", {
      genreTags,
      moodTags,
      stepTags,
      workingHoursTags,
      regionTags,
      skillTags,
    });
    // 서버로 데이터 전달 로직 추가
    router.push("/");
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        padding: "30px 16px",
        gap: "16px",
        backgroundColor: "#fff",
      })}
    >
      <Header nextStepUrl={`/`} />

      {/* 태그 섹션 */}
      <div
        className={css({
          width: "100%",
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        })}
      >
        <Tag
          category="Genre"
          tags={genreTags}
          predefinedTags={predefinedTags.Genre}
          editable={true}
          onChange={setGenreTags}
        />
        <Tag
          category="Mood"
          tags={moodTags}
          predefinedTags={predefinedTags.Mood}
          editable={true}
          onChange={setMoodTags}
        />
        <Tag
          category="Step"
          tags={stepTags}
          predefinedTags={predefinedTags.Step}
          editable={true}
          onChange={setStepTags}
        />
        <Tag
          category="My estimate working hour"
          tags={workingHoursTags}
          predefinedTags={predefinedTags.WorkingHours}
          editable={true}
          onChange={setWorkingHoursTags}
        />
        <Tag
          category="Region"
          tags={regionTags}
          predefinedTags={predefinedTags.Region}
          editable={true}
          onChange={setRegionTags}
        />
        <Tag
          category="Skill"
          tags={skillTags}
          predefinedTags={predefinedTags.Skill}
          editable={true}
          onChange={setSkillTags}
        />
      </div>

      {/* 등록 버튼 */}
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
