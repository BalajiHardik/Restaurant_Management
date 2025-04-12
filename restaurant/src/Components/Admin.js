import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import "./Reservation.css"
function Admin() {
    const [data, setData] = useState([]);
    const[formData, setFormData] = useState({
        ReservationId:"",
        CustomerName:"",
        TableNumber:"",
        ReservationTime:"",
        SpecialRequests:"",
        zone:"",
        status:""
    })
    const [editId, setEditId] = useState(null);
    //fetch the data fuction
    const fetchData=()=>{
        axios.get('http://localhost:2000/restaurant').then((res)=>{
            setData(res.data)
        }).catch((err)=>{
            console.log(err)
        })

    }
    useEffect(()=>{
        fetchData();
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:2000/restaurant', formData).then((res)=>{
            fetchData();
            setFormData({
                ReservationId:"",
                CustomerName:"",
                TableNumber:"",
                ReservationTime:"",
                SpecialRequests:"",
                zone:"",
                status:""

            })
            alert('Reservation Added Successfully');
        }).catch((err)=>{
            console.log(err)
        })
    }
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleDelete=(id)=>{
        axios.delete(`http://localhost:2000/restaurant/${id}`).then((res)=>{
            fetchData();
            //alert('Reservation Deleted Successfully');
        }).catch((err)=>{
            console.log(err)
        })
    }
    const handleEdit=(id)=>{
        axios.get(`http://localhost:2000/restaurant/${id}`).then((res)=>{
            setFormData(res.data);
            setEditId(id);
            handleDelete(id);
            //alert('Reservation Updated Successfully');
        }).catch((err)=>{
            console.log(err)
        })
    }
    
  return (
    <div>
        <h2>Resetaurant Reservation System</h2>
       
        <form onSubmit={handleSubmit}>
            <input type='number' name='ReservationId' placeholder='ReservationId' value={formData.ReservationId} onChange={handleChange} required/><br/>
            <input type='text' name='CustomerName' placeholder='CustomerName' value={formData.CustomerName} onChange={handleChange} required/><br/>
            <input type='number' name='TableNumber' placeholder='TableNumber' value={formData.TableNumber} onChange={handleChange} required/><br/>
            <input type='time' name='ReservationTime' placeholder='ReservationTime' value={formData.ReservationTime} onChange={handleChange} required/><br/>
            <select name='zone' value={formData.zone} onChange={handleChange} required><br/>
                <option value=''>Select Zone</option>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
            </select><br/>
            <input type='text' name='SpecialRequests' placeholder='SpecialRequests' value={formData.SpecialRequests} onChange={handleChange} required/><br/>
            <select name='status' value={formData.status} onChange={handleChange} required><br/>
                <option value=''>Select Status</option>
                <option value='Booked'>Booked</option>
                <option value='Cancelled'>Cancelled</option>
            </select><br/>
            <button type='submit' id='submit'>Submit</button>

        </form>
        <table>
            <thead>
                <tr>
                    <th>ReservationId</th>
                    <th>CustomerName</th>
                    <th>TableNumber</th>
                    <th>ReservationTime</th>
                    <th>zone</th>
                    <th>SpecialRequests</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item)=>{
                    return(
                        <tr key={item.id}>
                            <td>{item.ReservationId}</td>
                            <td>{item.CustomerName}</td>
                            <td>{item.TableNumber}</td>
                            <td>{item.ReservationTime}</td>
                            <td>{item.zone}</td>
                            <td>{item.SpecialRequests}</td>
                            <td>{item.status}</td>
                            <td>    
                                <button id='delete' onClick={()=>handleDelete(item.id)}>Delete</button><br/><br/>
                                <button id='edit' onClick={()=>handleEdit(item.id)}>Edit</button>
                            </td>   
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Admin