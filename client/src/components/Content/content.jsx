import React, { useState, useRef, useEffect } from 'react';

const ContentEditor = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);

  const content = `##  Why is the Indian Rupee Falling?  Understanding Currency Fluctuations\n\nHey there, friend! Welcome to our lesson on currency fluctuations, specific
ally focusing on why the Indian Rupee might be going down.  This is a super important topic, especially if you're interested in international finance, investing, or s
imply understanding how the global economy works. \n\n**Get ready to learn:**\n\n* How currency rates are determined.\n* The factors that influence the Indian Rupee's
 value.\n* Why understanding these fluctuations matters to you.\n\n**Let's dive in!** \n\n###  Why is the Indian Rupee Falling?\n\nThink about it this way: Imagine th
e Indian Rupee as a product being traded on a global marketplace. Its price fluctuates based on supply and demand, just like any other product. \n\n**Factors that inf
luence the Rupee's value:**\n\n* **Demand for Indian goods and services:**  When more people want to buy Indian products or services, the demand for Rupees increases,
 making it stronger. Imagine India exporting lots of software or spices - that drives up demand for Rupees.\n* **Investment in India:**  Foreign investors pouring mon
ey into Indian businesses or assets increases the demand for Rupees, boosting its value.\n* **Interest rates:** Higher interest rates in India attract foreign investm
ent, making the Rupee more attractive. This can make it stronger.\n* **Inflation:** High inflation in India weakens the purchasing power of the Rupee, leading to its 
depreciation.  \n* **Government policies:**  Policies like export incentives or restrictions on imports can impact the Rupee's value.\n* **Global economic conditions:
**  A strong US dollar, for example, can make the Rupee weaker, as investors might shift their funds to the stronger dollar.\n\n**Think of it like this:**  If you hav
e a popular product everyone wants, its price will go up!  The same applies to currencies. When the demand for Indian Rupees is high, its value increases. \n\n**Real-
world examples:**\n\n* **Increased demand for Indian software:**  The Indian tech industry's growth has increased demand for Rupees, making it stronger.\n* **Foreign 
investment in Indian infrastructure:**  Companies investing in Indian infrastructure projects are buying Rupees, contributing to its strength.\n* **High inflation in 
India:**  If prices for goods and services rise significantly in India, the Rupee weakens as its purchasing power decreases.\n\n\n###  Why Do Currency Rates Fluctuate
?\n\nImagine you have a local store selling fruits. The prices of these fruits change based on the season, availability, and demand. Similarly, currency rates change 
constantly due to a variety of factors:\n\n* **Economic conditions:**  Growth or recession in a country, inflation rates, interest rates, and government policies all 
impact currency value.\n* **Political stability:**  Political instability in a country can scare away investors, leading to currency depreciation.\n* **Global events:
**  Wars, natural disasters, and trade tensions can all impact currency rates.\n* **Speculation:**  Traders might buy or sell currencies based on their predictions, s
ometimes causing significant fluctuations.\n\n**Pro Tip:** Currency rates are constantly changing, even on a minute-by-minute basis.  Keep an eye on economic news and
 global events to understand the reasons behind these fluctuations.\n\n\n###  Why Does It Matter to You?\n\nUnderstanding currency fluctuations is crucial for several
 reasons:\n\n* **Travel:**  If you plan to travel abroad, a weaker Rupee means your money won't go as far.\n* **Investments:**  If you invest in foreign markets or co
mpanies, currency fluctuations can impact your returns.\n* **Exports and imports:**  Businesses exporting goods and services are affected by changes in currency rates
, as their profits can be impacted.\n\n**Remember:**  A weak Rupee doesn't necessarily mean it's a bad thing. It can benefit some sectors like tourism and exports, wh
ile making imports more expensive.\n\n**Common Pitfalls to Avoid:**\n\n* **Panicking over short-term fluctuations:**  Currency rates can fluctuate dramatically in the
 short term, but don't let temporary dips or rises scare you. Focus on long-term trends.\n* **Ignoring the impact of global events:**  Don't underestimate the impact 
of global events on currency rates.  Stay informed about major news and developments.\n\n###  Practice Opportunities\n\n* **Track the Rupee's exchange rate against the US dollar for a week.**  Note any significant changes and try to identify the reasons behind them. \n* **Research the impact of a strong or weak Rupee on different 
sectors of the Indian economy.**\n\n**Summary and Next Steps:**\n\nThe Indian Rupee's value is constantly changing, influenced by various economic, political, and glo
bal factors.  Understanding these factors is crucial for navigating the global economy, making informed decisions about travel, investments, and business.\n\n**Keep learning!**  Explore more about:\n\n* **Key economic indicators:**  Understanding GDP, inflation, and interest rates will provide a deeper understanding of currency fluctuations.\n* **The role of central banks:**  Learn how the Reserve Bank of India (RBI) manages the Rupee's value.\n* **International trade and its impact on currencies:**  Explore how global trade agreements and policies affect currency rates. \n\nYou're doing great!  Keep exploring and learning about the fascinating world of ec
onomics and finance.  \n`

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

    const initialContent = parseContent(content);
    setSections(initialContent);
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
      const modifiedText = `${sections[selectedSection]} (Modified based on: ${prompt})`;
      const newSections = [...sections];
      newSections[selectedSection] = modifiedText;
      setSections(newSections);
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
    if (isHeader(text)) {
      return text.replace(/^#{1,6}\s/, '');
    }
    
    if (isList(text)) {
      return text.split('\n').map((item, i) => (
        <div key={i} className="flex items-start">
          <span className="mr-2">•</span>
          <span>{item.replace(/^[\*\-]\s/, '')}</span>
        </div>
      ));
    }
    
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => {
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
    </div>
  );
};

export default ContentEditor;