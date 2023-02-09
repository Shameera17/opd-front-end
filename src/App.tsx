import { Typography } from "@mui/material";
import { useEffect } from "react";
import "./App.css";
import FileRoutes from "./routes/FileRoutes";
function App() {
  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);
  return (
    <div className="App">
      <Typography
        variant="h3"
        style={{ backgroundColor: "#D6EFFF", padding: 2 }}
        component="h2"
      >
        {"OPD appointment"}
      </Typography>
      <FileRoutes />
    </div>
  );
}

export default App;
