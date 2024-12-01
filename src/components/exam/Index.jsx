import {
  useEffect,
  useState,
  useRef
} from "react"
import {
  Questions
} from "../../data/Questions"
import {
  DeleteQuestion
} from "../../data/DeleteQuestion"
import {
  useSearchParams,
  Link,
  useParams
} from "react-router-dom"
import {
  Loader
} from "../index.js"
import Swal from "sweetalert2"
import {
  MdDeleteForever
} from "react-icons/md";
import {
  FaRegEdit
} from "react-icons/fa";
import {
  ErrorMessage
} from "../ErrorMessage.js"
import {
  IoMdAdd
} from "react-icons/io";
import AddForm from "./AddForm"
export default function ExamsData() {
  const select = useRef()
  const next = useRef()
  const last = useRef()
  const {
    id
  } = useParams()
  const [data,
    setData] = useState(null)
  const [loader,
    setLoader] = useState(true)
  const [page,
    setPage] = useSearchParams()
  const [showForm,
    setShowForm] = useState(false)

  useEffect(()=> {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth"
    })
    Questions(page, id).then(e => {
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

  const selectOptions = []


  useEffect(()=> {
    if (data && data.total) {
      select.current.innerHTML = ``
      for (let i = 1; i < Math.ceil(data.total/15) +1; i++) {
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

    } else if (e.target.name == "next" && page.get("page") < Math.ceil(data.total/15)) {

      setPage({
        page: page.get("page") ?parseInt(page.get("page")) +1: 2
      })
      setLoader(true)

    }
  }

  const HandleDeleteQuestion = (button, id)=> {

    Swal.fire({
      icon: "warning",
      title: "هل تريد الحذف ؟",
      text: "سوف يتم حذف هذا السؤال مع جميع بياناته",
      showCancelButton: true,
      confirmButtonText: "حذف",
      denyButtonText: `الغاء`
    }).then((result) => {
      if (result.isConfirmed) {
        setLoader(true)
        DeleteQuestion(id).then(e => {
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




  return (
    <>
      <button onClick={_=>setShowForm(e=>!e)} className="  mb-4 px-2.5 py-1.5 border-[3px] border-blue-600 text-white rounded text-3xl flex
        bg-blue-600 hover:bg-white hover:text-blue-600 duration-300 ">
        <IoMdAdd />
      </button>
      {
      showForm && <AddForm id={id} setShowForm={setShowForm} setLoader={setLoader} />

      }
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
                <th scope="col" className="px-6 py-3  min-w-44 ">
                  السؤال
                </th>
                <th scope="col" className="px-6 py-3">
                  نوعه
                </th>
                <th scope="col" className="px-6 py-3">
                  تعديل
                </th>
                <th scope="col" className="px-6 py-3">
                  حذف
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.questions.length !== 0 && data.questions.map((item, index) => {
                return(
                  <tr key={index} className="  even:bg-[#f8f6ff] border-gray-700">
                    <th scope="row" className="px-6 py-4 ">
                      {
                      item.title
                      }
                    </th>
                    <td className="px-6 py-4">
                      {item.type}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/question/${item.id}/edit`}
                        className="rounded inline-block text-yellow-400 text-white
                        text-3xl"><FaRegEdit /></Link>
                    </td>

                    <td className="px-6 py-4">
                      <button onClick={e=> HandleDeleteQuestion(e, item.id)}
                        className="rounded text-red-500 text-3xl">
                        <MdDeleteForever />
                      </button>
                    </td>


                  </tr>

                )
              })}
            </tbody>
          </table>
          {data && data.questions.length === 0 && <div className="w-full text-center
            my-10 text-lg font-medium">
            لم تقم باضافه اى اسئله حتى الان
          </div>

          }
        </div>
        {
        data && data.total !== 0 && <div dir="ltr" className="p-3 flex
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
              /15)}</strong>
          </p>
        </div>
        }


      </div>
    </>
  )
}