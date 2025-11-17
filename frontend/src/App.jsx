import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const analyzeResume = async () => {
    if (!resumeFile) {
      alert("Please upload a resume first!");
      return;
    }

    setLoading(true);   // start loader
    setResult(null);    // clear previous results

    const formData = new FormData();
    formData.append("file", resumeFile);

    try {
      // Step 1: Extract text from resume
      const extractRes = await axios.post(
        "http://127.0.0.1:8000/upload_resume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Step 2: Analyze with job description
      const analyzeRes = await axios.post(
        "http://127.0.0.1:8000/analyze",
        {
          resume_text: extractRes.data.resume_text,
          job_description: jobDesc,
        }
      );

      setResult(analyzeRes.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong — check backend console.");
    }

    setLoading(false);   // stop loader
  };

  return (
    <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
      <h1 style={{ marginBottom: 20, textAlign: "center", fontFamily: "Verdana, Geneva,Tahoma, sans-serif"}}>AI Resume Analyzer</h1>

      <div style={{ marginBottom: 20 }}>
        <h3>Upload Resume</h3>
        <input type="file" onChange={handleUpload} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3>Paste Job Description</h3>
        <textarea
          rows="6"
          style={{ width: "100%", padding: 10 }}
          placeholder="Paste job description here..."
          onChange={(e) => setJobDesc(e.target.value)}
        />
      </div>

      <button
        onClick={analyzeResume}
        disabled={loading}
        style={{
          padding: "10px 20px",
          // background: loading ? "#777" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* Loader */}
      {loading && (
        <div style={{ marginTop: 20, fontSize: 20, fontWeight: "bold" }}>
          🤖 AI is analyzing your resume...
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div
          style={{
            marginTop: 32,
            padding: 24,
            borderRadius: 12,
            // background: "#f8f9fa",
            border: "1px solid #ddd",
          }}
        >
          <h2 style={{ marginBottom: 16 }}>Results</h2>

          {/* Score */}
          <div style={{ width: 150, margin: "auto" }}>
            <CircularProgressbar
              value={result.match_score}
              text={`${result.match_score}%`}
              styles={buildStyles({
                textSize: "16px",
                textColor: "#ffffffff",
                pathColor:
                  result.match_score >= 70 ? "#28a745" : "#ff8500",
                trailColor: "#eee",
              })}
            />
          </div>

          {/* Missing Keywords */}
          <h3 style={{ marginTop: 24 }}>Missing Keywords</h3>
          {result.missing_keywords.length === 0 ? (
            <p style={{ color: "green" }}>Great! No missing keywords 🎉</p>
          ) : (
            <ul>
              {result.missing_keywords.map((k) => (
                <li key={k} style={{ marginBottom: 4 }}>
                  {k}
                </li>
              ))}
            </ul>
          )}

          {/* Suggestions (Markdown) */}
          <h3 style={{ marginTop: 24 }}>Suggestions</h3>
          <div
            style={{
              // background: "#fff",
              padding: 16,
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          >
            <ReactMarkdown>{result.suggestions}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;