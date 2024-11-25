import Axios from "axios"
import {
  ErrorMessage
} from "../components/ErrorMessage.js"
export async function DeleteExam(id) {
  try {
    const fetch = await
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/deleteExam.php?exam_id=${id}`)
    if (fetch.status == 200) {
      return true
    } else {
      ErrorMessage("لقد حدث خطأ")
      return null
    }
  }catch (e) {
    ErrorMessage("لقد حدث خطأ")
  }
}