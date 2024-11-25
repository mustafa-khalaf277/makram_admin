import Axios from "axios"
import {
  ErrorMessage
} from "../components/ErrorMessage.js"
export async function InsertExam(data) {
  try {
    const fetch = await Axios( {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_URL}/admin/add_exam.php`,
      data: data
    });
    if (fetch.status == 200) {
      window.location.reload()
    } else {
      ErrorMessage("لقد حدث خطأ")
      return null
    }
  }catch (e) {
    ErrorMessage("لقد حدث خطأ")
  }
}