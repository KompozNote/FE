import { css } from "@/../../styled-system/css";

// 동적 라우팅 파라미터 가져오기
type Props = {
  params: { id: string };
};

const mockData = {
  id: 1,
  title: "Sample Title",
  content:
    "Sample content for the team match detail page. This is a longer description to simulate the content area.",
  Hashtag: ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "+8"],
  PeopleInvolved: [
    { id: 2, name: "John Doe", role: "Developer" },
    { id: 3, name: "Jane Smith", role: "Designer" },
    { id: 4, name: "Alice Johnson", role: "Manager" },
    { id: 5, name: "Alice Johnson", role: "Manager" },
  ],
};

export default function TeamMatchDetailPage({ params }: Props) {
  const { id } = params;

  const { title, content, Hashtag, PeopleInvolved } = mockData;

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "16px",
        maxWidth: "400px",
        margin: "0 auto",
        gap: "24px",
        paddingBottom: "80px", // 버튼 영역 확보
      })}
    >
      {/* Content Section */}
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        })}
      >
        {/* Title and Content */}
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            minHeight: "25vh",
            overflow: "hidden",
          })}
        >
          <span
            className={css({
              fontSize: "lg",
              fontWeight: "bold",
            })}
          >
            {title}
          </span>
          <p
            className={css({
              color: "#666",
              fontSize: "14px",
              lineHeight: "1.5",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
            })}
          >
            {content}
          </p>
        </div>

        {/* Hashtags */}
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            minHeight: "15vh",
            width: "100%",
          })}
        >
          <span
            className={css({
              fontWeight: "bold",
            })}
          >
            Hashtag
          </span>
          <div
            className={css({
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            })}
          >
            {Hashtag.map((tag, index) => (
              <div
                key={index}
                className={css({
                  padding: "4px 8px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "4px",
                  fontSize: "12px",
                })}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* People Involved */}
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            minHeight: "25vh", // 화면 높이의 25%를 차지
          })}
        >
          <span
            className={css({
              fontWeight: "bold",
              marginBottom: "12px",
            })}
          >
            People involved
          </span>
          <div
            className={css({
              display: "flex",
              gap: "16px",
              width: "100%",
              justifyContent: "space-between",
              flexWrap: "wrap",
            })}
          >
            {PeopleInvolved.map((person) => (
              <div
                key={person.id}
                className={css({
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                })}
              >
                <div
                  className={css({
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#e0e0e0",
                  })}
                />
                <span
                  className={css({
                    fontSize: "sm",
                  })}
                >
                  {person.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Button */}
      <button
        className={css({
          position: "fixed",
          bottom: "0",
          width: "100%",
          maxWidth: "400px",
          padding: "12px",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "5px",
          fontWeight: "bold",
          textAlign: "center",
          cursor: "pointer",
        })}
      >
        Join in
      </button>
    </div>
  );
}
