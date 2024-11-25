import Axios from "axios"
import {
  useNavigate
} from "react-router-dom"
import {
  ErrorMessage
} from "../components/ErrorMessage.js"
export async function UserResult(examId, userId, navigate, setLoader) {
  try {
    const fetch = await
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/result.php?exam_id=${examId}&user_id=${userId}`)
    if (fetch.status == 200 && fetch.data.status == "success") {
      setLoader(false)
      return(fetch.data);
    } else {
      setLoader(false)
      ErrorMessage("لقد حدث خطاء")
    }
  }catch(e) {
    setLoader(false)
    ErrorMessage("لقد حدث خطاء")
    if (e.status == 404) {
      navigate("/404")
    }


  }
}