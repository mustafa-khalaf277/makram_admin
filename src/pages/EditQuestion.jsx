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
} from "../components/ErrorMessage.js"
import {
  UpdateQuestion
} from "../data/UpdateQuestion.jsx"
import {
  useParams,
  useNavigate
} from "react-router-dom"
import {
  Loader
} from "../components/index.js"
import Swal from "sweetalert2"
export default function EditQuestion() {
  const [data,
    setData] = useState(false)
  const [loader,
    setLoader] = useState(true)
  const {
    id
  } = useParams()
  const navigate = useNavigate()
  const [urlImg,
    setUrlImg] = useState(true)
  const [isText,
    setIsText] = useState(true)
  useEffect(()=> {
    try {
      (()=> Axios(`${import.meta.env.VITE_BACKEND_URL}/admin/question.php?question_id=${id}`).then(e => {
        if (e.status == 200) {
          e.data.type == "text"?setIsText(true): setIsText(false)
          setData(e.data)
          setLoader(false)
        } else {
          ErrorMessage("حدث خطا ما")
          setLoader(false)
        }
      }))()
    }catch(error) {
      setLoader(false)
      ErrorMessage("حدث خطاء ما  ")

    }
  }, [id])




  const HandleSubmitForm = (e)=> {
    e.preventDefault()
    setLoader(true)
    UpdateQuestion(e.target).then(e => {
      if (e) {
        Swal.fire({
          icon: "success",
          title: "تم تعديل البيانات بنجاح"
        }).then(e => navigate(`/exam/${data.exam_id}`))
      }

      setLoader(false)})
  }

  return (
    <>
      {loader && <div className="w-full z-50 h-screen bg-black/30 fixed top-0 right-0">
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      </div>
      }


      { data && <div className="fixed pb-10 overflow-auto z-20 w-full h-full left-0 top-0">
        <div className="w-screen flex justify-center overflow-scroll px-4 lg:px-12 xl:px-20">
          <form encType="multipart/form-data" onSubmit={HandleSubmitForm} method="POST" className="w-full mt-20 py-10 max-w-[600px] h-min bg-white shadow-[0_0_4px_rgba(0,0,0,0.15)]
            rounded">
            <input value={id} name="question_id" type="hidden" />
          <h2 className="text-xl font-medium lg:text-2xl mb-5 text-center">تعديل
            سؤال</h2>
          <div className=" px-4">

            <div className="text-lg text-right">
              السؤال
            </div>
            <div dir="rtl" className="relative z-0 w-full mb-5 group ">
              <input dir="auto" type="text" name="title" id="title"
              className="input " value={data.title}
              onChange={e=>setData({ ...data,
                title: e.target.value })} placeholder="العنوان " required
              />
          </div>
          <div className="flex gap-5">

            <div dir="rtl" className="relative z-0 w-full mb-5 group ">
              <div className="text-lg text-right">
                درجات السؤال
              </div>
              <input dir="auto" type="number" name="question_mark" id="question_mark"
              className="input " value={data.question_mark}
              onChange={e=>setData({ ...data,
                question_mark: e.target.value })} placeholder="الدرجات" required />
          </div>
          <div dir="rtl" className="relative z-0 w-full mb-5 group ">
            <div className="text-lg text-right">
              وقت السؤال
            </div>
            <input dir="auto" type="number" name="expirt_time" id="expirt_time"
            className="input " value={data.expirt_time/60}
            onChange={e=>setData({ ...data,
              expirt_time: e.target.value })} placeholder="   الوقت بالدقائق" required />
        </div>

      </div>
      {
      !isText && <div>
        <input type="hidden" value="choose" name="type" />
      <input dir="auto" value={data.a}
      onChange={e=>setData({ ...data,
        a: e.target.value })} name="a" className="input mb-3" placeholder="a" required />
    <input dir="auto" value={data.b}
    onChange={e=>setData({ ...data,
      b: e.target.value })} name="b" className="input mb-3" placeholder="b" required />
  <input dir="auto" value={data.c}
  onChange={e=>setData({ ...data,
    c: e.target.value })} name="c" className="input mb-3" placeholder="c" required />
  <input dir="auto" value={data.d}
  onChange={e=>setData({ ...data,
    d: e.target.value })} name="d" className="input mb-3" placeholder="d" required />
<select dir="rtl" defaultValue={data.choose_answer}
  onChange={e=>setData({ ...data,
    choose_answer: e.target.value })} name="choose_answer" className="select mb-4" required>
  <option disabled value="">اختر الاجابه الصحيحه</option>
  <option value="a"> a</option>
  <option value="b"> b</option>
  <option value="c"> c</option>
  <option value="d"> d</option>
</select>

<textarea dir="auto" value={data.answer_details}
  onChange={e=>setData({ ...data,
    answer_details: e.target.value })} name="answer_details"
  className="input" required
  placeholder=" وصف الاجابه الصحيحه"></textarea>

</div>
}
{
isText && <div>
<input type="hidden" value="choose" name="text" />
<div className="text-lg text-right">
الاجابه الصحيحه
</div>
<textarea dir="auto" name="answer_details"
className="input mb-4" value={data.text_answer}
onChange={e=>setData({ ...data,
text_answer: e.target.value })} required
placeholder="   الاجابه الصحيحه"></textarea>

</div>
} < div className = "relative w-min mx-auto mt-10" onClick = {
_=>setUrlImg(!urlImg)} >
<div className={` gap-6 rounded-full px-2 flex bg-gray-300
justify-between after:absolute  after:h-full after:w-[50%]
after:rounded-full after:bg-black after:z-10 after:duration-100 after:transition-all after:content-['']
cursor-pointer ${!urlImg?"after:left-0": "after:left-[59px]"} mb-5`}>
<div className={`p-2 z-20  ${urlImg?"text-black": "text-white"}`}>
رفع
</div>
<div className={`p-2  z-50 ${!urlImg?"text-black": "text-white"}`}>
رابط
</div>
</div>
</div>
{
!urlImg && <div>
<div className="text-lg text-right">
اختيار ملف
</div>
<input type="file" accept="image/png, image/jpg, image/jpeg" name="image_file" className="input" placeholder="رابط الصوره" />
</div>
}
{
urlImg && <div>
<div className="text-lg text-right">
رابط الصوره
</div>
<input type="url" value={data.img}
onChange={e=>setData({ ...data,
img: e.target.value })}
name="img_url" className="input" placeholder="رابط الصوره" />
</div>
} < div dir = "rtl" className = "relative z-0 w-full mt-10 mb-5 group " >
</div>
<div dir="rtl" className="relative z-0 w-full mb-5 group ">
<div className="text-lg text-right">
المساعده
</div>
<textarea dir="auto" name="suggest"
className="input" value={data.suggest}
onChange={e=>setData({ ...data,
suggest: e.target.value })}
placeholder="   المساعده"></textarea>
</div>
</div>
<div className=" text-xl flex justify-center mt-4 gap-8">
<button type="submit" className="bg-blue-600 rounded text-white px-4 py-2 duration-300
hover:bg-transparent  border-blue-600 border-4 hover:text-blue-600">
تعديل
</button>
</div>
</form>
</div>
</div>
}    </>
)
}