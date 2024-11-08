import { useState } from "react";
import logo from "../../assets/logo.svg";
import send from "../../assets/send.svg"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Popup() {

  const [topic,setTopic] = useState()
  const [subject,setSubject] = useState()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3000/api/course/create", {"topic":topic,"subject":subject})
    navigate(`/course?id=${response.data.id}`)
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-neutral-100 p-6 pt-5">
      <h1 className="font-sans text-2xl font-semibold mb-8">Create Course</h1>

      <div className="bg-white flex flex-col items-center justify-center w-[45%] h-[45%] rounded-2xl p-6">
        <div className="flex items-center justify-center w-full mb-4">
          <img className="h-10 w-auto" src={logo} alt="Logo" />
          <h1 className="text-[2rem] ml-2">Flearn</h1>
        </div>
        <div>
            <label className="text-[1.2rem]"> Course Topic: </label>
            <textarea
            className="bg-[#d4d4d4] rounded-xl w-full mt-4 p-4"
            name=""
            id=""
            cols="60"
            rows="1"
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter course details..."
            ></textarea>
        </div>

        <div>
            <label className="text-[1.2rem]"> Course Subject: </label>
            <textarea
            className="bg-[#d4d4d4] rounded-xl w-full mt-4 p-4"
            name=""
            id=""
            cols="60"
            rows="1"
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter course details..."
            ></textarea>
        </div>

        <button onClick={handleSubmit} className="mt-6 flex justify-between space-x-2 bg-black text-white py-2 px-6 rounded-3xl">
          Strat Creating
          <img className="pl-2" src={send} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Popup;