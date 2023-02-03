import React from "react";
import "./Listing.css"

function props(props) {
  return (
    <div className="listing">
      <img src={props.image} alt="" />

      <div><h3>Price</h3>{props.price}</div>
      <div><h3>Status</h3>{props.status}</div>
      <div><h3>Property Type</h3>{props.propertyType}</div>
      <div><h3>Bedrooms</h3>{props.bedrooms}</div>
      <div><h3>Bathrooms</h3>{props.bathrooms}</div>
      <div><h3>City</h3>{props.city}</div>
      <div><h3>State</h3>{props.state}</div>
      <div><h3>Street #</h3>{props.street}</div>
      <div><h3>Street Name</h3>{props.streetName}</div>
      <div><h3>Street Suffix</h3>{props.streetSuffix}</div>
      <div><h3>Unit</h3>{props.unit}</div>
      <div><h3>Zip Code</h3>{props.zipCode}</div>
      <div><h3>Finished SqFt</h3>{props.finishedSqFt}</div>
      <div><h3>Acres</h3>{props.acres}</div>
      <div><h3>Public Remarks</h3>{props.remarks}</div>
    </div>
  );
}

export default props;
