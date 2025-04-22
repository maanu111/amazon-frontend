import React from "react";

const FooterMiddleList = ({ items }) => {
  if (!items || !Array.isArray(items)) {
    return null;
  }

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FooterMiddleList;
