import Axios from "axios"
import {
  ErrorMessage
} from "../components/ErrorMessage.js"
export async function AllResults(page) {
 // try {
    const fetch = await
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/exams.php?${page}`)
    if (fetch.status == 200) {
      return fetch.data
    } else {
      ErrorMessage("لقد حدث خطأ")
      return null
    }
//  }catch (e) {
 //   ErrorMessage("لقد حدث خطأ")
 // }
}