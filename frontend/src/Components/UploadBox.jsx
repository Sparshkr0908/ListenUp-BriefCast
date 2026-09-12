import { useState, useRef } from "react";

const ACCEPT_TYPE = ["audio/mpeg", "audio/wav", "audio/mp4", "video/mp4", "audio/x-m4a"];
const MAX_SIZE_MB = 100;

function UploadBox({OnFileSelected}){
    const[isDragging, setIsDragging] = useState(false);
    const[error, setError] = useState("");
    const inputref = useRef(null); 

  function validateAndSelect(file) {
    if (!file) return;

    if (!ACCEPT_TYPE.includes(file.type)) {
      setError("Only audio or video files are supported (mp3, wav, mp4, m4a).");
      return;
    }

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_SIZE_MB) {
      setError(`File is too large. Keep it under ${MAX_SIZE_MB}MB.`);
      return;
    }

    setError("");
    OnFileSelected(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    validateAndSelect(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleInputChange(e) {
    const file = e.target.files?.[0];
    validateAndSelect(file);
  }


    return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputref.current?.click()}
        style={{
          border: `1.5px dashed ${isDragging ? "var(--accent)" : "var(--border)"}`,
          borderRadius: "var(--radius)",
          background: isDragging ? "var(--accent-light)" : "var(--surface)",
          padding: "40px 24px",
          textAlign: "center",
          cursor: "pointer",
          transition: "border-color 0.15s, background 0.15s",
        }}
      >
        <p style={{ fontSize: "15px", color: "var(--text-primary)", marginBottom: "4px" }}>
          Drop your meeting recording here
        </p>
        <p>or click to browse — mp3, wav, mp4, m4a up to {MAX_SIZE_MB}MB</p>
        <input
          ref={inputref}
          type="file"
          accept={ACCEPT_TYPE.join(",")}
          onChange={handleInputChange}
          style={{ display: "none" }}
        />
      </div>
      {error && (
        <p style={{ color: "var(--danger)", marginTop: "8px", fontSize: "13px" }}>
          {error}
        </p>
      )}
    </div>
  );
}
export default UploadBox;
