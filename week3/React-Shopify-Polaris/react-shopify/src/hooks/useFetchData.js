import { useEffect, useState } from "react";
import { getTodo } from "../api/todo";

export default function useFetchData(path = "") {
  const [data, setData] = useState([]);

  async function loadData() {
    try {
      const { data } = await getTodo(path);
      setData(data.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return { data, setData };
}
