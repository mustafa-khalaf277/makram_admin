import Axios from "axios"
import {
  useNavigate
} from "react-router-dom"
import {
  ErrorMessage
} from "../components/ErrorMessage.js"
export async function GetQuestion(examId) {
  try {
    const fetch = await
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/get_unCorrection_question.php?exam_id=${examId}`)
    if (fetch.status == 200) {

      return(fetch.data);
    } else {
      ErrorMessage("لقد حدث خطاء")
      return false;
    }
  }catch(e) {
    ErrorMessage("لقد حدث خطاء")
    if (e.status == 404) {
      navigate("/404")
    }

    return false;
  }
}
export async function IsertAnswer(id, mark) {
  try {
    const fetch = await
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/correct_answer.php?id=${id}&mark=${mark}`)
    if (fetch.status == 200) {
      return "success";
    } else {
      ErrorMessage("لقد حدث خطاء")
      return false;
    }
  }catch(e) {
    ErrorMessage("لقد حدث خطاء")
    if (e.status == 404) {
      navigate("/404")
    }

    return false;
  }}