import React, { useState } from "react";
import "./Qutationform.css";

const Qutationform = ({
  isOpen,
  onClose,
  onSubmit, // This should be passed as a prop to handle the form data
  totalCost,
  selectedWebsiteType,
  selectedPageRange,
  selectedPages,
  specialRequirements,
  mostSpecialRequirements,
  selectedTechnologies,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission refresh

    const quotationDetails = {
      totalCost,
      selectedWebsiteType,
      selectedPageRange,
      selectedPages,
      specialRequirements,
      mostSpecialRequirements,
      selectedTechnologies,
    };

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          quotationDetails, // Attach all quotation details here
        }),
      });

      if (response.ok) {
        alert("Quotation sent successfully!");
        if (onSubmit) onSubmit(formData); // Trigger parent handler if provided
        onClose(); // Close the modal
      } else {
        alert("Failed to send the quotation.");
      }
    } catch (error) {
      console.error("Error sending quotation:", error);
      alert("An error occurred while sending the quotation.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Download Your Quotation</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <span className="icon">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                <span className="icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                <span className="icon">📞</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Your Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                <span className="icon">📍</span>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter Your City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="modal-footer">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Qutationform;
