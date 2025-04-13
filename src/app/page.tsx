import { css } from "../../styled-system/css";

import { FaCode } from "react-icons/fa";

export default function Home() {
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
    </div>
  );
}
