import {useEffect, useState} from "react";
import axios from "axios";

export const useGetData = (url ) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getData = async () => {
    return await axios.get(`${url}`)
  }
  useEffect(() => {
    getData().then((res) => {
      setData(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setError(err);
      setLoading(false)
    })
  }, []);
  return {data, loading, error , setData}
}