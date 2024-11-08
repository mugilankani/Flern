import { useState } from "react";
import logo from "../../assets/logo.svg";
import send from "../../assets/send.svg";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Popup({ onClose }) {  // Accept onClose prop

  const [topic, setTopic] = useState();
  const [subject, setSubject] = useState();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3000/api/course/create", { "topic": topic, "subject": subject });
    navigate(`/course?id=${response.data.id}`);
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center w-full h-[15%] rounded-2xl p-6">
      <button onClick={onClose} className="self-end"> Close </button> {/* Close button */}
      <div>
        <label className="text-[1.2rem]"> Course Topic: </label>
        <textarea
          className="bg-[#d4d4d4] rounded-xl w-full mt-4 p-4"
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter course details..."
        ></textarea>
      </div>
      <div>
        <label className="text-[1.2rem]"> Course Subject: </label>
        <textarea
          className="bg-[#d4d4d4] rounded-xl w-full mt-4 p-4"
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter course details..."
        ></textarea>
      </div>
      <button onClick={handleSubmit} className="mt-6 flex justify-between space-x-2 bg-black text-white py-2 px-6 rounded-3xl">
        Start Creating
        <img className="pl-2" src={send} alt="" />
      </button>
    </div>
  );
}

export default Popup;
