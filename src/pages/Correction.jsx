import {
  useEffect,
  useState
} from "react"
import {
  useParams,
  Link
} from "react-router-dom"
import {
  GetQuestion,
  IsertAnswer
} from "../data/CorrectionAnswers.jsx"
import {
  Loader
} from "../components/index.js"
import Swal from "sweetalert2"
export default function Correction() {

  const {
    id
  } = useParams()
  const [data,
    setData] = useState(false)
  const [loader,
    setLoader] = useState(true)
  useEffect(()=> {
    question()
  }, [id])

  const question = ()=> {

    GetQuestion(id).then(e => {
      if (e) {
        setData(e)

      }
      setLoader(false)
    })
  }

  const HandleCorrectAnswer = ()=> {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Swal.fire({
      title: "درجه السؤال ",
      html: `
      <div class="font-medium">لا يمكن تغيير الدرجة مجددا ؟</div>
      <div class="font-medium"> يمكن وضع ارقام عشرية</div>

      <input type="number" placeholder="الدرجة" id="swal-input1"
      class="swal2-input placeholder:text-right">
      `,
      focusConfirm: false,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "تاكيد الدرجه",
      preConfirm: () => {
        return document.getElementById("swal-input1").value;
      },
      cancelButtonText: "الغاء",
    }).then(e => {
      if (e.isConfirmed) {
        if (parseInt(e.value) >= 0 && parseInt(e.value) <= data.data.question_mark) {
    setLoader(true)
          IsertAnswer(data.data.id, parseInt(e.value)).then(e => {
            if (e == "success") {
              GetQuestion(id).then(e => {
                if (e) {
                  setData(e)

                }
                setLoader(false)
              })
            }
          })
        } else {
          Toast.fire({
            icon: "error",
            title: `لا يمكن ان تكون الدرجه اكبر من ${data.data.question_mark}
            او تكون اصغر من الصفر`

          });
        }
      }
    })

  }
  return (
    <div className="mt-20 px-4 lg:px-12 xl:px-20">
      {loader && <div className="w-full z-50 h-screen bg-black/30 fixed top-0 right-0">
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      </div>
      }

      {data && data.total === 0 && <div className="w-full h-[80vh]   grid
        place-content-center ">
        <div className="text-3xl font-medium ">
          لا يوجد اسئله غير مصححة
          <Link className="px-10 py-3 w-min bg-black border-4 border-black block text-white text-center
            text-xl mx-auto mt-16 rounded duration-300 hover:bg-transparent hover:text-black " to={"/"}>الرئيسيه</Link>
        </div>
      </div>

      }
      {data && data.total != 0 && <div className="mb-20">
        <div className="shadow-[0_0_4px_2px_rgba(0,0,0,0.1)] w-full
          max-w-[700px] mx-auto bg-white py-6 px-5">

          <div className="my-2 relative flex justify-between ">
            <span>باقى
              <span className="font-bold mx-1"> {data.total -1 }</span>
              سؤال</span>
            <span className="after:content-[''] after:block after:absolute
              after:w-0.5 after:h-full
              after:bg-black after:right-0 after:top-0  px-3 text-black/80
              text-sm flex items-center justify-end  ">   {data.data.name}</span>
          </div>
          <div className="text-lg md:text-xl mt-1 sm:mt-4 text-right">
            السؤال  : <span
              className="font-bold">{data.data.title }</span>
          </div>
          <div className="text-lg md:text-xl mt-3 sm:mt-6 text-right">
            درجات السؤال : <span
              className="font-bold">{data.data.question_mark }</span>
          </div>
          {data.data.img && <div>
            <img className="max-w-[600px] w-full mx-auto mt-3" src={data.data.img} alt="" />
        </div>
        }
        <div className="text-lg md:text-xl mt-1 sm:mt-4 text-right">
          : اجابه الطالب  <span
            className="font-bold block">{data.data.answer }</span>
        </div>
        <div className=" mt-5 sm:mt-10 text-center">
          <button onClick={HandleCorrectAnswer} className=" px-8 font-bold
            text-white  text-lg rounded
            md:text-xl py-4 bg-[#1A1A1A] border-4 duration-300 border-[#1A1A1A]
            hover:bg-transparent hover:text-black py-3"> تصحيح</button>
        </div>
      </div>
    </div>

    }
  </div>
)
}