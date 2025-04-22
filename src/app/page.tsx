"use client";

import { css } from "../../styled-system/css";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className={css({
        display: "flex",
        flexDirection: "column",
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.1em",
      })}
    >
      <div>Hello World!</div>
      <Link
        className={css({
          padding: "0.5em 1em",
          backgroundColor: "#000000",
          color: "#ffffff",
          borderRadius: "0.5em",
        })}
        href="/help/1"
      >
        Help
      </Link>
      <Link
        className={css({
          padding: "0.5em 1em",
          backgroundColor: "#000000",
          color: "#ffffff",
          borderRadius: "0.5em",
        })}
        href="/help/1/feedback"
      >
        Help Feedback
      </Link>
      <Link
        className={css({
          padding: "0.5em 1em",
          backgroundColor: "#000000",
          color: "#ffffff",
          borderRadius: "0.5em",
        })}
        href="/team-match/1"
      >
        Team Match
      </Link>
      <Link
        className={css({
          padding: "0.5em 1em",
          backgroundColor: "#000000",
          color: "#ffffff",
          borderRadius: "0.5em",
        })}
        href="/team-match/1/chat"
      >
        Team Match Chat
      </Link>
      <Link
        className={css({
          padding: "0.5em 1em",
          backgroundColor: "#000000",
          color: "#ffffff",
          borderRadius: "0.5em",
        })}
        href="/post/help?step=upload"
      >
        Help Post
      </Link>
      <Link
        className={css({
          padding: "0.5em 1em",
          backgroundColor: "#000000",
          color: "#ffffff",
          borderRadius: "0.5em",
        })}
        href="/post/portfolio?step=upload"
      >
        Portfolio Post
      </Link>
      <Link
        className={css({
          padding: "0.5em 1em",
          backgroundColor: "#000000",
          color: "#ffffff",
          borderRadius: "0.5em",
        })}
        href="/post/team-match?step=content"
      >
        Team Match Post
      </Link>
    </main>
  );
}
