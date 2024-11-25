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
  InsertQuestion
} from "../../data/InsertQuestion.jsx"


export default function AddForm( {
  id, setShowForm, setLoader
}) {
  const [urlImg,
    setUrlImg] = useState(true)
  const [isText,
    setIsText] = useState(false)

  const HandleSubmitForm = (e)=> {
    e.preventDefault()
    setLoader(true)
    InsertQuestion(e.target).then(e => {
      setLoader(false)})
  }

  return (
    <div className="fixed pb-10 overflow-auto z-20 w-full h-full left-0 top-0">
      <div className="w-screen flex justify-center overflow-scroll px-4 lg:px-12 xl:px-20">
        <form encType="multipart/form-data" onSubmit={HandleSubmitForm} method="POST" className="w-full mt-20 py-10 max-w-[600px] h-min bg-white shadow-[0_0_4px_rgba(0,0,0,0.15)]
          rounded">
          <input value={id} name="exam_id" type="hidden" />
        <h2 className="text-xl font-medium lg:text-2xl mb-5 text-center">اضافه
          سؤال</h2>
        <div className=" px-4">
          <div dir="rtl" className="relative z-0 w-full mb-5 group ">
            <input dir="auto" type="text" name="title" id="title"
            className="input " placeholder="السؤال " required />
        </div>
        <div className="flex gap-5">
          <div dir="rtl" className="relative z-0 w-full mb-5 group ">
            <input dir="auto" type="number" name="question_mark" id="question_mark"
            className="input " placeholder="الدرجات" required />
        </div>
        <div dir="rtl" className="relative z-0 w-full mb-5 group ">
          <input dir="auto" type="number" name="expirt_time" id="expirt_time"
          className="input " placeholder="   الوقت بالدقائق" required />
      </div>

    </div>




    <div className="relative w-min mx-auto mb-3" onClick={_=>setIsText(!isText)}>
      <div className={` gap-6 rounded-full px-3 flex bg-gray-300
        justify-between after:absolute  after:h-full after:w-[50%]
        after:rounded-full after:bg-black after:z-10 after:duration-100 after:transition-all after:content-['']
        cursor-pointer ${isText?"after:left-0": "after:left-[67px]"} `}>
        <div className={`p-2 z-50 ${!isText?"text-black": "text-white"}`}>
          مقالى
        </div>
        <div className={`p-2 z-20 ${isText?"text-black": "text-white"}`}>
          اختر
        </div>
      </div>
    </div>
    {!isText && <div>
      <input type="hidden" value="choose" name="type" />
    <input dir="auto" name="a" className="input mb-3" placeholder="a" required />
  <input dir="auto" name="b" className="input mb-3" placeholder="b" required />
  <input dir="auto" name="c" className="input mb-3" placeholder="c" required />
<input dir="auto" name="d" className="input mb-3" placeholder="d" required />
<select dir="rtl" defaultValue="" name="choose_answer" className="select mb-4" required>
<option disabled value="">اختر الاجابه الصحيحه</option>
<option value="a"> a</option>
<option value="b"> b</option>
<option value="c"> c</option>
<option value="d"> d</option>
</select>

<textarea dir="auto" name="answer_details"
className="input" required
placeholder=" وصف الاجابه الصحيحه"></textarea>

</div>
}
{isText && <div>
<input type="hidden" value="text" name="type" />
<textarea dir="auto" name="text_answer"
className="input mb-4" required
placeholder="   الاجابه الصحيحه"></textarea>

</div>
}




<div className="relative w-min mx-auto mt-10" onClick={_=>setUrlImg(!urlImg)}>
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
{!urlImg && <div>

<input type="file" accept="image/png, image/jpg, image/jpeg" name="image_file" className="input" placeholder="رابط الصوره" />
</div>
}
{urlImg && <div>
<input type="url" name="img_url" className="input" placeholder="رابط الصوره" />
</div>
}




<div dir="rtl" className="relative z-0 w-full mt-10 mb-5 group ">
</div>
<div dir="rtl" className="relative z-0 w-full mb-5 group ">
<textarea dir="auto" name="suggest"
className="input"
placeholder="   المساعده"></textarea>
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