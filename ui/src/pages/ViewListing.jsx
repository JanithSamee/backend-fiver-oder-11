import React, { useEffect, useState } from "react";
import baseUrl from "../baseUrl";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./ViewListings.css";

import { useNavigate} from "react-router-dom";

function ViewListing({ user, setEdit,setView }) {
  const [listings, setListings] = useState([]);
const navigate = useNavigate();
  function load(){
    fetch(baseUrl + "/product/" ,{ headers: { auth: user.token } })
    .then((res) => res.json())
    .then((data) => setListings(data))
    .catch((error) => console.log(error));
  }
  useEffect(() => {
   load();
  }, []);


  function del(id){
    fetch(baseUrl + "/product/delete/"+ id, {
        method: "DELETE",
    }).then((res) => res.json()).then((data)=> load())
    .catch((error) => console.log(error));
  }

  function edit(id){
    setEdit(id);
    navigate("/edit")
  }

  function view(listing){
    setView(listing);
    navigate("/listing")
  }


  return (
    <div className="view">
      {listings && <h3>Total: {listings.length}</h3>}
      <table>
        <tr>
          <th className="actions">Actions</th>
          <th>Image</th>
          <th>Price</th>
          <th>Status</th>
          <th>Property Type</th>
          <th>Bedrooms</th>
          <th>Bathrooms</th>
          <th>City</th>
          <th>State</th>
          <th>Street #</th>
          <th>Street Name</th>
          <th>Street Suffix</th>
          <th>Unit #</th>

          <th>Zip Code</th>
          <th>Finished SqFt</th>
          <th>Acres</th>
        </tr>
        {listings &&
          listings.map((listing) => {
            return (
              <tr>
                <td className="actions">
                    <RemoveRedEyeOutlinedIcon onClick={view.bind(null, listing)}/>
                    <EditIcon onClick={edit.bind(null, listing._id)}/>
                    <DeleteOutlineOutlinedIcon onClick={del.bind(null , listing._id)}/>
                    
                </td>
                <td>
                  {listing.image ? <img src={listing.image} alt="" /> : ""}{" "}
                </td>
                <td>{listing.price}</td>
                <td>{listing.status}</td>
                <td>{listing.propertyType}</td>
                <td>{listing.bedrooms}</td>
                <td>{listing.bathrooms}</td>
                <td>{listing.city}</td>
                <td>{listing.state}</td>
                <td>{listing.street}</td>
                <td>{listing.streetName}</td>
                <td>{listing.streetSuffix}</td>
                <td>{listing.unit}</td>
                <td>{listing.zipCode}</td>
                <td>{listing.finishedSqFt}</td>
                <td>{listing.acres}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}

export default ViewListing;
