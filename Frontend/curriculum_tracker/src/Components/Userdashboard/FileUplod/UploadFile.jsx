import React, { useState } from 'react'
import Navbardash from '../Navbardash'
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom'
import './file.css'

const UploadFile = () => {
    const [title,setTitle]=useState("");
  const [area,setArea]=useState("");
  const [institution,setInstitution]=useState("");
  const [category,setCategory]=useState("");

    const [fileData, setFileData] = useState("");
    const [comments,setComments]=useState("");
    const navigate=useNavigate();

    const getFile = (e) => {
       setFileData(e.target.files[0]);
     };
     const uploadFile =async (e) => { 
        e.preventDefault();   
        const data = new FormData();
        data.append("title", title);
        data.append("area", area);
        data.append("institution", institution);
        data.append("category", category);
        data.append("pdf", fileData);
        data.append("comments",comments);
        
        console.log(data);
        const config={
          headers:{
              "Content-Type":"multipart/form-data"
          }
      }
      
      const res=await axios.post("/curriculumupload",data,config);
        console.log(res);
        if (res.statusText==="OK") {
             alert("Requirement successfully Added");
            navigate('/uploadfile')
        }     
        
    }
  return (
    <div>
   <Navbardash/>
    <section className="vh-50" >
        <div className="container" >
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-9">
                    <div className="card" style={{borderRadius: "15px",width:"100%",backgroundColor:"#f0f0f0"}}>
                        <div className="card-body">
                            <h2 className="text mb-4" style={{textAlign:"center",color:"#1E90FF"}}>ADD CURRICULUM</h2>
                            <div className="row align-items-center pt-4 pb-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Title</h6>
                                </div>
                                <div className="col-md-9 pe-5">
                                    <input type="text" placeholder='Enter the Title of curriculum' className="form-control form-control-lg" onChange={(e)=>setTitle(e.target.value)} />
                                </div>
                            </div>
                            <hr className="mx-n3"/>
                            <div className="row align-items-center py-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Training Area</h6>
                                </div>
                                <div className="col-md-9 pe-5">
                                    <select name="area"  onChange={(e)=>setArea(e.target.value)} style={{width:"100%",height:"40px"}}>
                                        <option selected>Select</option>
                                        <option>FSD</option>
                                        <option>ML-AI</option>
                                        <option>DSA</option>
                                        <option>RPA</option>
                                        <option>ST</option>
                                        <option>CSA</option>
                                    </select>
                                </div>
                            </div>
                            <hr className="mx-n3"/>
                            <div className="row align-items-center py-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Instituition</h6>
                                </div>
                                <div className="col-md-9 pe-5">
                                    <input type="text" placeholder='Institution Name' className="form-control form-control-lg" onChange={(e)=>setInstitution(e.target.value)} />
                                </div>
                            </div>
                            <hr className="mx-n3"/>
                            <div className="row align-items-center py-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Category</h6>
                                </div>
                                <div className="col-md-9 pe-5">
                                    <select name="catagory"  onChange={(e)=>setCategory(e.target.value)} style={{width:"100%",height:"40px"}}>
                                        <option>Select</option>
                                        <option>RETAIL</option>
                                        <option>ACADEMIC</option>
                                        <option>CORPORATE</option>
                                        <option>RPA</option>
                                    </select>
                                </div>
                            </div>
                            <hr className="mx-n3"/>
                            <div className="row align-items-center pt-4 pb-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Comments</h6>
                                </div>
                                <div className="col-md-9 pe-5">
                                <textarea class="form-control" onChange={(e)=>setComments(e.target.value)} placeholder="Leave a message here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
                                </div>
                            </div>
                            <hr className="mx-n3"/>
                            <div className="row align-items-center py-3">
                                <div className="col-md-3 ps-5">
                                    <h6 className="mb-0">Upload File</h6>
                                </div>
                                <div className="col-md-9 pe-5">
                                    <input className="form-control form-control-lg" id="formFileLg" type="file"  name="pdf" onChange={getFile} required  />
                                    <div className="small text-muted mt-2">Upload your file.</div>
                                </div>
                                <hr className="mx-n3"/>
                                <div className="px-5 py-4">
                                    <button type="submit" className="btn btn-primary btn-lg" onClick={uploadFile} >Upload Curriculum</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>      

)
}

export default UploadFile