import {
  useEffect,
  useState,
  useRef,
  useCallback
} from "react"
import {
  User_results
} from "../../data/User_results"
import {
  useSearchParams,
  Link,
  useParams
} from "react-router-dom"
import {
  Loader
} from "../index.js"
import {
  BiLinkExternal
} from "react-icons/bi";
import {
  IoMdSearch
} from "react-icons/io";

import Swal from "sweetalert2"
import {
  FaList
} from "react-icons/fa6";
export default function Index() {
  const select = useRef()
  const next = useRef()
  const last = useRef()
  const [data,
    setData] = useState(null)
  const [loader,
    setLoader] = useState(true)
  const [searchParams,
    setSearchParams] = useSearchParams()
  const Input = useRef()
  const {
    id
  } = useParams()
  useEffect(()=> {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    User_results(searchParams, id).then(e => {
      e != null?setData(e): ""
      setLoader(false)
    }
    )
  }, [searchParams])

  const HandleChangePage = (id)=> {
    setSearchParams({
      page: id,
      order_by: searchParams.get("order_by")?searchParams.get("order_by"): "id",
      order_method:
      searchParams.get("order_method")?searchParams.get("order_method"): "DESC",
      q: searchParams.get("q")?searchParams.get("q"): ""


    })
  }


  const handlePagination = useCallback(() => {
    if (data && data.total) {
      let selectOptions = "";
      for (let i = 1; i <= Math.ceil(data.total / 15); i++) {
        selectOptions += `<option value="${i}" ${searchParams.get('page') === String(i) ? 'selected': ''}>${i}</option>`;
      }
      select.current.innerHTML = selectOptions;
    }
  },
    [data]);

  useEffect(() => {
    handlePagination();
  },
    [data]);
  const HandleShowDetails = (data)=> {
    console.log(data)
    Swal.fire({
      html: `
      <div class="w-full text-right text-xl relative min-h-[200px]" >
      <div class="md:hidden">
      <span>الاسئلة المسلمة </span> :
      <span class="font-medium text-black"> ${data.correct_answers}</span>
      </div>
      <div>
      <div class="md:hidden">
      <span>الدرجات</span> :
      <span class="font-medium text-black"> ${data.exam_marks} </span>
      </div>
      <div class="md:hidden">
      <span> النسبة </span> :
      <span class="font-medium text-black">      %${(data.exam_marks/data.marks
        * 100).toFixed(1)}</span>
      </div>
      <div class="md:hidden">
      <span> حالة الامتحان</span> :
      <span class="font-medium text-black">         ${data.Corrected === 1?"تم التصحيح": "غير مصحح"}</span>
      </div>
      <div class="md:hidden">
      <span class="font-medium">
      <span>حالة الامتحان </span>:
      <span class=" px-2 mt-3 ">
      <a class="text-black underline" href="${data.id}/${id}">عرض
      النتيجة</a>

      </span>

      </div>
      <div>
      <span class="font-medium">
      رقم هاتف الطالب :
      <span class="text-black ">${data.phone}</span>
      </span>
      </div>
      <div>
      <span class="font-medium">
      رقم هاتف ولى الامر:
      <span class="text-black">${data.parent_phone}</span>
      </span>
      </div>
      `
    });
  }


  const HandleButtons = e=> {

    if (e.target.name == "last" && searchParams.get("page") != null && searchParams.get("page") > 1) {
      setSearchParams({
        order_by: searchParams.get("order_by")?searchParams.get("order_by"): "id",
        order_method:
        searchParams.get("order_method")?searchParams.get("order_method"): "DESC",
        page: searchParams.get("page") -1,
        q: searchParams.get("q")?searchParams.get("q"): ""

      })
      setLoader(true)

    } else if (e.target.name == "next" && searchParams.get("page") < Math.ceil(data.total/15)) {
      setSearchParams({
        page: searchParams.get("page") ?parseInt(searchParams.get("page")) +1:
        2,
        order_by: searchParams.get("order_by")?searchParams.get("order_by"): "id",
        order_method:
        searchParams.get("order_method")?searchParams.get("order_method"): "DESC",
        q: searchParams.get("q")?searchParams.get("q"): ""
      })
      setLoader(true)

    }
  }


  const HandleChangeSorting = select=> {
    setLoader(true)
    switch (select.target.value) {
    case "oldest":
      setSearchParams({
        order_by: 'id',
        order_method: "ASC",
        q: searchParams.get("q")?searchParams.get("q"): ""
      })
      break;
    case "latest":
      setSearchParams({
        order_by: 'id',
        order_method: "DESC",
        q: searchParams.get("q")?searchParams.get("q"): ""

      })

      break;
    case "highest":
      setSearchParams({
        order_by: 'exam_marks',
        order_method: "DESC",
        q: searchParams.get("q")?searchParams.get("q"): ""

      })
      break;
    case "least":
      setSearchParams({
        order_by: 'exam_marks',
        order_method: "ASC",
        q: searchParams.get("q")?searchParams.get("q"): ""

      })
      break;
    default:
      break;
    }
  }


  const HandleSearch = (e) => {
    e.preventDefault()
    setSearchParams({
      page: searchParams.get("page") ?searchParams.get("page"): 1,
      order_by: searchParams.get("order_by")?searchParams.get("order_by"): "id",
      order_method: searchParams.get("order_method")?searchParams.get("order_method"): "DESC",
      q: Input.current.value
    })


  }

  return (
    <div className=" mb-10">
      <div className="">
        <div>

        </div>
      </div>

      <div dir="rtl" className="mb-5">
        <form onSubmit={e=>HandleSearch(e)}>

          <div className="flex relative items-center">
            <IoMdSearch className="absolute text-3xl bottom-3 scale-x-[-1]" />
            <input ref={Input} className="input pr-9" placeholder="بحث" />
          <button type="submit" className="mr-10 bg-blue-500 text-white text-xl px-10 rounded
            py-2 border-4 border-blue-500 hover:text-blue-500 duration-300 hover:bg-transparent"> بحث</button>
        </div>
      </form>

    </div>

    <div className="bg-white rounded shadow-md">

      {loader && <div className="w-full z-50 h-screen bg-black/30 fixed top-0 right-0">
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      </div>
      }

      <div dir="rtl" className="relative  overflow-x-auto divide-x">
        <table className="w-full table-auto text-sm lg:text-lg  text-center
          text-black
          ">
          <thead className="text-lg  uppercase bg-[#6c7ae0] text-white">
            <tr>
              <th scope="col" className="px-6 py-3  min-w-44 ">
                اسم المستخدم
              </th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">
                الاسئله المسلمه
              </th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">
                الدرجه
              </th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">
                النسبه
              </th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">
                الحاله
              </th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">
                عرض الامتحان
              </th>
              <th scope="col" className="px-6 py-3 ">
                معلومات
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.data.length !== 0 && data.data.map((item, index) => {
              return(
                <tr key={index} className="  even:bg-[#f8f6ff] border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                    {item.name}
                  </th>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {item.correct_answers}

                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {item.exam_marks}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {(item.exam_marks/item.marks * 100).toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {item.Corrected === 1?"تم التصحيح": "غير مصحح"}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <Link to={`${item.id}`} className="rounded text-blue-600
                      text-4xl flex justify-center"><BiLinkExternal /></Link>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={_=>HandleShowDetails(item)} className="text-3xl text-blue-600"><FaList /></button>
                  </td>
                </tr>

              )
            })}
          </tbody>
        </table>

        {data && data.data.length === 0 && <div className="w-full text-center
          my-10 text-lg font-medium">
          لا يوجد نتائج
        </div>

        }
      </div>
      {
      data && data.total !== 0 && <div dir="ltr" className="p-3 flex
        justify-between items-center border-t-2">
        <div className="flex items-center gap-8">
          <button id="next" name="next" onClick={HandleButtons} className=" rounded-md
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
          <button id="last" name="last" onClick={HandleButtons} className="rounded-md
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

    <div dir="rtl" className="mt-5 flex items-center gap-2 text-xl">
      <span>ترتيب حسب</span>
      :<select onChange={e=>HandleChangeSorting(e)} defaultValue="latest" className="bg-gray-50 outline-[#6c7ae0]
        border-4 border-transparent shadow-lg
        text-gray-900 text-lg rounded-lg block w-min p-1.5 ">
        <option value="latest">الاحدث</option>
        <option value="oldest">الاقدم </option>
        <option value="highest">اعلى درجة</option>
        <option value="least">ادنى درجة</option>
      </select>
    </div>
  </div>
)
}