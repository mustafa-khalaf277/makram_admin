import {
  useState,
  useRef,
  useEffect
} from "react"
import {
  FaChevronDown
} from "react-icons/fa";
import Axios from "axios"
import {
  ErrorMessage
} from "../ErrorMessage.js"
import {
  InsertExam
} from "../../data/InsertExam.jsx"


export default function AddForm( {
  setShowForm, setLoader
}) {

  const [courses,
    setCourses] = useState([])
  const [exams,
    setExams] = useState([])

  useEffect(()=> {
    try {
      Axios(`${import.meta.env.VITE_BACKEND_URL}/admin/all_courses_for_select.php`).then(e=>
        {
          e.status == 200? setCourses(e.data): ErrorMessage("لقد حدث خطأ")
        })
    }catch(e) {
      ErrorMessage("لقد حدث خطأ")
    }
    try {
      Axios(`${import.meta.env.VITE_BACKEND_URL}/admin/all_exams_for_select.php`).then(e =>
        {
          e.status == 200? setExams(e.data): ErrorMessage("لقد حدث خطأ")
        })
    }catch(e) {
      ErrorMessage("لقد حدث خطأ")
    }
  }, [])
  const HandleSubmitForm = (e)=> {
    e.preventDefault()
    setLoader(true)
    InsertExam(e.target)
  }

  return (
    <div className="fixed pb-10 overflow-auto z-20 w-full h-full left-0 top-0">
      <div className="w-screen  flex justify-center overflow-scroll px-4 lg:px-12 xl:px-20">
        <form onSubmit={HandleSubmitForm} method="POST" className="w-full mt-20 py-10 max-w-[600px] h-min bg-white shadow-[0_0_4px_rgba(0,0,0,0.15)]
          rounded">
          <h2 className="text-xl font-medium lg:text-2xl mb-5 text-center">اضافه امتحان</h2>
          <div className=" px-4">
            <div dir="rtl" className="relative z-0 w-full mb-5 group ">
              <input dir="auto" type="text" name="title" id="title"
              className="input " placeholder="العنوان " required />
          </div>
          <div dir="rtl" className="relative z-0 w-full mb-5 group ">
            <input dir="auto" type="number" name="count_of_suggestions" id="count_of_suggestions"
            className="input" placeholder=" عدد المساعدات" required />
        </div>


        <div className="pt-4" dir="rtl">
          <label htmlFor="courses" className="block mb-2 text-sm font-medium text-gray-900
            ">الكورس</label>
          <select id="courses" required size="5" name="course_id" className="select  ">
            {courses.map(e => <option key={e.id} value={e.id}> {e.title}</option>)}
          </select>
        </div>


        <div className="pt-4" dir="rtl">
          <label htmlFor="years" className="block mb-2 text-sm font-medium text-gray-900
            ">ربط بامتحان اخر</label>
          <select id="years" size="5" name="relation" className="select">
            {exams.map(e => <option key={e.id} value={e.id}> {e.title}</option>)}
          </select>
        </div>
        <div dir="rtl" className="relative z-0 w-full mb-5 group ">
          <textarea dir="auto" name="description"
            className="input mt-6" required placeholder=" الوصف"></textarea>
        </div>
      </div>
      <div className=" text-xl flex justify-center mt-4 gap-8">
        <button onClick={_=>setShowForm(e=>!e)} className=" bg-red-500 rounded border-red-500 border-4
          duration-300 hover:text-red-500
          text-white px-4 py-2 hover:bg-transparent border-red-500">
          الغاء
        </button>
        <button type="submit" className="bg-blue-600 rounded text-white px-4 py-2 duration-300
          hover:bg-transparent  border-blue-600 border-4 hover:text-blue-600">
          اضافه
        </button>
      </div>
    </form>
  </div>
</div>
)
}