import {
  useEffect,
  useState,
  useRef
} from "react"
import Axios from "axios"
import {
  AllResults
} from "../../data/AllResults"
import {
  DeleteExam
} from "../../data/DeleteExam"
import Swal from "sweetalert2"
import {
  useSearchParams,
  Link
} from "react-router-dom"
import {
  Loader
} from "../index.js"
import {
  MdDeleteForever
} from "react-icons/md";
import {
  FaRegEdit
} from "react-icons/fa";
import {
  RxEnter
} from "react-icons/rx";
import {
  IoMdAdd
} from "react-icons/io";
import {
  RiEditFill
} from "react-icons/ri";
import {
  BiLinkExternal
} from "react-icons/bi";
import AddForm from "./AddForm.jsx"
import {
  ErrorMessage
} from "../ErrorMessage.js"
import {
  CgMoreO
} from "react-icons/cg";
export default function Home() {
  const select = useRef()
  const next = useRef()
  const last = useRef()
  const [data,
    setData] = useState(null)
  const [loader,
    setLoader] = useState(true)
  const [page,
    setPage] = useSearchParams()
  const [showForm,
    setShowForm] = useState(false)
  const [exams,
    setExams] = useState([])
  const [openExamData,
    setOpenExamData] = useState("")
  useEffect(()=> {
    AllResults(page).then(e => {
      e != null?setData(e): ""
      setLoader(false)
    }
    )
  }, [page])

  const HandleChangePage = (id)=> {
    setPage({
      page: id
    })
  }
  
 useEffect(()=> {
    try {
      Axios(`${import.meta.env.VITE_BACKEND_URL}/admin/all_exams_for_select.php`).then(e =>
        {
          e.status == 200? setExams(e.data): ErrorMessage("لقد حدث خطأ")
        })
    }catch(e) {
      ErrorMessage("لقد حدث خطأ")
    }
  }, [])
 
  const selectOptions = []


  useEffect(()=> {
    if (data && data.total) {
      select.current.innerHTML = ``
      for (let i = 1; i < Math.ceil(data.total/10) +1; i++) {
        select.current.innerHTML += `<option  ${ page.get("page") &&
        page.get("page") == i?"selected": ""} value="${i}">${i}</option>`
      }
    }

  },
    [data])

  const HandleButtons = e=> {
    if (e.target.name == "last" && page.get("page") != null && page.get("page") > 1) {
      setPage({
        page: page.get("page") -1
      })
      setLoader(true)

    } else if (e.target.name == "next" && page.get("page") < Math.ceil(data.total/10)) {

      setPage({
        page: page.get("page") ?parseInt(page.get("page")) +1: 2
      })
      setLoader(true)

    }
  }

  const HandleDeleteExam = (button, id)=> {
    Swal.fire({
      icon: "warning",
      title: "هل تريد الحذف ؟",
      text: "سوف يتم حذف هذا الامتحان مع جميع الاسئله الخاصه به مع جميع نتائج  الطلاب",
      showCancelButton: true,
      confirmButtonText: "حذف",
      denyButtonText: `الغاء`
    }).then((result) => {
      if (result.isConfirmed) {
        setLoader(true)
        DeleteExam(id).then(e => {
          setLoader(false)
          if (e === true) {
            Swal.fire({
              title: "تم الحذف بنجاح",
              icon: "success"
            });
            if (button.target.tagName == "svg") {

              button.target.parentNode.parentNode.parentNode.style.display = "none"
            } else {
              button.target.parentNode.parentNode.parentNode.parentNode.style.display = "none"

            }
          }
        })
      }
    });
  }


  const HandleEditExam = ({
    id, title, count_of_suggestions
  })=> {

    (async () => {

      const {
        value: formValues
      } = await Swal.fire({
          title: "تعديل امتحان",
          html: `
          <form method="POST" id="swal-form">
          <input type="hidden" name="exam_id" value='${id}'/>
          <input dir="rtl" placeholder="العنوان" value='${title}'' name="title" class="swal2-input">
          <input dir="rtl" value='${count_of_suggestions}'' placeholder="عدد المساعدات"
          name="count_of_suggestions"  class="swal2-input">
          <input dir="rtl" placeholder="الوصف" name="description" class="swal2-input">
          <select dir="rtl" name="relation" class="swal2-select border rounded
          inline-block w-[293px]" >
          <option value="" disabled="" selected> ربط بامتحان اخر</option>
          ${exams.map(e => `<option
            value=${e.id}>${e.title}</option>`)}
          </select>
          </form>
          `,
          showCancelButton: true,
          confirmButtonText: "تعديل",
          cancelButtonText: "الغاء",
          focusConfirm: false,
          preConfirm: () => {
            return {
              form: document.getElementById("swal-form"),
            };

          }
        });
      if (formValues) {
        setLoader(true)
        const data = new FormData(formValues.form)
        console.log(data)
        try {
          Axios( {
            method: "post",
            url: `${import.meta.env.VITE_BACKEND_URL}/admin/update_exam.php`,
            data: formValues.form
          }).then(e => {
            e.status == 200? window.location.reload(): ErrorMessage("لقد حدث خطأ");
          })

        }catch(e) {
          ErrorMessage("لقد حدث خطأ")
        }
      }
    })()
  }





  const HandleShowDetails = data=> {

    setOpenExamData(data)
  }


  return (
    <>
      <button onClick={_=>setShowForm(e=>!e)} className="  mb-4 px-2.5 py-1.5 border-[3px] border-blue-600 text-white rounded text-3xl flex
        bg-blue-600 hover:bg-white hover:text-blue-600 duration-300 ">
        <IoMdAdd />
      </button>
      {
      showForm && <AddForm setShowForm={setShowForm} setLoader={setLoader} />

      }
      {data && openExamData && <ExamData setOpenExamData={setOpenExamData}
        data={openExamData} HandleEditExam={HandleEditExam} HandleDeleteExam={HandleDeleteExam} />}
      <div className=" bg-white
        rounded shadow-md mb-10">
        {loader && <div className="w-full z-50 h-screen bg-black/30 fixed top-0 right-0">
          <div className="h-full flex items-center justify-center">
            <Loader />
          </div>
        </div>
        }
        <div dir="rtl" className="relative overflow-x-auto divide-x">
          <table className="w-full table-auto text-sm lg:text-lg  text-center
            text-black
            ">
            <thead className="text-lg  uppercase bg-[#6c7ae0] text-white">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  الامتحان
                </th>
                <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                  الكورس
                </th>
                <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                  عدد الاسئله
                </th>
                <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                  دخول
                </th>
                <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                  النتائج
                </th>
                <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                  تصحيح
                </th>
                <th scope="col" className="px-6 py-3 hidden sm:table-cell ">
                  تعديل
                </th>
                <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                  حذف
                </th>
                <th className="px-6 py-3 sm:hidden ">
                  معلومات
                </th>

              </tr>
            </thead>
            <tbody>
              {data && data.exams.length !== 0 && data.exams.map((item, index) => {
                return(
                  <tr key={index} className="  even:bg-[#f8f6ff] border-gray-700">
                    <td className="px-6 py-4 ">
                      {item.exam_title}
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      {item.questions_count}
                    </td>
                    <td className="px-6 py-3 hidden sm:table-cell">
                      <Link to={`/exam/${item.id}`} className="rounded text-blue-500 text-3xl flex justify-center"><RxEnter
                        /></Link>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <Link to={`/results/${item.id}`} className="rounded text-gary-500
                        text-3xl flex justify-center"><BiLinkExternal /></Link>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <Link to={`/exam/${item.id}/correction`} className="rounded text-green-500 text-3xl flex
                        justify-center"><RiEditFill /></Link>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <button
                        onClick={e=>HandleEditExam( { id: item.id,
                          questions_count: item.questions_count, title:
                          item.exam_title,
                          count_of_suggestions: item.count_of_suggestions })}
                        className="rounded text-yellow-400 text-white
                        text-3xl"><FaRegEdit /></button>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <button onClick={e=>HandleDeleteExam(e, item.id)} className="rounded text-red-500 text-3xl"><MdDeleteForever /></button>
                    </td>
                    <td className="px-6 py-3 sm:hidden ">
                      <button onClick={_=>HandleShowDetails(item)} className="text-3xl text-blue-600"><CgMoreO /></button>
                    </td>

                  </tr>

                )
              })}
            </tbody>
          </table>
          {data && data.exams.length === 0 && <div className="w-full text-center
            my-10 text-lg font-medium">
            لم تقم باضافه اى اختبار
          </div>

          }
        </div>
        {
        data && data.total.length !== 0 && <div dir="ltr" className="p-3 flex
          justify-between items-center border-t-2">
          <div className="flex items-center gap-8">
            <button name="next" onClick={HandleButtons} className=" rounded-md
              border border-slate-300 p-2.5 text-center text-sm transition-all
              shadow-sm hover:shadow-lg text-slate-600 hover:text-white
              hover:bg-[#6c7ae0] hover:border-[#6c7ae0] focus:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0
                  1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1
                  1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1
                  1.06 0Z" clipRule="evenodd" />
              </svg>
            </button>
            <button name="last" onClick={HandleButtons} className="rounded-md
              border border-slate-300 p-2.5 text-center text-sm transition-all
              shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-[#6c7ae0] hover:border-[#6c7ae0]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5
                  7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1
                  1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1
                  0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"
                  />
              </svg>
            </button>


          </div>
          <p className="text-slate-600">
            صفحه <strong className="text-slate-800">
              <select ref={select} onChange={e=> HandleChangePage(e.target.value)} className="outline-0 mx-2">
              </select>
            </strong>
            من&nbsp;<strong className="text-slate-800">{Math.ceil(data.total
              /10)}</strong>
          </p>
        </div>
        }


      </div>
    </>
  )
}


  function ExamData( {
    data,
    HandleEditExam,
    HandleDeleteExam,
    setOpenExamData
  }) {
    return(
      <div className="w-full fixed z-50 px-2 text-right text-2xl left-0 top-0
        bg-black/10 h-full grid place-items-center">
        <div className="w-full max-w-[500px] flex flex-col gap-3 mx-auto bg-white rounded p-10">

          <div>
            <span>الكورس</span> :
            <span className="font-medium text-black"> {data.title}</span>
          </div>
          <div>
            <span> عدد الاسئلة</span> :
            <span className="font-medium text-black"> {data.questions_count}</span>
          </div>
          <div>
            <span>دخول اﻻمتحان</span> :
            <span className="font-medium text-black">
              <Link to={`/exam/${data.id}`} className="pr-2 underline">دخول</Link>
            </span>
          </div>
          <div>
            <span>النتائج </span>:
            <span className="font-medium text-black">
              <Link to={`/results/${data.id}`} className=" pr-2
                underline">الذهاب</Link>
            </span>
          </div>
          <div>
            <span>تصحيح الامتحان</span> :
            <span className="font-medium text-black">
              <Link to={`/exam/${data.id}/correction`} className=" pr-2
                underline">الذهاب</Link>
            </span>
          </div>
          <div>
            <button className="font-medium text-black underline"
              onClick={e=> {
                HandleEditExam( { id: data.id,
                  questions_count: data.questions_count, title:
                  data.exam_title,
                  count_of_suggestions: data.count_of_suggestions })
                setOpenExamData("")
              }

              }> تعديل</button>
            :<span> تعديل الامتحان </span>
          </div>
          <div>
            <button className="font-medium text-black underline"
              onClick={e=> {
                HandleDeleteExam(e, data.id)
                setOpenExamData("")
              }}>حذف</button> :
            <span>   حذف</span>
          </div>
          <div>
            <button className="w-min bg-blue-400 text-white px-5 py-1
              hover:bg-white hover:text-blue-400 duration-300 border-4
              border-blue-400 rounded
              mx-auto block mt-4" onClick={_=>setOpenExamData("")}>اغلاق</button>
          </div>
        </div>
      </div>
    )
  }