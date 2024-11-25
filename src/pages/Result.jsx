import {
  useParams,
  useNavigate
} from "react-router-dom"
import {
  UserResult
} from "../data/UserResult"
import {
  useState,
  useEffect
} from "react"
import {
  Loader
} from "../components/index.js"
import {
  FaRegCircleQuestion
} from "react-icons/fa6"
import {
  VscError
} from "react-icons/vsc";
export default function Result() {

  const navigate = useNavigate()
  const [data,
    setData] = useState(null)
  const [loader,
    setLoader] = useState(true)
  const {
    examid,
    userid
  } = useParams()
  console.log()
  useEffect(()=> {
    UserResult(examid, userid, navigate, setLoader).then(e => {
      setData(e);

    }
    )
  }, [examid, userid])
  return (
    <div className="mt-20  px-4 lg:px-12 xl:px-20">
      {loader && <div className="w-full z-50 h-screen bg-black/30 fixed top-0 right-0">
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      </div>
      }
      {data && data.data.questions && data.data.questions.map((question,
        index)=><div key={index}>
        <div dir="rtl" className={` rounded  my-3 border-4 font-medium
          ${question.is_success === 1?" border-green-400 bg-green-300 text-green-900":
          question.is_corrected? " border-red-400 bg-red-300  text-red-800":
          "bg-blue-300"}
          text-right p-3`}>
          <div className="flex justify-between mb-4 ">
            <div className="text-2xl w-max">
              {index +1} -
            </div>
            <div className=" text-lg">
              {question.marks}/{question.question_mark}
            </div>
          </div>
          <div className="flex text-justify items-center text-xl">
            <FaRegCircleQuestion className="
              text-gray-600 h-min ml-2  min-w-10 " /> {
            question.title
            }
          </div>
          <div className={`grid ${question.img?"md:grid-cols-2 gap-3": ""}`}>
            { question.type == "choose" && <div className="  flex flex-col justify-center">
              <div className="flex my-3 bg-green-400 rounded p-2 items-center
                text-xl">
                <span className="w-10"><SuccessIcon /></span>
                {question[question.choose_answer]}
              </div>
              {!question.is_success &&
              JSON.parse(question.details).student_answer !== null && <div
                className="flex  bg-red-400 rounded p-2 items-center
                text-xl my-3">
                <span className="w-10 text-3xl"><VscError /></span>
                {JSON.parse(question.details).student_answer !==
                "null"?question[JSON.parse(question.details).student_answer]: `لم
                يتم اختيار اجابه`}

              </div>
              }
            </div>
            }
            {
            question.type == "text" && <div className=" flex flex-col justify-center">
              {question.is_success === 1 && question.is_corrected && <div
                className="flex  bg-green-400 rounded p-2 items-center
                text-xl my-3">
                <span className="w-10 text-3xl ml-1"><SuccessIcon /></span>
                { JSON.parse(question.details).student_answer}
              </div>
              }
              { !question.is_corrected && <div>
                <div
                  className="flex rounded p-2 items-center
                  text-xl text-white my-3">
                  لم يتم تصحيح السؤال بعد
                </div>
              </div>
              }

              {question.is_success === 0 && question.is_corrected === 1 && <div>
                <div
                  className="flex  bg-green-400 rounded p-2 items-center
                  text-xl my-3">

                  <span className="w-10 text-3xl ml-1"><SuccessIcon /></span>
                  { question.TEXT}
                </div>
                { JSON.parse(question.details).student_answer !== null && <div
                  className="flex  bg-red-400 rounded p-2 items-center
                  text-xl my-3">
                  <span className="w-10 text-3xl"><VscError /></span>
                  {JSON.parse(question.details).student_answer !== "null"?JSON.parse(question.details).student_answer: `لم
                  يتم ارسال اجابه`}

                </div>
                }
              </div>
              }

            </div>
            }

            {
            question.img && <div className="w-full">
              <img src={question.img} loading="lazy" alt={index}
              className="rounded w-full max-w-[500px] mx-auto" />
          </div>
          }
        </div>
      </div>
      </div>

    )}
  </div>
)
}

function SuccessIcon() {
  return(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox="0 0 256 256"
      xmlSpace="preserve"
      width="30px"
      >
      <g
        style={ {
          stroke: "none",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "none",
          fillRule: "nonzero",
          opacity: 1
        }}
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
        <path
          d="M 43.077 63.077 c -0.046 0 -0.093 -0.001 -0.14 -0.002 c -1.375
          -0.039 -2.672 -0.642 -3.588 -1.666 L 23.195 43.332 c -1.84 -2.059 -1.663
          -5.22 0.396 -7.06 c 2.059 -1.841 5.22 -1.664 7.06 0.396 l 12.63 14.133 l
          38.184 -38.184 c 1.951 -1.952 5.119 -1.952 7.07 0 c 1.953 1.953 1.953
          5.119 0 7.071 L 46.612 61.612 C 45.674 62.552 44.401 63.077 43.077 63.077
          z"
          style={ {
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "rgb(0,165,16)",
            fillRule: "nonzero",
            opacity: 1
          }}
          transform=" matrix(1 0 0 1
          0 0) "
          strokeLinecap="round"

          />
        <path
          d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c
          2.762 0 5 2.239 5 5 s -2.238 5 -5 5 c -19.299 0 -35 15.701 -35 35 s 15.701
          35 35 35 s 35 -15.701 35 -35 c 0 -2.761 2.238 -5 5 -5 s 5 2.239 5 5 C 90
          69.813 69.813 90 45 90 z"
          style={ {
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "rgb(0,165,16)",
            fillRule: "nonzero",
            opacity: 1
          }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
          />
      </g>
    </svg>

  )
}