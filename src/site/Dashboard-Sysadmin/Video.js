import React, { useState, useEffect } from 'react'
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink, useParams } from 'react-router-dom'
import { Button } from "reactstrap";
import axios from "axios";
import validationnew from '../../Validations/Field.js';


const Video = () => {
  const { clientId } = useParams();
  const [message, setMessage] = useState("");
  const [messageerror, setMessageerror] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [smat, setSmat] = useState("");
  const [errorsfield, setErrorsfield] = useState({});
  
  
  const [sno, setSno] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

const [videoFile, setVideoFile] = useState(null);
  
const [clients, setClients] = useState([]);
const [uploadProgress, setUploadProgress] = useState(0);
const [imageFile, setImageFile] = useState(null);

const fetchClients = (clientId) => {
  axios.get(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/video/${clientId}`)
    .then(response => {
      setClients(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

useEffect(() => {
  if (clientId) {
    fetchClients(clientId);
  }
}, [clientId]);
  
const handleSubmit = async (event) => {
  event.preventDefault();

  const newErrors = {
    ...validationnew("sno", sno),
    ...validationnew("title", title),
    ...validationnew("description", description),
  };

if (!smat) {
  newErrors.smat = "Please select video access status";
}

 if (!videoFile || !videoFile.type.startsWith("video/")) {
    setMessageerror("Please select a valid video file.");
    return;
  }

  if (!imageFile || !imageFile.type.startsWith("image/")) {
  setMessageerror("Please select a valid image file.");
  return;
}

  setErrorsfield(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  setIsSubmitting(true);
  setUploadProgress(0);  // Reset progress
  setMessage("");
  setMessageerror("");

  try {
    // Prepare keys for video and image
const videoExt = videoFile.name.split('.').pop();
const imageExt = imageFile.name.split('.').pop();

const videoKey = `videos/${Date.now()}-${Math.random().toString(36).substring(2)}.${videoExt}`;
const imageKey = `thumbnails/${Date.now()}-${Math.random().toString(36).substring(2)}.${imageExt}`;

// Get presigned URLs
const [videoPresign, imagePresign] = await Promise.all([
  axios.post("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/get-presigned-url", { key: videoKey, fileType: videoFile.type }),
  axios.post("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/get-presigned-url", { key: imageKey, fileType: imageFile.type }),
]);

// Upload files to S3
await axios.put(videoPresign.data.uploadURL, videoFile, {
  headers: { "Content-Type": videoFile.type },
  onUploadProgress: (e) => {
    const percent = Math.round((e.loaded * 100) / e.total);
    setUploadProgress(percent);
  },
});
await axios.put(imagePresign.data.uploadURL, imageFile, {
  headers: { "Content-Type": imageFile.type }
});

const videoS3Url = videoPresign.data.uploadURL.split("?")[0];
const imageS3Url = imagePresign.data.uploadURL.split("?")[0];

// Send to DB
const dbResponse = await axios.post(
  "https://adhigyanam-e92bf1bbbdb1.herokuapp.com/createvideo-presigned",
  { sno, title, description, clientId, smat, s3Url: videoS3Url, imageUrl: imageS3Url }
);

    if (dbResponse.data === "Success") {
      setMessage("Video uploaded and saved successfully!");
      setSno("");
      setTitle("");
      setSmat("");
      setDescription("");
      setVideoFile(null);
      setUploadProgress(0);
      fetchClients(clientId);
    } else {
      setMessageerror("Unexpected server response.");
    }
  } catch (err) {
    const errorMsg = err.response?.data?.error || "An error occurred! Please try again.";
    console.error("Upload Error:", err);
    setMessageerror(errorMsg);
  }

  setIsSubmitting(false);
};

  const handleDelete = (clientId) => {
    // Make an API call to delete the client
    axios.delete(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/deletevideo/${clientId}`)
      .then(response => {
        // If deletion is successful, update the clients array to remove the deleted client
        setClients(clients.filter(client => client.Id !== clientId));
      })
      .catch(error => {
        console.error('Error deleting Category:', error);
        // Handle error, such as displaying an error message
      });
  };


    return (
      <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
         <p className="mb-12 text-secondary-light" style={{fontSize:"15px"}}>
                                           <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | <NavLink to="/dashboardcourses" style={{color:'blueviolet', textDecoration:"underline"}}>Courses</NavLink>  | Course Videos
                                       </p>
                                       <div className="col-xxl-12 col-xl-12">
                                                   <div className="card h-100">
                                                       <div className="card-body p-24">
                                                           <div className="d-flex flex-wrap align-items-center gap-1 justify-content-between mb-16">
                                                               <ul
                                                                   className="nav border-gradient-tab nav-pills mb-0"
                                                                   id="pills-tab"
                                                                   role="tablist"
                                                               >
                                                                   <li className="nav-item" role="presentation">
                                                                       <button
                                                                           className="nav-link d-flex align-items-center active"
                                                                           id="pills-to-do-list-tab"
                                                                           data-bs-toggle="pill"
                                                                           data-bs-target="#pills-to-do-list"
                                                                           type="button"
                                                                           role="tab"
                                                                           aria-controls="pills-to-do-list"
                                                                           aria-selected="true"
                                                                       >
                                                                            A. Add Course Video
                                                                       </button>
                                                                   </li>
                                                                   <li className="nav-item" role="presentation">
                                                                       <button
                                                                           className="nav-link d-flex align-items-center"
                                                                           id="pills-recent-leads-tab"
                                                                           data-bs-toggle="pill"
                                                                           data-bs-target="#pills-recent-leads"
                                                                           type="button"
                                                                           role="tab"
                                                                           aria-controls="pills-recent-leads"
                                                                           aria-selected="false"
                                                                           tabIndex={-1}
                                                                       >
                                                                           B. Manage Existing 
                                                                       </button>
                                                                   </li>
                                                               </ul>
                                                               {/* <Link
                                                                   to="#"
                                                                   className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                                                               >
                                                                   Create New
                                                                   <Icon
                                                                       icon="solar:alt-arrow-right-linear"
                                                                       className="icon"
                                                                   />
                                                               </Link> */}
                                                           </div>
                                                           <div className="tab-content" id="pills-tabContent">
                                                               <div
                                                                   className="tab-pane fade show active"
                                                                   id="pills-to-do-list"
                                                                   role="tabpanel"
                                                                   aria-labelledby="pills-to-do-list-tab"
                                                                   tabIndex={0}
                                                               >
                                                                   <div className="table-responsive scroll-sm">
                                                                   <section className="auth forgot-password-page bg-base d-flex flex-wrap">
     
     <div className="col-xxl-12 col-xl-12" style={{background:"none",width:"auto"}}>
         <div className="mx-auto w-100">
             <div>
           
                                           <p className="mb-32 text-secondary-light text-lg">
                                               <b>Use the following form</b><br/>to add a new course video to the selected course.
                                           </p>
                                           {message && <p style={{padding:5, backgroundColor:"green", color:"white", borderRadius:2}}>{message}</p>}
                                             {messageerror && <p style={{padding:5, backgroundColor:"red", color:"white", borderRadius:2}}>{messageerror}</p>}
                                           <form action="" onSubmit={handleSubmit}>
                                           <div>
            
                                                 <input
                                                     onChange={(e) => setSno(e.target.value)}
                                    type="number"
                                    id="sno"
                                    name="sno"
                                    value={sno}
                                    placeholder="Enter Serial No"
                                                     className="form-control h-56-px bg-neutral-50 radius-12"
                                                   
                                                 />
                                                  {errorsfield.sno && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.sno}</span>}
                                             </div>

                                             


                                             <div  style={{marginTop:"15px"}}>
            
            <input
                onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Enter Title"
                className="form-control h-56-px bg-neutral-50 radius-12"
              
            />
             {errorsfield.title && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.title}</span>}
            </div>
          
            <div  style={{marginTop:"15px"}}>
            
            <textarea
                onChange={(e) => setDescription(e.target.value)}
            type="text"
            id="description"
            name="description"
            value={description}
            placeholder="Enter Description here"
                className="form-control bg-neutral-50 radius-12"
              style={{minHeight:"120px"}}
            />
             {errorsfield.description && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.description}</span>}
            </div>

            <div  style={{marginTop:"15px"}}>

 <select
  id="smat"
  name="smat"
  value={smat}
  className="form-control h-56-px bg-neutral-50 radius-12"
  onChange={(e) => setSmat(e.target.value)}
>
  <option value="">-- Select Video Access Rights --</option>
  <option value="Free">Free</option>
  <option value="Paid">Paid</option>
</select>
      {errorsfield.smat && <span className="text-danger" style={{fontSize:"0.8rem", fontWeight:"bolder"}}>{errorsfield.smat}</span>}
</div>
<div style={{ marginTop: "15px" }}>
<p style={{marginBottom:"0.5rem", fontWeight:"bold"}}>Choose a Video Banner</p>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImageFile(e.target.files[0])}
    className="form-control h-56-px bg-neutral-50 radius-12"
  />
</div>

           <div style={{ marginTop: "15px" }}>
           <p style={{marginBottom:"0.5rem", fontWeight:"bold"}}>Choose a Video File</p>
<input
  type="file"
  accept="video/*"
  onChange={(e) => setVideoFile(e.target.files[0])}
  className="form-control h-56-px bg-neutral-50 radius-12"
/>
</div>
{uploadProgress > 0 && (
  <div style={{ marginTop: "10px" }}>
    <div style={{
      height: "10px",
      backgroundColor: "#e0e0e0",
      borderRadius: "5px",
      overflow: "hidden"
    }}>
      <div style={{
        width: `${uploadProgress}%`,
        height: "100%",
        backgroundColor: "#4caf50",
        transition: "width 0.3s"
      }} />
    </div>
    <small>{uploadProgress}% uploaded</small>
  </div>
)}
                                          
                                <div>
                                                    <Button type="submit" disabled={isSubmitting} className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">
                                                    {isSubmitting ? 'Please Wait...' : 'Create New Record'}
                                                    </Button>
                                                    
                                                  </div>
                                                </form>
             </div>
         </div>
     </div>
 </section>
                                                                      
                                                                   </div>
                                                                 
                                                               </div>
                                                               <div
                                                                   className="tab-pane fade"
                                                                   id="pills-recent-leads"
                                                                   role="tabpanel"
                                                                   aria-labelledby="pills-recent-leads-tab"
                                                                   tabIndex={0}
                                                               >
                                                                   <div className="table-responsive scroll-sm">
                                                                   <div className="col-xxl-12 col-xl-12" style={{background:"none",width:"auto"}}>
         <div className="mx-auto w-100">
             <div>


                               <p className="mb-32 text-secondary-light text-lg">
                                   <b>Use the following datalist</b><br/>to modify / remove listed course videos.
                               </p>
                              
 <div style={{ overflowX: "auto", width: "100%" }}>
                               <table className="table bordered-table sm-table mb-0" style={{width:"100%"}}>
                            <thead>
                                        <tr>
                                            <th scope="col">S No.</th>
                                            <th scope="col">Course Video</th>
                                            <th scope="col">Options</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
  {clients.map(client => (
    <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", transition: "0.3s" }}>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}>{client.Sno}</td>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}><b>{client.Title}</b> [{client.Vstatus}]<br/><b>Video URL</b>: {client.Path1}<br/><b>Banner URL</b>: {client.Path2} </td>

      <td style={{ padding: "10px" }}>
       <a
    href={client.Path1}
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-info btn-small"
    style={{
      padding: "5px 10px",
      fontSize: "0.8rem",
      borderRadius: "5px",
      marginRight: "10px",
      textDecoration: "none",
      color: "white",
      backgroundColor: "#17a2b8",
      border: "none",
      cursor: "pointer"
    }}
  >
    View Video
  </a>
        <Button 
          className="btn-danger btn-small"
          style={{ padding: "5px 10px", fontSize: "0.8rem", borderRadius: "5px", border: "none", cursor: "pointer", transition: "0.3s" }}
          onClick={() => {
            if (window.confirm("You are removing a record permanently! Are you sure you want to delete this record?")) {
              handleDelete(client.Id);
            }
          }}>
          Remove
        </Button>
      </td>
    </tr>
  ))}
</tbody>
</table>
</div>

             </div></div></div>
                                                                      
                                                                   </div>
                                                               </div>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
  
        <BlankPageLayer />
      </MasterLayout>
    </>


    )
}

export default Video