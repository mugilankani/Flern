import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Edit3 } from 'lucide-react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const ContentEditor = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);
  const [content,setContent] =  useState()
  const {courseId,moduleId,pathId} = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const topic = searchParams.get("topic")
  const subject = searchParams.get("subject")

  useEffect(() => {
    // Split content into logical sections while preserving markdown structure
    const parseContent = (content) => {
      // Split by double newline to separate paragraphs
      const rawSections = content.split(/\n\n+/);
      
      return rawSections.map(section => {
        // Preserve internal single newlines for lists
        return section.trim();
      }).filter(Boolean); // Remove empty sections
    };

    const fetchContent = async () => {
      const topicContent = await axios.post("http://localhost:3000/api/course/create-topic", {"topic":topic,"subject": subject })
      console.log(topicContent)
      const initialContent = parseContent(topicContent.data);
      setSections(initialContent);
    }

    fetchContent()
  }, []);

  const handleSectionClick = (index, event) => {
    const rect = event.target.getBoundingClientRect();
    setSelectedSection(index);
    setPopupPosition({
      x: Math.max(10, rect.left),
      y: Math.max(10, rect.top - (popupRef.current?.offsetHeight || 0) - 10)
    });
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || selectedSection === null) return;

    try {
      // Simulated API call
      const text = sections[selectedSection]
      const modifiedText = await axios.post("http://localhost:3000/api/course/edit",{text, prompt})
      const newSections = [...sections];
      newSections[selectedSection] = modifiedText.data;
      setSections(newSections);
      console.log(newSections[selectedSection])
      // await axios.put("http://localhost:3000/api/course/update",{content: newSections})
      setPrompt('');
      setSelectedSection(null);
    } catch (error) {
      console.error('Error modifying text:', error);
    }
  };

  const closePopup = () => {
    setSelectedSection(null);
    setPrompt('');
  };

  const isHeader = (text) => /^#{1,6}\s/.test(text);

  // Function to determine if text is a list
  const isList = (text) => /^[\*\-]\s/.test(text);

  const getSectionClasses = (text, isSelected) => {
    const baseClasses = "cursor-pointer transition-colors rounded-lg";
    const selectedClasses = isSelected ? "bg-blue-50 border-2 border-blue-200" : "hover:bg-gray-50";
    
    if (isHeader(text)) {
      const headerLevel = text.match(/^#{1,6}/)[0].length;
      const fontSize = {
        1: 'text-3xl font-bold',
        2: 'text-2xl font-bold',
        3: 'text-xl font-bold',
        4: 'text-lg font-bold',
        5: 'text-base font-bold',
        6: 'text-sm font-bold',
      }[headerLevel] || 'text-base';
      return `${baseClasses} ${selectedClasses} ${fontSize} py-2`;
    }
    
    if (isList(text)) {
      return `${baseClasses} ${selectedClasses} py-1 pl-6`;
    }
    
    return `${baseClasses} ${selectedClasses} p-3`;
  };

  const renderContent = (text) => {

    const content = typeof text === 'string' ? text : '';

    if (isHeader(content)) {
      return text.replace(/^#{1,6}\s/, '');
    }
    
    if (isList(content)) {
      return text.split('\n').map((item, i) => (
        <div key={i} className="flex items-start">
          <span className="mr-2">•</span>
          <span>{item.replace(/^[\*\-]\s/, '')}</span>
        </div>
      ));
    }
    
    return content.split(/(\*\*.*?\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="relative min-h-screen overflow-y-auto w-full bg-white p-6 pt-5 max-w-4xl mx-auto">
      {selectedSection !== null && (
        <div
          ref={popupRef}
          className="fixed z-50 w-96 bg-white rounded-lg shadow-lg border border-gray-200"
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`
          }}
        >
          <form onSubmit={handlePromptSubmit} className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Modify Text</h3>
              <button
                type="button"
                onClick={closePopup}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full min-h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your prompt here..."
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={closePopup}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {sections.map((section, index) => (
          <div
            key={index}
            onClick={(e) => handleSectionClick(index, e)}
            className={getSectionClasses(section, selectedSection === index)}
          >
            {renderContent(section)}
          </div>
        ))}
      </div>
      {/* <Edit3 onClick={} className='absolute top-10 right-5 cursor-pointer size-8 rounded-full'/> */}
    </div>
  );
};

export default ContentEditor;