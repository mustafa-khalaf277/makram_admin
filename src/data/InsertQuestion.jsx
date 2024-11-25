import Axios from "axios"
import {
  ErrorMessage
} from "../components/ErrorMessage.js"
export async function InsertQuestion(data) {
  try {
    const fetch = await Axios( {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_URL}/admin/add_question.php`,
      data: data
    });
    if (fetch.status == 200 && fetch.data.status == "success") {
      window.location.reload()
    } else {
      ErrorMessage("لقد حدث خطأ")
      return null
    }
  }catch (e) {
    ErrorMessage("لقد حدث خطأ")
  }
}