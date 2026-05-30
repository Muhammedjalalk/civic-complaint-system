import { useState, useEffect } from "react";
import axiosInstance from "./api/axios";
import { motion } from "framer-motion";

function Queries() {
  const [form, setForm] = useState({
    subject: "",
    message: ""
  });
  const [list, setList] = useState([]);

  const submitQuery = async () => {
    if (!form.subject || !form.message) {
      alert("All fields required");
      return;
    }

    await axiosInstance.post("/citizen/queries/", form);
    setForm({ subject: "", message: "" });
    loadList();
  };

  const loadList = async () => {
    const res = await axiosInstance.get("/citizen/queries/history/");
    setList(res.data);
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div style={styles.page}>
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.title}
      >
        Ask a Query
      </motion.h2>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={styles.card}
      >
        <input
          placeholder="Enter Subject"
          value={form.subject}
          onChange={(e) =>
            setForm({ ...form, subject: e.target.value })
          }
          style={styles.input}
        />

        <textarea
          rows="4"
          placeholder="Enter your message"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          style={styles.textarea}
        ></textarea>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={submitQuery}
          style={styles.button}
        >
          Submit Query
        </motion.button>
      </motion.div>

      {/* History Section */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={styles.subtitle}
      >
        Query History
      </motion.h3>

      <div style={styles.list}>
        {list.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={styles.queryCard}
          >
            <h4 style={styles.subject}>{q.subject}</h4>
            <p style={styles.message}>{q.message}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Queries;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(120deg, #1e3c72, #2a5298)",
    padding: "40px",
    fontFamily: "Arial"
  },
  title: {
    textAlign: "center",
    color: "#fff",
    marginBottom: "20px",
    fontSize: "32px"
  },
  card: {
    maxWidth: "500px",
    margin: "auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2a5298",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  subtitle: {
    marginTop: "40px",
    color: "#fff",
    textAlign: "center"
  },
  list: {
    maxWidth: "700px",
    margin: "auto",
    marginTop: "20px"
  },
  queryCard: {
    background: "#fff",
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "8px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
  },
  subject: {
    margin: "0",
    color: "#2a5298"
  },
  message: {
    marginTop: "8px",
    color: "#444"
  }
};
