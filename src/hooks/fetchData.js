import { useEffect, useState } from "react";

/**
 * It's a custom hook that fetches data from an API and returns the data, an error, and a loading state
 * @returns An object with the studentData, error, and loading state.
 */
export const useFetchData = () => {
  const [studentData, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(
        `https://api.hatchways.io/assessment/students`,
        requestOptions
      );

      if (!response.ok || response.status === 400) {
        const error = await response.text();
        setError(error);
        setLoading(false);
        return;
      }
      const studentList = await response.text();
      const parsedStudent = JSON.parse(studentList);
      setData(parsedStudent.students);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    handleRequest();
  }, []);

  return { studentData, error, loading, setData };
};
