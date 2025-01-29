import React, { useState } from "react";
import SidebarSummary from "../SidebarSummary/SidebarSummary";
import QuotationForm from "../Qutationform/Qutationform"; // Import the form
import "./CostCalculator.css"

const CostCalculator = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedWebsiteType, setSelectedWebsiteType] = useState(null);
  const [selectedPageRange, setSelectedPageRange] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]); // To track selected pages
  const [newPageName, setNewPageName] = useState(""); // For adding custom pages
  const [specialRequirements, setSpecialRequirements] = useState([]); // Special requirements tracking
  const [mostSpecialRequirements, setMostSpecialRequirements] = useState([]); // Most s
  const [selectedTechnologies, setSelectedTechnologies] = useState([]); // Track selected technologies
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [quotation, setQuotation] = useState(""); // Store quotation details
  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    // Prepare quotation details
    const quotationDetails = {
      totalCost,
      selectedOptions,
      selectedWebsiteType,
      selectedPageRange,
      selectedPages,
      specialRequirements,
      mostSpecialRequirements,
      selectedTechnologies,
    };
  
    // Send the email
    sendQuotationEmail(formData, quotationDetails);
  };
  
  const sendQuotationEmail = async (formData, quotationDetails) => {
    const adminEmail = "sachintakoria2204@gmail.com"; // Replace with your admin email
    const userMessage = `
      Hello ${formData.name},
      Thank you for requesting a quotation. Below are your details:
      ${JSON.stringify(quotationDetails, null, 2)}
    `;
    const adminMessage = `
      New quotation request received:
      ${JSON.stringify(quotationDetails, null, 2)}
    `;
  
    try {
      await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: formData.email, // User email
          subject: "Your Quotation",
          body: userMessage,
        }),
      });
  
      await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: adminEmail, // Admin email
          subject: "New Quotation Request",
          body: adminMessage,
        }),
      });
  
      // alert("Quotation sent successfully to both user and admin!");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send quotation. Please try again.");
    }
  };
  
  const options = {
      websiteType: [
      { label: "Static / Information", cost: 5000 },
      { label: "Dynamic", cost: 10000 },
      { label: "Corporate Website", cost: 20000 },
      { label: "One Page Site", cost: 8000 },
      { label: "E-Commerce", cost: 30000 },
    ],
    pages: [
      { label: "1-4", cost: 2000 },
      { label: "5-8", cost: 5000 },
      { label: "9-20", cost: 10000 },
      { label: "20-25", cost: 15000 },
      { label: "Unlimited", cost: 25000 },
    ],
    additional: [
      { label: "Domain", cost: 1000 },
      { label: "Hosting", cost: 3000 },
      { label: "Email IDs", cost: 1200 },
    ],
    pageNames: [
      "Home",
      "About Us",
      "Contact Us",
      "Services",
      "Portfolio",
      "Product",
      "Media",
      "Enquiry",
      "Blog",
      "Team",
      "FAQ's",
      "Events",
      "CSR",
      
    ],
    specialRequirements: [
        { label: "SEO Friendly", cost: 5000 },
        { label: "On Page SEO", cost: 2000 },
        { label: "Social Media Linking", cost: 500 },
        { label: "Popup Enquiry", cost: 500 },
        { label: "Banner Dynamic", cost: 1000 },
        { label: "Admin Panel", cost: 3000 },
        { label: "Content Writing Per Page", cost: 500 },
      ],
      mostSpecialRequirements: [
        { label: "Tawk Live Chat", cost: 500 },
        { label: "Google My Business Page", cost: 500 },
        { label: "Whatsapp Chat", cost: 500 },
        { label: "Call Button", cost: 500 },
        { label: "Payment Gateway", cost: 5000 },
        { label: "SMS API", cost: 5000 },
        { label: "Highly Professional Look", cost: 10000 },
      ],
      technologies: [
        "PHP",
        "HTML",
        "CSS",
        "Node.js",
        "Mongoose",
        "JAVA SCRIPT",
        "MYSQL",
      ],
  };

  const handleTechnologySelect = (technology) => {
    const exists = selectedTechnologies.includes(technology);
    if (exists) {
      setSelectedTechnologies(selectedTechnologies.filter((tech) => tech !== technology));
    } else {
      setSelectedTechnologies([...selectedTechnologies, technology]);
    }
  };

  const handleSelect = (item, type) => {
    if (type === "websiteType") {
      // Reset previous selection and set the new one
      if (selectedWebsiteType) {
        setTotalCost((prevTotal) => prevTotal - selectedWebsiteType.cost);
      }
      setSelectedWebsiteType(item);
      setTotalCost((prevTotal) => prevTotal + item.cost);
    } else if (type === "pages") {
      // Reset previous selection and set the new one
      if (selectedPageRange) {
        setTotalCost((prevTotal) => prevTotal - selectedPageRange.cost);
      }
      setSelectedPageRange(item);
      setTotalCost((prevTotal) => prevTotal + item.cost);
    } else if (type === "pageName") {
      // Toggle page names
      const exists = selectedPages.includes(item);
      if (exists) {
        setSelectedPages((prevPages) => prevPages.filter((page) => page !== item));
      } else {
        setSelectedPages((prevPages) => [...prevPages, item]);
      }
    } else if (type === "specialRequirement") {
      // Toggle special requirements
      const exists = specialRequirements.find((req) => req.label === item.label);
      if (exists) {
        setSpecialRequirements((prevReqs) =>
          prevReqs.filter((req) => req.label !== item.label)
        );
        setTotalCost((prevTotal) => prevTotal - item.cost);
      } else {
        setSpecialRequirements((prevReqs) => [...prevReqs, item]);
        setTotalCost((prevTotal) => prevTotal + item.cost);
      }
    } else if (type === "mostSpecialRequirement") {
      // Toggle most special requirements
      const exists = mostSpecialRequirements.find((req) => req.label === item.label);
      if (exists) {
        setMostSpecialRequirements((prevReqs) =>
          prevReqs.filter((req) => req.label !== item.label)
        );
        setTotalCost((prevTotal) => prevTotal - item.cost);
      } else {
        setMostSpecialRequirements((prevReqs) => [...prevReqs, item]);
        setTotalCost((prevTotal) => prevTotal + item.cost);
      }
    } else {
      // Handle generic additional options
      const exists = selectedOptions.find((opt) => opt.label === item.label);
      if (exists) {
        setSelectedOptions((prevOptions) =>
          prevOptions.filter((opt) => opt.label !== item.label)
        );
        setTotalCost((prevTotal) => prevTotal - item.cost);
      } else {
        setSelectedOptions((prevOptions) => [
          ...prevOptions,
          { ...item, type },
        ]);
        setTotalCost((prevTotal) => prevTotal + item.cost);
      }
    }
  };
  
  

  const handleAddNewPage = () => {
    if (newPageName.trim() && !selectedPages.includes(newPageName)) {
      setSelectedPages([...selectedPages, newPageName]);
      setNewPageName(""); // Clear input after adding
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div style={{ width: "70%" }} className="left-div">
        <h1>Website Development Cost Calculator</h1>

        {/* Website Type Section */}
        <div className="website-type">
  <h3>Are You Looking For?</h3>
  <div className="website-type-container">
    {options.websiteType.map((option) => (
      <label key={option.label} className="website-type-button">
        <input
          type="checkbox"
          checked={selectedWebsiteType?.label === option.label}
          onChange={() => handleSelect(option, "websiteType")}
        />
        <span>{option.label} - ₹{option.cost}</span>
      </label>
    ))}
  </div>
</div>


        {/* Page Range Section */}
        <div className="number-of-pages">
  <h3>Number of Pages</h3>
  <div className="pages-container">
    {options.pages.map((option) => (
      <label key={option.label} className="page-option">
        <input
          type="checkbox"
          checked={selectedPageRange?.label === option.label}
          onChange={() => handleSelect(option, "pages")}
        />
        <span>{option.label} - ₹{option.cost}</span>
      </label>
    ))}
  </div>
</div>

        {/* Additional Options Section */}
        <div className="additional-options">
  <h3>Additional Options</h3>
  <div className="additional-options-container">
    {options.additional.map((option) => (
      <label key={option.label} className="additional-option">
        <input
          type="checkbox"
          checked={selectedOptions.find((opt) => opt.label === option.label)}
          onChange={() => handleSelect(option, "additional")}
        />
        <span>{option.label} - ₹{option.cost}</span>
      </label>
    ))}
  </div>
</div>



        {/* Pages Section */}
     <div >
  <h3>Pages Name</h3>
  <div className="pages-container">
  {options.pageNames.map((page) => (
    <label key={page}>
      <input
        type="checkbox"
        checked={selectedPages.includes(page)}
        onChange={() => handleSelect(page, "pageName")}
      />
      {page}
    </label>
  ))}

  {/* Add New Page Section */}
  <div className="add-new-page">
    <input
      type="text"
      placeholder="Add New Page"
      value={newPageName}
      onChange={(e) => setNewPageName(e.target.value)}
    />
    <button onClick={handleAddNewPage}>+</button>
  </div>
  </div>
     </div>


          {/* Special Requirements Section */}
          <div className="special-requirements-container">
  <h3>Special Requirements</h3>
  {options.specialRequirements.map((requirement) => (
    <label key={requirement.label}>
      <input
        type="checkbox"
        checked={specialRequirements.find((req) => req.label === requirement.label)}
        onChange={() => handleSelect(requirement, "specialRequirement")}
      />
      {requirement.label} - ₹{requirement.cost}
    </label>
  ))}
          </div>

          <div className="most-special-requirements-container">
  <h3>Most Special Requirements</h3>
  <div className="most-special-requirements-grid">
    {options.mostSpecialRequirements.map((requirement) => (
      <label key={requirement.label}>
        <input
          type="checkbox"
          checked={mostSpecialRequirements.find((req) => req.label === requirement.label)}
          onChange={() => handleSelect(requirement, "mostSpecialRequirement")}
        />
        {requirement.label} - ₹{requirement.cost}
      </label>
    ))}
  </div>
</div>



        {/* Technology Section */}
        <div className="technology-container">
  <h3>Technology</h3>
  <div className="technology-grid">
    {options.technologies.map((technology) => (
      <label key={technology}>
        <input
          type="checkbox"
          checked={selectedTechnologies.includes(technology)}
          onChange={() => handleTechnologySelect(technology)}
        />
        {technology}
      </label>
    ))}
  </div>
</div>

      </div>
      

      {/* Sidebar Summary */}
      <SidebarSummary
        selectedOptions={selectedOptions}
        totalCost={totalCost}
        selectedWebsiteType={selectedWebsiteType}
        selectedPageRange={selectedPageRange}
        selectedPages={selectedPages}
        specialRequirements={specialRequirements}
        mostSpecialRequirements={mostSpecialRequirements} 
        selectedTechnologies={selectedTechnologies}
        onDownloadClick={() => setIsModalOpen(true)} // Open modal when clicked
/>
   

      {/* Quotation Form Modal */}
      <QuotationForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        totalCost={totalCost}
        selectedWebsiteType={selectedWebsiteType}
        selectedPageRange={selectedPageRange}
        selectedPages={selectedPages}
        specialRequirements={specialRequirements}
        mostSpecialRequirements={mostSpecialRequirements}
        selectedTechnologies={selectedTechnologies}
      />

     
    </div>
  );
};

export default CostCalculator;
