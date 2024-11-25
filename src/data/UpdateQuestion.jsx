import Axios from "axios"
import {
  ErrorMessage
} from "../components/ErrorMessage.js"
export async function UpdateQuestion(data) {
  try {
    const fetch = await Axios( {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_URL}/admin/update_question.php`,
      data: data
    });
    if (fetch.status == 200 && fetch.data.status == "success") {
      return true;
    } else {
      ErrorMessage("لقد حدث خطأ")
      return null
    }
  }catch (e) {
    ErrorMessage("لقد حدث خطأ")
  }
}