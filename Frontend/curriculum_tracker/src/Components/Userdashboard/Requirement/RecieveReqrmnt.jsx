import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbardash from '../Navbardash';


const RecieveReqrmnt = () => {

    const [requirement,setRequirement]= useState([]);

    useEffect(
        ()=>{
            getData();
        },[]
    )

    const getData =()=>{
        axios.get('/reqlist')
        .then(
            (response)=>{
                
                setRequirement(response.data)
                
            }

        ).catch(
            (error)=>{
                console.log("error in loading data"+error);

            }
        )
    }




  return (
    <div>
        <Navbardash/>
        <div className="container faculty_req">
            <div className="row recv-req">
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <table className="table">
                        <thead>
                            <tr style={{color:"#1E90FF",fontWeight:"bolder",fontSize:"16px"}}>
                                <th scope="col">Name of Requirement</th>
                                <th scope="col">Area of Training</th>
                                <th scope="col">Institution</th>
                                <th scope="col">Category</th>
                                <th scope="col">Duration</th>
                                <th scope="col">References</th>
                               
      
                            </tr>
                        </thead>
                        <tbody>
                            {requirement.map(
                                (value,index)=>{
                                return <tr>
                                   <td>{value.reqname}</td>
                                    <td>{value.area}</td>
                                    <td>{value.institution}</td>
                                    <td>{value.catagory}</td>
                                    <td>{value.hours}</td>
                                    <td>{value.imgpath}</td>
                                   
                            
                                </tr> 
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RecieveReqrmnt