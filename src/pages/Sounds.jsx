import {
  useEffect,
  useState,
  useRef
} from "react"
import {
  Loader
} from "../components/index.js"
import Axios from "axios"
import {
  MdDeleteForever
} from "react-icons/md";
import {
  FaPlay
} from "react-icons/fa";
import Swal from "sweetalert2"
import {
  IoMdAdd
} from "react-icons/io";

export default function Sounds() {
  const select = useRef()
  const next = useRef()
  const last = useRef()
  const [data,
    setData] = useState(null)
  const [showForm,
    setShowForm] = useState(false)
  const [loader,
    setLoader] = useState(true)
  useEffect(()=> {
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/sounds.php`).then(e => {
      if (e.status == 200) {
        setLoader(false)
        setData(e.data)

      } else {
        ErrorMessage(" حدث خطاء ما")
      }})
  },
    [])
  const HandleDeleteSound = (button, id)=> {

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
        Axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/deleteSound.php?sound_id=${id}`).then(e => {
          setLoader(false)
          if (e.status == 200) {
            Swal.fire({
              title: "تم الحذف بنجاح",
              icon: "success"
            });
            if (button.target.tagName == "svg") {
              button.target.parentNode.parentNode.parentNode.style.display = "none"
            } else {
              button.target.parentNode.parentNode.parentNode.parentNode.style.display = "none"
            }

          } else {
            Swal.fire({
              title: "لقد حدث خطاء  ",
              icon: "error"
            });

          }
        })
      }
    });

  }
  const HandlePlaySound = (url)=> {
    Swal.fire({
      title: "تشغيل الصوت",
      html: `
      <audio controls class="mx-auto " src="${url}"></audio>
      `,
      focusConfirm: false,
    });
  }
  return (

    <div className="mt-20 px-4 lg:px-12 xl:px-20">
      {showForm && <Form setShowForm={setShowForm} setLoader={setLoader} />
      }
      <div className="max-w-[700px] mx-auto">
        <button onClick={_=>setShowForm(!showForm)} className="  mb-4 px-2.5 py-1.5 border-[3px] border-blue-600 text-white rounded text-3xl flex
          bg-blue-600 hover:bg-white hover:text-blue-600 duration-300 ">
          <IoMdAdd />
        </button>
      </div>

      {loader && <div className="w-full z-50 h-screen bg-black/30 fixed top-0 right-0">
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      </div>
      }

      <div dir="rtl" className="relative overflow-x-auto divide-x">
        <table className="w-full mx-auto max-w-[700px] table-auto text-sm lg:text-lg  text-center
          text-black
          ">
          <thead className="text-lg  uppercase bg-[#6c7ae0] text-white">
            <tr>
              <th scope="col" className="px-6 py-3  w-10 ">
                المعرف
              </th>
              <th scope="col" className="px-6 py-3">
                النوع
              </th>
              <th scope="col" className="px-6 py-3">
                تشغيل
              </th>
              <th scope="col" className="px-6 py-3">
                حذف
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length !== 0 && data.map((item, index) => {
              return(
                <tr key={index} className="  even:bg-[#f8f6ff] bg-white border-gray-700">
                  <td className="px-6 py-4">
                    {item.id}
                  </td>
                  <td className="px-6 py-4">
                    {item.type == "positive"?"تشجيعى": "سلبى"}

                  </td>
                  <td className="px-6 py-4">
                    <button onClick={e=> HandlePlaySound(item.url)}
                      className="rounded text-blue-600 text-3xl">
                      <FaPlay />
                    </button>


                  </td>
                  <td className="px-6 py-4">
                    <button onClick={e=> HandleDeleteSound(e, item.id)}
                      className="rounded text-red-500 text-3xl">
                      <MdDeleteForever />
                    </button>


                  </td>
                </tr>

              )
            })}
          </tbody>
        </table>
        {data && data.length === 0 && <div className="w-full text-center
          my-10 text-lg font-medium">
          لم تقم باضافه اى صوت حتى الان
        </div>

        }
      </div>


    </div>
  )
}
  function Form( {
    setShowForm, setLoader
  }) {
    const [url, setUrl] = useState(true)
    const HandleSubmitForm = e=> {
      e.preventDefault()
      setLoader(true)
      Axios( {
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/admin/addSound.php`,
        data: e.target
      }).then(e => {
        if (e.status == 200) {
          window.location.reload()
        } else {
          Swal.fire({
            icon: "error",
            text: "حدث خطاء "
          })
        }
      })
    }
    return(
      <div className="fixed pb-10 overflow-auto z-20 w-full h-full left-0 top-0">
        <div className="w-screen flex justify-center overflow-scroll px-4 lg:px-12 xl:px-20">
          <form encType="multipart/form-data" onSubmit={HandleSubmitForm} method="POST" className="w-full mt-20 py-10 max-w-[600px] h-min bg-white shadow-[0_0_4px_rgba(0,0,0,0.15)]
            rounded">
            <h2 className="text-xl font-medium lg:text-2xl mb-5 text-center">اضافه
              صوت</h2>
            <div className=" px-4">
              <div dir="rtl" className="relative z-0 w-full mb-5 group ">
                <select dir="rtl" defaultValue="" name="type" className="select mb-4" required>
                  <option disabled value="">اختر  النوع</option>
                  <option value="positive"> تشجيعى</option>
                  <option value="negative"> سلبى</option>
                </select>
              </div>

              <div className="relative w-min mx-auto mt-10" onClick={_=>setUrl(!url)}>
                <div className={` gap-6 rounded-full px-2 flex bg-gray-300
                  justify-between after:absolute  after:h-full after:w-[50%]
                  after:rounded-full after:bg-black after:z-10 after:duration-100 after:transition-all after:content-['']
                  cursor-pointer ${!url?"after:left-0": "after:left-[59px]"} mb-5`}>
                  <div className={`p-2 z-20  ${url?"text-black": "text-white"}`}>
                    رفع
                  </div>
                  <div className={`p-2  z-50 ${!url?"text-black": "text-white"}`}>
                    رابط
                  </div>
                </div>
              </div>
              {!url && <div>

                <input type="file" required accept="audio/mp3, audio/m4a, audio/ogg,
                audio/wave" name="sound" className="input" />
            </div>
            }
            {url && <div>
              <input type="url" name="url" required className="input"
              placeholder="رابط" />
          </div>
          }



        </div>
        <div className=" text-xl flex justify-center mt-4 gap-8">
          <button onClick={_=>setShowForm(false)} className=" bg-red-500 rounded border-red-500 border-4
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