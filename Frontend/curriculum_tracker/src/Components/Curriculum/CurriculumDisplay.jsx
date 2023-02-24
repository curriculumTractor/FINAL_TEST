import React from 'react'
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './curriculumdisplay.css'
import PDFViewer from 'pdf-viewer-reactjs'
import Admin_navbar from '../Admindashboard/Admin_navbar';


const CurriculumDisplay = () => {

  var [curriculum,setCurriculum]=useState([])
  var [id,setId] = useState();
  const navigate =useNavigate();
  

  useEffect(() => {
    displayCurriculum();
    },[]
  );

  const displayCurriculum=()=>{
    const userData={

      "file":'',
      "comments":'',
      "title":'',
      "area":'',
      "category":'',
      "institution":'',
      "id":''

    }

    axios.post('/displaycurriculum',userData)
      .then((response)=>{
        console.log(response.data)
        setCurriculum(response.data)
      })
      .catch(
        (error)=>{
          console.log("The error loading data"+error)
        }
      )
  }


  const UpdateCurriculum=()=>{
    axios.post('/curupdate')
      .then((response)=>{
        console.log(response.data);
        setCurriculum(response.data);
        alert("Successfully Approved")
      }) 
      .catch(
        (error)=>{
          console.log("The error loading data"+error)
        })
  }

  const DeleteCurriculum=()=>{
    
    axios.delete(`/curricul/delete/${id}`)
      .then((response)=>{
        console.log(response.data);
        setCurriculum(response.data);
        alert("Successfully Rejected");
        navigate('/curriculumdisplay')
      }) 
     .catch(
      (error)=>{
        console.log("The error loading data"+error)
      })
  }
  
  const downloadCurriculum=()=>{
    const userData={

      "file":'',
      
      "id":''

    }

    axios.get(`/download/${id}`,userData)
      .then((response)=>{
        
        console.log(response.data);
        setCurriculum(response.data);
        
        alert("Successfully downloaded");
        navigate('/curriculumdisplay')
       }) 
     .catch(
        (error)=>{
          console.log("The error loading data"+error)
        })
  }

 
  

  return (
    <div>
      <Admin_navbar/>
      <div className='container curriculumlist'>
        <div className="row curview">
        <h2 style={{textAlign:"center",color:"#1E90FF",marginTop:"4px",marginBottom:"4px"}}>NEW CURRICULUM</h2> 
            <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12" >
              <div className="row g-3">
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <table className="table table-success table-striped curriculumtablelist" >
                    <thead>
                      <tr className="bg-dark text-white" class="bg-gray-50 currrow">
                        <th scope="col">Name</th>
                        <th scope="col">Area Of Training</th>
                        <th scope="col">Category</th>
                        <th scope="col">Institution</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Curriculum</th>
                      </tr>
                    </thead>
                    <tbody class="curriculumbody">
                      {curriculum.map((value,index)=>{
                        return <tr>
                            <td>{value.title}</td>
                            <td>{value.area}</td>
                            <td>{value.category}</td>
                            <td>{value.institution}</td>
                            <td>{value.comments}</td>
                            <td>{value.pdfpath}</td>
                            <td><button type="button" class="btn btn-primary" onClick={downloadCurriculum} >DOWNLOAD</button></td>
                            <td><button  type="button" class="btn btn-success" onClick={UpdateCurriculum}>APPROVE</button></td>
                            <td><button type="button" class="btn btn-danger" onClick={DeleteCurriculum}>REJECT</button></td>
                          </tr>
                       }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> 
    </div>
  )
}

export default CurriculumDisplay