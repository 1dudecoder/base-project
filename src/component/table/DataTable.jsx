import React, { useEffect, useState } from "react";
import "./DataTable.css"; // Import the CSS file for styling
import Dropdown from "../common/dropdown/Dropdown";
import Tags from "../common/tags/Tags";

const DataTable = ({ csvdata }) => {

  const [data, setData] = useState([]);
  const [selecttags, setselectedtags] = useState([]);

  const handleSelect = (id, item) => {
    let newdata = data.map((d) => {
      if (item) {
        if (d.id === id.id) {
          d["selected tags"] += item + ",";
          return { ...d };
        }
      }
      return d;
    });
    setData(newdata);
  };

  const handleTagsDelete = (text, id) => {
    let newdata = data.map((item) => {
      if (item.id === id) {
        const resultString = item["selected tags"].replace(text + ",", "");
        item["selected tags"] = resultString;
        return item;
      }
      return item;
    });
    setData(newdata);
  };

  useEffect(() => {
    if (csvdata && csvdata.length > 1) {
      setData(csvdata);
    }
  }, [csvdata, data]);

  return (
    <div className="data-table-container">
      <div className="data-row data-header ">
        <div className="data-cell first">SL.No</div>
        <div className="data-cell">Links</div>
        <div className="data-cell">Prefix</div>
        <div className="data-cell">Add Tags</div>
        <div className="data-cell last">Selection Tags</div>
      </div>

      {data.length &&
        data.map((row, index) => (
          <div key={index} className="data-row-down">
            <div className="data-cell-item first">{row.id}</div>

            <div className="data-cell-item">
              <a href={row.links} target="_blank" rel="noopener noreferrer">
                {row.links}
              </a>
            </div>
            <div className="data-cell-item">{row.prefix}</div>

            <div className="data-cell-item">
              {
                <Dropdown
                  myoptions={row["select tags"]}
                  setselectedtags={setselectedtags}
                  selecttags={selecttags}
                  handleSelect={handleSelect}
                  id={row}
                />
              }
            </div>
            <div className="data-cell-item last">
              <Tags
                handleTagsDelete={handleTagsDelete}
                id={row.id}
                tag={row["selected tags"]}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default DataTable;
