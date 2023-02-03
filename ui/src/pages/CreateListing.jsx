import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../baseUrl";
import "./CreateListing.css";

function CreateListing({user, edit}) {
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const img = useRef();
  const remarks = useRef();
  const acres = useRef();
  const finishedSqFt = useRef();
  const bathrooms = useRef();
  const bedrooms = useRef();
  const zipCode = useRef();
  const state = useRef();
  const city = useRef();
  const streetSuffix = useRef();
  const streetName = useRef();
  const unit = useRef();
  const street = useRef();
  const propertyType = useRef();
  const status = useRef();
  const price = useRef();
  const err = useRef();

  const [req, setReq] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    let obj = {
      remarks: remarks.current.value,
      city: city.current.value,
      state: state.current.value,
      street: street.current.value,
      unit: unit.current.value,
      propertyType: propertyType.current.value,
      price: price.current.value,
      status: status.current.value,
      streetName: streetName.current.value,
      streetSuffix: streetSuffix.current.value,
      bathrooms: bathrooms.current.value,
      bedrooms: bedrooms.current.value,
      acres: acres.current.value,
      finishedSqFt: finishedSqFt.current.value,
      zipCode: zipCode.current.value,
      image:file
    };
    let valid = true;
    Object.keys(obj).forEach((key) => {
      if (!obj[key]) {
        valid = false;
      }
    });
    if (!valid) {
      err.current.innerText = "Please fill the entire form";
      return;
    }
    err.current.innerText = "     ";

    setReq({...obj});
  }

  useEffect(() => {
    if (req) {
      const url = `${baseUrl}/product/${edit?'/edit/'+edit:'/create'}`;
      const method = edit ? "PUT": "POST"
      fetch(url, {
        method: method,
        body: JSON.stringify(req),
        headers: { "Content-Type": "application/json", "auth": user.token },
      }).then(res=> res.json()).then(data => navigate("/")).catch(err=> console.log(err))
    }
  }, [req]);

  useEffect(() =>{
    if(edit){
      fetch(baseUrl +"/product/"+edit).then(res=> res.json()).then(data =>{
        console.log(data)
        document.querySelectorAll(".field input").forEach(input=>{
          let name = input.name;

          input.value = data[name]||"";
        });
        document.querySelector(".field textarea").value = data['remarks']
        data.image && setFile(data.image);
      })
    }
  }, [edit])

  return (
    <div className="create">
      <form className="create-inner">
        <div className="field">
          <label for="">List price (US$)</label>
          <input required type="number" name="price" ref={price} />
        </div>
        <div className="field">
          <label for="">Status</label>
          <select name="status" ref={status}>
            <option value="active" selected>
              Active
            </option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="field">
          <label for="">Property Type</label>
          <select name="propertyType" ref={propertyType}>
            <option value="commercial" selected>
              Commercial
            </option>
            <option value="Residential">Residential</option>
          </select>
        </div>
        <div className="field">
          <label for="">Street #</label>
          <input type="text" name="street" ref={street} />
        </div>
        <div className="field">
          <label for="">Unit #</label>
          <input type="text" name="unit" ref={unit} />
        </div>

        <div className="field">
          <label for="">Street Name</label>
          <input type="text" name="streetName" ref={streetName} />
        </div>

        <div className="field">
          <label for="">Street Suffix</label>
          <input type="text" name="streetSuffix" ref={streetSuffix} />
        </div>

        <div className="field">
          <label for="">City</label>
          <input type="text" name="city" ref={city} />
        </div>

        <div className="field">
          <label for="">State</label>
          <input type="text" name="state" ref={state} />
        </div>

        <div className="field">
          <label for="">Zip Code</label>
          <input type="text" name="zipCode" ref={zipCode} />
        </div>

        <div className="field">
          <label for="">Bedrooms</label>
          <input type="number" name="bedrooms" ref={bedrooms} />
        </div>

        <div className="field">
          <label for="">Bathrooms</label>
          <input type="number" name="bathrooms" ref={bathrooms} />
        </div>

        <div className="field">
          <label for="">Finished SqFt</label>
          <input type="number" name="finishedSqFt" ref={finishedSqFt} />
        </div>

        <div className="field">
          <label for="">Acres</label>
          <input type="number" name="acres" ref={acres} />
        </div>
        <div className="field ta">
          <label for="">Public Remarks</label>
          <textarea name="remarks" cols="30" rows="10" ref={remarks}></textarea>
        </div>

        <div
          id="imageUpload"
          onClick={() => img.current.click()}
          onDrop={(e) => {
            e.preventDefault();
            let reader = new FileReader();
            reader.readAsDataURL(e.dataTransfer.files[0]);
            reader.onload = () => {
              setFile(reader.result);
            };
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            ref={img}
            onChange={(e) => {
              let reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = () => {
                setFile(reader.result);
              };
            }}
            type="file"
            name="image"
            accept="image/*"
          />
          {!file && (
            <>
              <p>Upload an image</p>
              <small>Click or drop</small>
            </>
          )}
          {file && <img src={file} />}
        </div>
        <p
          className="form-error"
          ref={err}
          style={{ margin: 0, color: "red", fontSize: "14px" }}
        >
          {" "}
        </p>
        <button onClick={handleSubmit} type="submit">
          {edit?"Edit ":"Create"}
        </button>
      </form>
    </div>
  );
}

export default CreateListing;
