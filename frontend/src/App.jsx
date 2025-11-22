import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function App() {
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      console.log(
          "%c  ██████╗   ██╗ █████╗  ██████╗ \n" +
            " ██╔════╝   ██║██╔══██╗██╔═══██╗\n" +
            " ██║        ██║███████║██║   ██║\n" +
            " ██║        ██║██╔══██║██║   ██║\n" +
            " ╚██████╗   ██║██║  ██║╚██████╔╝\n" +
            "  ╚═════╝   ╚═╝╚═╝  ╚═╝ ╚═════╝ \n" +  
            "%c",
            "font-weight: bold; font-size: 14px; background: linear-gradient(90deg, #3b82f6, #06b6d4); -webkit-background-clip: text; color: transparent; text-shadow: 2px 2px 5px rgba(0,0,0,0.3);",
            "font-size: 16px; color: #f59e0b; font-weight: bold; line-height: 1.5;"
          );
      console.log(
        "%cWelcome to AI Resume Analyzer 🚀",
        "font-size: 16px; color: #0ff; font-weight: bold;"
      );
    }
    hasRun.current = true;
  }, []);

  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => setResumeFile(e.target.files[0]);

  const analyzeResume = async () => {
    if (!resumeFile) return alert("Please upload a resume first!");

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", resumeFile);

    try {
      const extractRes = await axios.post(
        "http://127.0.0.1:8000/upload_resume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const analyzeRes = await axios.post("http://127.0.0.1:8000/analyze", {
        resume_text: extractRes.data.resume_text,
        job_description: jobDesc,
      });

      setResult(analyzeRes.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong — check backend console.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Resume Analyzer</h1>

      <div style={styles.section}>
        <h3 style={styles.subtitle}>Upload Resume</h3>
        <input type="file" onChange={handleUpload} style={styles.inputFile} />
      </div>

      <div style={styles.section}>
        <h3 style={styles.subtitle}>Paste Job Description</h3>
        <textarea
          rows="6"
          style={styles.textarea}
          placeholder="Paste job description here..."
          onChange={(e) => setJobDesc(e.target.value)}
        />
      </div>

      <button
        onClick={analyzeResume}
        disabled={loading}
        style={{
          ...styles.button,
          cursor: loading ? "not-allowed" : "pointer",
          background: loading
            ? "linear-gradient(90deg, #555, #333)"
            : "linear-gradient(90deg, #06b6d4, #3b82f6)",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {loading && <div style={styles.loader}>🤖 AI is analyzing your resume...</div>}

      {result && !loading && (
        <div style={styles.resultCard}>
          <h2 style={styles.resultTitle}>Results</h2>

          <div style={{ width: 160, margin: "20px auto" }}>
            <CircularProgressbar
              value={result.match_score}
              text={`${result.match_score}%`}
              styles={buildStyles({
                textSize: "18px",
                textColor: "#fff",
                pathColor: result.match_score >= 70 ? "#28a745" : "#ff8500",
                trailColor: "rgba(255, 255, 255, 0.2)",
              })}
            />
          </div>

          <h3 style={styles.resultSubtitle}>Missing Keywords</h3>
          {result.missing_keywords.length === 0 ? (
            <p style={{ color: "#28a745" }}>🎉 No missing keywords!</p>
          ) : (
            <ul style={{ paddingLeft: 20 }}>
              {result.missing_keywords.map((k) => (
                <li key={k} style={{ marginBottom: 6 }}>
                  {k}
                </li>
              ))}
            </ul>
          )}

          <h3 style={styles.resultSubtitle}>Suggestions</h3>
          <div style={styles.suggestions}>
            <ReactMarkdown>{result.suggestions}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
    padding: "50px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    innerHeight: "90vh",
  },
  title: {
    marginBottom: 50,
    textAlign: "center",
    fontSize: 42,
    fontWeight: "bold",
    background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  section: { marginBottom: 30 },
  subtitle: { marginBottom: 12, fontSize: 20, fontWeight: 600 },
  inputFile: {
    padding: 12,
    borderRadius: 10,
    border: "2px dashed #06b6d4",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#fff",
    cursor: "pointer",
    width: "90%",
  },
  textarea: {
    width: "90%",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #06b6d4",
    fontSize: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#fff",
    // resize: "vertical",
  },
  button: {
    padding: "14px 35px",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 18,
    fontWeight: "bold",
    transition: "all 0.3s ease",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
  },
  loader: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#06b6d4",
    animation: "pulse 1.5s infinite",
  },
  resultCard: {
    marginTop: 40,
    padding: 30,
    borderRadius: 20,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.2)",
    backdropFilter: "blur(15px)",
    boxShadow: "0px 10px 40px rgba(0,0,0,0.4)",
  },
  resultTitle: { textAlign: "center", fontSize: 28, marginBottom: 20 },
  resultSubtitle: { marginTop: 20, marginBottom: 12, fontSize: 18 },
  suggestions: {
    suggestions: {
      padding: 16,
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.2)",
      backgroundColor: "rgba(255,255,255,0.05)",
      color: "#fff",
      maxWidth: "100%",
      overflowWrap: "break-word", 
      wordBreak: "break-word",
      whiteSpace: "pre-wrap",
    },
  },
};

// Optional: keyframe animation for loader
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}`, styleSheet.cssRules.length);

export default App;
