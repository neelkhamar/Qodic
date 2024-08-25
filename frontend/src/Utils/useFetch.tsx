import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/User/Action";
import { Context } from "./Context";

function useFetch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showMessage } = useContext(Context);
  const useAuth = useSelector((state: any) => state.auth);

  const baseURL = "http://localhost:8000/api";
  const [data, setData]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${useAuth?.token}`, // notice the Bearer before your token
        },
      };
      const response = await fetch(baseURL + url, options);
      if (!response.ok) {
        throw response;
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      // Token expired
      if (err?.status === 401) {
        dispatch(logoutUser());
        showMessage("error", "Session expired. Please login");
        return navigate("/auth/login");
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}

export default useFetch;
