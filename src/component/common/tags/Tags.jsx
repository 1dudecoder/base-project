import React, { useEffect, useState } from "react";
import "./Tag.css";

function Tags({ tag }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (tag && tag.length >= 1) {
      setTags(tag.split(" "));
    }
  }, [tag]);

  return (
    <>
      {tags &&
        tags.map((item) => {
          return (
            <span className="tags-item">
              <p>{item}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5 5L8 8M8 8L5 11M8 8L11 11M8 8L11 5"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          );
        })}
    </>
  );
}

export default Tags;
