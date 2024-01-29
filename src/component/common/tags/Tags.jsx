import React, { useEffect, useState } from "react";
import "./Tag.css";

function Tags({ tag, handleTagsDelete, id }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (tag && tag.length >= 1) {
      let newdata = tag.trim();
      setTags(newdata.split(","));
    }
  }, [tag]);

  return (
    <>
      {tags &&
        tags.map((item, index) => {
          if (index !== tags.length - 1) {
            return (
              <span className="tags-item">
                <p>{item}</p>

                <div
                  style={{ display: "flex", textAlign: "center" }}
                  onClick={() => {
                    handleTagsDelete(item, id);
                  }}
                >
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
                </div>
              </span>
            );
          }
        })}
    </>
  );
}

export default Tags;
