import axios from "axios";
import { useEffect, useState } from "react";
import "../../ProjCss/AdminCss/Refund.css"
import { useNavigate } from "react-router-dom";
function Refund(){
    const [refunds,setRefunds] = useState([])
    const navigate = useNavigate();
     const [popup, setPopup] = useState({ visible: false, message: '', type: '' });
    const handleRefund= async (id) => {
        try {
            const response = await axios.post(
              `https://192.168.115.161:7101/sendrefund/${id}`,
              null, // body is null because the endpoint takes only bookingId in the URL
              {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                  'Content-Type': 'application/json'
                }
              }
            );
        
            if (response.status === 200) {
           
              setRefunds(prev => prev.filter(item => item.bookingId !== id));
            
              setPopup({ visible: true, message: '✅ Refund successfully!', type: 'success' });
              setTimeout(() => {
                  setPopup({ visible: false, message: '', type: '' });
                }, 4000);
            }
          } catch (err) {
            if(err.response.status === 401){
                navigate("/login")
            }
            console.error("Refund failed:", err);
            setPopup({ visible: true, message: '❌ Error in Refunding user', type: 'error' });
        setTimeout(() => {
          setPopup({ visible: false, message: '', type: '' });
        }, 4000);
        console.log(err)
          }
    }
   
    useEffect(() => {
        const getRefunds = async () => {
          try {
            const response = await axios.get("https://192.168.115.161:7101/getrefunds", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
              }
            });
            console.log(response.data);
            setRefunds(response.data);
          } catch (err) {
            console.log(err);
            if(err.response.status === 401){
                navigate("/login")
            }
          }
        };
    
        getRefunds(); // Call the function once when component loads
      }, []);
    
    return(<>
        <div className="container" style={{marginTop:"150px"}}>
        {popup.visible && (
  <div className="center-popup">
    <div className={`popup-card text-center shadow-lg ${popup.type}`}>
      {popup.message}
    </div>
  </div>
)}
            <div className="row" style={{padding:"20px"}}>
                <div className="col">
                        <h2 style={{textAlign:"center",border:"none",boxShadow:"0px 0px 10px rgba(0,0,0,0.2)",width:"400px",marginLeft:"400px",padding:"20px",borderRadius:"20px"}}> REFUND REQUEST</h2>
                </div>
            </div>
        </div>
        <div className="container mt-4">
      <h4 className="mb-3">Refund Details</h4>
      <div className="row">
        {refunds.map((item) => (
          <div key={item.bookingId} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Booking ID: {item.bookingId}</h5>
                <p className="card-text mb-1"><strong>Refund ID:</strong> {item.refundId}</p>
                <p className="card-text mb-1"><strong>Amount:</strong> ₹{item.refundAmount}</p>
                <p className="card-text mb-3 text-warning"><strong>Status:</strong> {item.refundStatus}</p>
                <button
                //   className="btn btn-success btn-sm w-50 rounded mt-auto"
                    id="refundbtn"
                  onClick={() => handleRefund(item.bookingId)}
                >
                  Refund Amount
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {refunds.length === 0 && (
        <div className="alert alert-info text-center">No refund data available.</div>
      )}
    </div>
    </>)
}

export default Refund;