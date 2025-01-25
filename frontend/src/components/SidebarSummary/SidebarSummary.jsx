import React from "react";
import "./SidebarSummary.css";

const SidebarSummary = ({
  selectedOptions = [],
  totalCost = 0,
  selectedWebsiteType = null,
  selectedPageRange = null,
  selectedPages = [],
  specialRequirements = [],
  mostSpecialRequirements = [],
  selectedTechnologies = [], // Add technologies
  onDownloadClick,
}) => {
  return (
    <div className="sidebar-summary">
      <h2>Your Order</h2>
      <div className="summary-item">
        {selectedWebsiteType && (
          <div className="summary-row">
            <div className="summary-left">
              <span className="tick-mark">✔</span>
              {selectedWebsiteType.label}
            </div>
            <div className="summary-right">₹{selectedWebsiteType.cost}</div>
          </div>
        )}
        {selectedPageRange && (
          <div className="summary-row">
            <div className="summary-left">
              <span className="tick-mark">✔</span>
              {selectedPageRange.label}
            </div>
            <div className="summary-right">₹{selectedPageRange.cost}</div>
          </div>
        )}
        {selectedOptions.map((item) => (
          <div className="summary-row" key={item.label}>
            <div className="summary-left">
              <span className="tick-mark">✔</span>
              {item.label}
            </div>
            <div className="summary-right">₹{item.cost}</div>
          </div>
        ))}
        {selectedPages.length > 0 && (
          <div className="summary-row">
            <div className="summary-left">
              <span className="tick-mark">✔</span>
              Pages
            </div>
            <div className="summary-right">{selectedPages.join(", ")}</div>
          </div>
        )}
        {specialRequirements.map((req) => (
          <div className="summary-row" key={req.label}>
            <div className="summary-left">
              <span className="tick-mark">✔</span>
              {req.label}
            </div>
            <div className="summary-right">₹{req.cost}</div>
          </div>
        ))}
        {mostSpecialRequirements.map((req) => (
          <div className="summary-row" key={req.label}>
            <div className="summary-left">
              <span className="tick-mark">✔</span>
              {req.label}
            </div>
            <div className="summary-right">₹{req.cost}</div>
          </div>
        ))}
        {selectedTechnologies.length > 0 && (
          <div className="summary-row">
            <div className="summary-left">
              <span className="tick-mark">✔</span>
              Technologies
            </div>
            <div className="summary-right">{selectedTechnologies.join(", ")}</div>
          </div>
        )}
        <div className="summary-total">
          <div className="summary-left">
            <strong>Grand Total</strong>
          </div>
          <div className="summary-right">
            <strong className="total">₹{totalCost}</strong>
          </div>
        </div>
      </div>
      <button className="download-quotation" onClick={onDownloadClick}>
        Download Quotation
      </button>
    </div>
  );
};

export default SidebarSummary;
