import React, { useState, useEffect } from 'react'
import Header from '../../Extras/Header'
import Admin_sidebar from '../../Extras/Admin_sidebar'
import './admin_relief_program.css'
import Axios from 'axios'
import {Link} from 'react-router-dom';

import {useNavigate} from 'react-router-dom';

function Admin_Disaster() {


  const navigate= useNavigate()
  const toComponentdisloc=(Disaster_id)=>{
    navigate('/Disaster_Dashboard.js',{state:{id:Disaster_id}});
    }

    const [cities, SetCities] = useState([]);
  const [removeDis, SetremoveDis] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/remDis").then((response) => {
      SetremoveDis(response.data)
      //console.log(response.data)

    })

  },[])

  const RemoveDisas = (dis_id) => {
    Axios.post("http://localhost:3001/api/removingdisaster", { disas: dis_id }).then((resultx) => {
      if (resultx.data.message) {
        alert(resultx.data.message);
      }
    })
  };








  const [newDisasterLoc, setnewDisasterLoc] = useState({
    City_id: "", City_name: "", Disaster_id: "", Disaster_name: "", Location_name: ""
  });


  

  useEffect(() => {
    Axios.get("http://localhost:3001/api/cities").then((response) => {
      SetCities(response.data)
      console.log(response)

    })

  }, [])

  const [disasters, SetDisasters] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/disasters").then((response) => {
      SetDisasters(response.data)
      console.log(response)

    })

  }, [])


  let name, value;

  const handleDisLocInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setnewDisasterLoc({ ...newDisasterLoc, [name]: value });

  }



  const addDisLoc = () => {
    Axios.post("http://localhost:3001/api/addDisasterLoc", { disloc: newDisasterLoc }).then((resultx) => {
      if (resultx.data.message) {
        alert(resultx.data.message);
      } else {
        alert(resultx.data.message1);
      }
    })
  };












  const [disasterdet, Setdisasterdet] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/disasterinfo").then((response) => {
      Setdisasterdet(response.data)
      //console.log(response.data)

    })

  }, [])


  const [newCategory, setnewCategory] = useState({
    Disaster_type: ""
  });

  const SubmitNewCateg = () => {
    Axios.post("http://localhost:3001/api/add_disastercategory", { category: newCategory }).then((resultx) => {
      if (resultx.data.message) {
        alert(resultx.data.message);
      } else {
        alert(resultx.data.message1);
      }
    })
  };

  // let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setnewCategory({ ...newCategory, [name]: value });

  }




  
  const [newDisaster,setnewDisaster] = useState({
    dis_name: "", date: "",dis_type: "" 
  });
  const [disastertype,Setdisastertype] = useState([]);
  useEffect(()=>{
    Axios.get("http://localhost:3001/api/disastercateg").then((response)=>{
      Setdisastertype(response.data)
      console.log(response)

    })

  },[])

  


  let nname, vvalue;

  const handleDisInputs = (e) =>{
    nname = e.target.name;
    vvalue = e.target.value;
    setnewDisaster({...newDisaster, [nname]:vvalue});
   
   }


   const addDis = ()=>{
    Axios.post("http://localhost:3001/api/addDisaster",{dis:newDisaster}).then((resultx)=>{
      if(resultx.data.message){
        alert(resultx.data.message);
      }else{
        alert(resultx.data.message1);
      }
    })
  };
  return (
    <>
      <Header />
      <Admin_sidebar />
      <div className="card" style={{'backgroundColor':'#30574b', 'borderColor':'transparent', 'borderStyle':'none'}}>
        <div className='button'>
          
          <button type="button" className="btn" id='add_relief_program' data-bs-toggle="modal" data-bs-target="#addDis">Add Disaster</button>

          <div className="modal-centered modal-scrollable modal fade modal-lg" id="addDis" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content" style={{'backgroundColor':'#30574b', 'borderColor':'transparent'}}>
                <div className="modal-header" style={{'backgroundColor':'#30574b', 'borderStyle':'none', 'borderColor':'transparent'}}>
                  <h1 className="modal-title fs-5" id="exampleModalLabel" style={{'color':'white'}}>ADD DISASTER</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" style={{ "margin": "auto", "width": "100%", "border": "3px solid black", "padding": "5%", 'backgroundColor':'#478484', 'borderRadius':'50px'}}>
                  <div className="d-grid gap-2" >

                  <table className="table" style={{'backgroundColor':'#30574b', 'color':'#fffb00', 'textAlign':'center'}}>
                    <thead >
                      <tr>
                      <th scope="col">Disaster Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Disaster Type</th>
                      <th scope="col">Option</th>
                      </tr>
                    </thead>
                  <tbody>
          
                  <tr style={{'borderBottomColor':'transparent'}}>
                    <td>  <input type="text" className="form-control" value={newDisaster.dis_name} name= 'dis_name' onChange={handleDisInputs} placeholder="Disaster Name" aria-label="Username"></input>
                  </td>
                  <td>
                    <input type="date" value={newDisaster.date} name='date' onChange={handleDisInputs}  ></input></td>
                  <td>
                    <select class="form-select" name='dis_type' value={newDisaster.dis_type} onChange={handleDisInputs} aria-label="Default select example">
                    <option selected>Disaster type</option>
                      {disastertype.map((val)=>(
                    <option>{val.disaster_type}</option> 
                      ))}
                    </select>
                  </td>

                  <button type="button" onClick={addDis} style={{"background":"#89bd79", "borderRadius":"5px", "borderStyle":"none"}}>Add</button>
              </tr>
            
            </tbody>
              </table>

                  </div>
                </div>
                <div className="modal-footer" style={{'backgroundColor':'#30574b', 'borderColor':'white', 'marginTop':'5%'}}>

                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Go Back</button>

                </div>
              </div>
            </div>
          </div>












          <button type="button" className="btn" id='add_relief_program' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Disaster Category</button>



          <div className="modal-centered modal-scrollable modal fade modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content" style={{'backgroundColor':'#30574b', 'borderColor':'transparent'}}>
                <div className="modal-header" style={{'backgroundColor':'#30574b', 'borderStyle':'none', 'borderColor':'transparent'}}>
                  <h1 className="modal-title fs-5" id="exampleModalLabel" style={{'color':'white'}}>ADD DISASTER CATEGORY</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" style={{ "margin": "auto", "width": "100%", "border": "3px solid black", "padding": "5%", 'backgroundColor':'#478484', 'borderRadius':'50px'}}>
                  <div className="d-grid gap-2 col-9 mx-auto" >

                    <input type="email" className='large-input' value={newCategory.Disaster_type} name='Disaster_type' onChange={handleInputs} placeholder="Disaster Category"></input>
                  </div>
                </div>
                <div className="modal-footer" style={{'backgroundColor':'#30574b', 'borderColor':'white', 'marginTop':'5%'}}>

                  <button type="button" onClick={SubmitNewCateg} className="btn btn-success" data-bs-dismiss="modal">Add</button>
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Go Back</button>

                </div>
              </div>
            </div>
          </div>

          <button type="button" className="btn" id='add_relief_program' data-bs-toggle="modal" data-bs-target="#examplesModal">Disaster Locations</button>
          <div className="modal-centered modal-scrollable modal fade modal-lg" id="examplesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" >
              <div className="modal-content" style={{'backgroundColor':'#30574b', 'borderStyle':'none', 'borderColor':'transparent'}}>
                <div className="modal-header" style={{'borderBottomStyle':'none'}}>
                  <h3 className="modal-title fL-5" id="exampleModalLabel" style={{'color':'white', 'borderStyle':'none', 'borderColor':'transparent'}}>ADD DISASTER LOCATION</h3>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" >
                <div className="card"  style={{ "margin": "auto", "width": "100%", "border": "3px solid black", "padding": "5%", 'backgroundColor':'#478484', 'borderRadius':'50px'}}>

          <table className="table" style={{'backgroundColor':'#30574b', 'color':'#fffb00', 'textAlign':'center'}}>
        <thead>
            <tr>
            <th scope="col">CITY</th>
            <th scope="col">DISASTER</th>
            <th scope="col">LOCATION Name</th>
            </tr>
        </thead>
                   <tbody >
                    <tr style={{'backgroundColor':'#30574b', 'color':'white', 'textAlign':'center', 'borderStyle':'none', 'borderColor':'transparent'}} >

                      <td>
                        <select className="form-select" name='City_name' value={newDisasterLoc.City_name} onChange={handleDisLocInputs} aria-label="Default select example" >
                          <option selected>City</option>
                          {cities.map((val) => (
                            <option >{val.City_name}</option>
                          ))}
                        </select>
                      </td>

                      <td>
                        <select className="form-select" name='Disaster_name' value={newDisasterLoc.Disaster_name} onChange={handleDisLocInputs} aria-label="Default select example">
                          <option selected>Disaster</option>
                          {disasters.map((val) => (
                            <option >{val.Disaster_name}</option>
                          ))}
                        </select>
                      </td>


                      <td>  <input type="text" className="form-control" value={newDisasterLoc.dis_name} name='Location_name' onChange={handleDisLocInputs} placeholder="Location Name" aria-label="Username"></input>
                      </td>

                    </tr>

                    </tbody>



                    </table>
                  </div>
                </div>
                <div className="modal-footer">

                  <button type="button" onClick={addDisLoc} className="btn btn-success" data-bs-dismiss="modal">Add</button>
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Go Back</button>

                </div>
              </div>
            </div>
          </div>

          <button type="button" className="btn " id='add_relief_program' data-bs-toggle="modal" data-bs-target="#removedismodal">Remove Disaster</button>


          <div className="modal-centered modal-scrollable modal fade modal-lg" id="removedismodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" style={{'backgroundColor':'transparent', 'borderStyle':'none'}}>
              <div className="modal-content" style={{'backgroundColor':'#30574b', 'borderStyle':'none', 'borderColor':'transparent'}}>
                <div className="modal-header" style={{'backgroundColor':'#30574b', 'borderStyle':'none', 'borderColor':'transparent'}}>
                  <h3 className="modal-title fl-5" id="exampleModalLabel"  style={{'backgroundColor':'#30574b', 'borderStyle':'none', 'borderColor':'transparent', 'color':'white'}}>REMOVE DISASTER</h3>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" style={{'backgroundColor':'#30574b','borderColor':'transparent'}}>
                  <div className="card" style={{ "margin": "auto", "width": "100%", "border": "3px solid black", "padding": "5%", 'backgroundColor':'#478484', 'borderRadius':'50px'}}>
                    {/* <h3>REMOVE DISASTER</h3> */}
                    <table className="table" style={{'borderRadius':'50px'}}>

                      <thead style={{'backgroundColor':'#30574b', 'color':'#fffb00', 'textAlign':'center'}}>
                        <tr >
                          <th scope="col">DISASTER ID</th>
                          <th scope="col">DISASTER NAME</th>
                          <th scope="col">DISASTER DATE</th>
                          <th scope="col">DISASTER TYPE</th>
                          <th scope="col">OPTION</th>

                        </tr>
                      </thead>
                      <tbody>
                        {removeDis.map((val) => (

                          <tr style={{'backgroundColor':'#30574b', 'color':'white', 'textAlign':'center', 'borderStyle':'none', 'borderColor':'transparent'}}>
                            <td>{val.Disaster_id}</td>
                            <td>{val.Disaster_name}</td>
                            <td>{val.Disaster_date}</td>
                            <td>{val.Disaster_type}</td>
                            <button type="button" id='removebtn' onClick={() => { RemoveDisas(val.Disaster_id) }}>REMOVE</button>
                          </tr>
                        ))}

                      </tbody>
                    </table>

                  </div>

                  
                </div>
                <div className="modal-footer">

                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Go Back</button>

                </div>
              </div>
            </div>
          </div>



          {/* yeh aik different page pe jaye ha */}
        </div>

        <table className="table" style={{'backgroundColor':'#30574b', 'color':'#fffb00','borderStyle':'none', 'textAlign':'center'}}>
          <thead>
            <tr>
              <th scope="col">Disaster ID</th>
              <th scope="col">Disaster Name</th>
              <th scope="col">Disaster date</th>
              <th scope="col">Disaster type</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {disasterdet.map((val) => (
              <tr style={{'backgroundColor':'#30574b','fontWeight':'bold', 'color':'white','borderStyle':'none', 'textAlign':'center'}}>
                <td>{val.disaster_id}</td>
                <td>{val.disaster_name}</td>
                <td>{val.disaster_date}</td>
                <td>{val.disaster_type}</td>
                <td><button type="button"  onClick={()=>{toComponentdisloc(val.disaster_id)}} className="btn btn-primary">Dashboard</button></td>
              </tr>


            ))}

          </tbody>
        </table>
      </div>

    </>
  )
}

export default Admin_Disaster