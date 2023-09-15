import { useEffect, useState } from "react";
import { getTodo } from "../api/todo";

export default function useFetchData() {
  const [data, setData] = useState([]);

  async function loadData() {
    try {
      const { data } = await getTodo();
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
