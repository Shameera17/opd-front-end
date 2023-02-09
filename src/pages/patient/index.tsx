import { useEffect } from "react";
import Appointments from "../../components/Appointments";

const Patient = () => {
  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);
  return (
    <div style={{ height: "100vh" }}>
      <Appointments />
    </div>
  );
};

export default Patient;
