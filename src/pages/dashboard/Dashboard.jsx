// Dashboard.js

import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import "./Dashboard.css";

import CustButton from "../../component/common/button/CustButton";
import DataTable from "../../component/table/DataTable";

import dashlogo from "../../assets/dash-logo.svg";

import dash from "../../assets/dashboard/dash.svg";
import upload from "../../assets/dashboard/upload.svg";
import invoice from "../../assets/dashboard/invoice.svg";
import calender from "../../assets/dashboard/calender.svg";
import notification from "../../assets/dashboard/notification.svg";
import setting from "../../assets/dashboard/setting.svg";
import schedule from "../../assets/dashboard/schedule.svg";
import bell from "../../assets/dashboard/bell.svg";
import avator from "../../assets/dashboard/avatar.png";
import excel from "../../assets/dashboard/excel.svg";
import uploadarrow from "../../assets/upload-arrow.svg";
import burger from "../../assets/burger.svg";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigator = useNavigate();
  const [csvData, setCsvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showburger, setshowburger] = useState(false);
  const [fileName, setFileName] = useState("");
  const [signOut, setSignOut] = useState(true);

  const fileInputRef = useRef(null);

  const handleDrop = async (e) => {
    e.preventDefault();
    setLoading(true);

    const file = e.dataTransfer.files[0];
    if (file) {
      await readCsv(file);
      setFileName(file.name);
    }

    setLoading(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const readCsv = async (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data);
          resolve();
        },
        header: true,
        skipEmptyLines: true,
      });
    });
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = async (e) => {
    setLoading(true);
    setUploading(true);

    const file = e.target.files[0];
    if (file) {
      try {
        await readCsv(file);
        setFileName(file.name);
      } catch (error) {
        console.error("Error reading CSV:", error);
      }
    }

    setTimeout(() => {
      setLoading(false);
      setUploading(false);
    }, 500);
  };

  const handleClearFile = () => {
    setCsvData(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleburger = () => {
    setshowburger(!showburger);
  };

  const handleSignout = () => {
    setSignOut(!signOut);
  };

  let sec = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigator("/");
    }
  }, [sec]);

  return (
    <>
      <div className="dasboard-container">
        <div className="header-dashbard-mob">
          <div className="hande-burger" onClick={handleburger}>
            <img src={burger} alt="burger-icon" />
          </div>

          <div className="mid-icons">
            <div className="header-box">
              <img src={dashlogo} alt="dash-logo" />
              <p className="base-header">Base</p>
            </div>

            <div className="avator-div">
              <img src={bell} alt="bell-icon" />
              <div className="avatar">
                <img src={avator} alt="avatar-image" />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`side-bar ${
            showburger === false ? "show-burger show" : "show-burger"
          }`}
        >
          <div className="header">
            <img src={dashlogo} alt="dash-logo" />
            <p className="base-header">Base</p>
          </div>

          <div className="mob-header">
            <div className="icons-text">
              <img src={dashlogo} alt="dash-logo" />
              <p className="base-header">Base</p>
            </div>

            <div className="cross-icon" onClick={handleburger}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M25.3424 14.6568L19.6855 20.3137M19.6855 20.3137L14.0287 14.6568M19.6855 20.3137L14.0287 25.9706M19.6855 20.3137L25.3424 25.9706"
                  stroke="#999CA0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="sidebar-icons">
            <div className="selected"></div>
            <CustButton icon={dash} text={"Dashboard"} />
            <CustButton icon={upload} text={"Upload"} />
            <CustButton icon={invoice} text={"Invoice"} />
            <CustButton icon={schedule} text={"Schedule"} />
            <CustButton icon={calender} text={"Calendar"} />
            <CustButton icon={notification} text={"Notification"} />
            <CustButton icon={setting} text={"Settings"} />
          </div>
        </div>

        <div
          className="main-container"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="top-nav">
            <p className="csv-upload">Upload CSV</p>
            <div className="avator-div">
              <img src={bell} alt="bell-icon" />

              <div className="avatar" onClick={handleSignout}>
                <img src={avator} alt="avatar-image" />
              </div>

              <div
                className={`tool-pick ${
                  signOut ? "show-signout" : "hide-signout"
                }`}
              >
                <p
                  onClick={() => {
                    localStorage.clear("token");
                    navigator("/");
                  }}
                >
                  sign-Out
                </p>
              </div>
            </div>
          </div>

          <div className="droper-container">
            <div className="drop-image">
              <img src={excel} alt="excel" />
              <p className="desktop-upload-text">
                {uploading ? (
                  "Uploading..."
                ) : fileName ? (
                  <>
                    {fileName}
                    {csvData && (
                      <div className="clear-file-btn" onClick={handleClearFile}>
                        <p>Remove</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="uploaded-text" style={{ color: "#999CA0" }}>
                    Drop your excel sheet here or{" "}
                    <span style={{ color: "blue" }}>browser</span>
                  </p>
                )}
              </p>

              <p className="mob-upload-text" style={{ wordWrap: "break-word" }}>
                {fileName ? (
                  <span
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    <span style={{ color: "#999ca0" }}> {fileName}</span>
                    {csvData && (
                      <div className="clear-file-btn" onClick={handleClearFile}>
                        <p style={{ color: "red", paddingTop: "1rem" }}>
                          Remove
                        </p>
                      </div>
                    )}
                  </span>
                ) : (
                  <p>
                    Upload your excel sheet{" "}
                    <span style={{ color: "blue" }}>here</span>
                  </p>
                )}
              </p>
            </div>

            <div
              className={`upload-btn ${fileName ? "blur" : ""}`}
              onClick={handleUploadButtonClick}
            >
              {uploading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                </div>
              ) : (
                <>
                  <img src={uploadarrow} alt="upload-arrow" />
                  <p>{fileName ? `${"Upload"}` : "Upload"}</p>
                </>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
          </div>

          {loading && <p>Loading...</p>}

          {csvData && (
            <div className="existing-image">
              <p>Uploads</p>

              <div className="my-table">
                <DataTable csvdata={csvData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
