import React, { useState, useEffect } from 'react';
import ToggleSwitch from '../Elements/ToggleSwitch';

const VerifySeller = () => {
  const [expandedAccordionIndex, setExpandedAccordionIndex] = useState(null);
  const [sellerData, setSellerData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [isToggled, setIsToggled] = useState(false);

    const toggleHandler = () => {
      setIsToggled(prevState => !prevState);
    };

  const toggleAccordion = (index) => {
    setExpandedAccordionIndex(index === expandedAccordionIndex ? null : index);
  };

 const handleAcceptApiCall = async (seller, index) => {
  try {
    const response = await fetch('http://localhost:4000/accept/seller', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile: seller.phone_number }),
    });
    const data = await response.json();
    if (data.success) {
      console.log('Seller accepted successfully');
        }
  } catch (error) {
    console.error('Error: ', error);
  }
 };

  const handleReject = (index) => {
    setShowPopup(true)
  };

  const handleRejectConfirm = async () => {
 const mobile = localStorage.getItem("mobile");
    try{
    const response = await fetch('http://localhost:4000/reject/seller', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile: mobile, comments: rejectionReason }),
    });
    const data = await response.json();
    if (data.success) {
      setShowPopup(false);
      setRejectionReason("");
    }
 } catch (error) {
    console.error('Error: ', error); 
  }
  };

  const closePopup = () => {
    setShowPopup(false);
    setRejectionReason("");
  };

  const formatKey = (key) => {
    return key
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letters
  };

  const getSellerDetails = async () => {
    try {
      const response = await fetch("http://localhost:4000/get/submitted-sellers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSellerData(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => { getSellerDetails(); }, []);

  return <>
  <ToggleSwitch isToggled={isToggled} toggleHandler={toggleHandler}/>
{
  isToggled ? (
    <div style={styles.container}>
    {sellerData.length > 0 ? sellerData.map((seller, index) => (
      <div key={index} style={styles.section}>
        <div style={styles.header} onClick={() => toggleAccordion(index)}>
          <span style={styles.headerText}>{seller.name || 'Company Name'}</span>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>

<button
style={{
  ...styles.iconButton,
  color: 'green',
  fontWeight: 500,
  fontSize : '16px',
}}
>
Verified Seller
</button>

          </div>
        </div>

        {expandedAccordionIndex === index && (
          <div style={styles.content}>
            {Object.entries(seller).map(([key, value]) => {
              // Show certificates conditionally based on `seller_type`
              if (
                (key === 'dealer_cert_url' && seller.seller_type !== 'dealer') ||
                (key === 'distributor_cert_url' && seller.seller_type !== 'distributor')
              ) {
                return null;
              }

              return (
                <div key={key} style={styles.fieldContainer}>
                  <div style={styles.fieldKey}>{formatKey(key)}</div>
                  <div style={styles.fieldValue}>{ value === true ? 'true' : value === false ? 'false' : value}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    )) : 
    <div>No sellers to verify</div>
    }
  </div>
  ) : (
    <div style={styles.container}>
    {sellerData.length > 0 ? sellerData.map((seller, index) => (
      <div key={index} style={styles.section}>
        <div style={styles.header} onClick={() => toggleAccordion(index)}>
          <span style={styles.headerText}>{seller.name || 'Company Name'}</span>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
<button
style={{
  ...styles.iconButton,
  color: 'red',
  cursor: 'pointer',
}}
onClick={(e) => {
  e.stopPropagation();
  handleReject(seller);
}}
>
Reject
</button>
<button
style={{
  ...styles.iconButton,
  color: 'green',
  cursor : 'pointer',
}}
onClick={(e) => {
  e.stopPropagation();
  handleAcceptApiCall(seller, index);
}}
>
Accept
</button>

          </div>
        </div>

        {expandedAccordionIndex === index && (
          <div style={styles.content}>
            {Object.entries(seller).map(([key, value]) => {
              // Show certificates conditionally based on `seller_type`
              if (
                (key === 'dealer_cert_url' && seller.seller_type !== 'dealer') ||
                (key === 'distributor_cert_url' && seller.seller_type !== 'distributor')
              ) {
                return null;
              }

              return (
                <div key={key} style={styles.fieldContainer}>
                  <div style={styles.fieldKey}>{formatKey(key)}</div>
                  <div style={styles.fieldValue}>{ value === true ? 'true' : value === false ? 'false' : value}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    )) : 
    <div>No sellers to verify</div>
    }

{showPopup && (
      <div className="popup-overlay">
        <div className="popup">
          <h3>Reason for Rejection</h3>
          <input
            type="text"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter reason"
            className="popup-input"
          />
          <div className="popup-actions">
            <button
              className="btn submit-btn"
              onClick={handleRejectConfirm}
              disabled={!rejectionReason.trim()}
            >
              Submit
            </button>
            <button className="btn cancel-btn" onClick={closePopup}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}
    </>
};

const styles = {
  container: {
    margin: '20px',
  },
  section: {
    marginBottom: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  header: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  headerText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    fontSize: '14px',
  },
  content: {
    padding: '16px',
    backgroundColor: '#f9f9f9',
    height: '460px',
    overflowY: 'scroll',
  },
  fieldContainer: {
    marginBottom: '12px',
  },
  fieldKey: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
  },
  fieldValue: {
    fontSize: '14px',
    color: '#777',
  },
};

export default VerifySeller;
