import React, { useState, useEffect } from 'react';

const VerifySeller = () => {
  const [expandedAccordionIndex, setExpandedAccordionIndex] = useState(null);
  const [acceptedSellers, setAcceptedSellers] = useState({});
  const [sellerData, setSellerData] = useState([]);

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
      handleAccept(index);
    }
  } catch (error) {
    console.error('Error: ', error);
  }
 };

  const handleAccept = (index) => {
    setAcceptedSellers((prevState) => ({
      ...prevState,
      [index]: true,
    }));
  };

  const handleReject = (index) => {
    setAcceptedSellers((prevState) => ({
      ...prevState,
      [index]: false,
    }));
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

  return (
    <div style={styles.container}>
      {sellerData.length > 0 ? sellerData.map((seller, index) => (
        <div key={index} style={styles.section}>
          <div style={styles.header} onClick={() => toggleAccordion(index)}>
            <span style={styles.headerText}>{seller.name || 'Company Name'}</span>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
{
  acceptedSellers[index] === true ? <button
  style={{
    ...styles.iconButton,
    color: 'red',
    cursor: acceptedSellers[index] === false ? 'not-allowed' : 'pointer',
  }}
  onClick={(e) => {
    e.stopPropagation();
    handleReject(seller);
  }}
>
  Reject
</button>
:
<button
  style={{
    ...styles.iconButton,
    color: 'green',
    cursor: acceptedSellers[index] === true ? 'not-allowed' : 'pointer',
  }}
  onClick={(e) => {
    e.stopPropagation();
    handleAcceptApiCall(seller, index);
  }}
>
  Accept
</button>
}
            </div>
          </div>

            <div
              style={{
                color: 'white',
                textAlign: 'center',
                backgroundColor: acceptedSellers[index] === true ? 'green' : 'red',
                padding: '5px',
              }}
            >
              {acceptedSellers[index] === true ? 'Seller Accepted' : 'Seller Rejected'}
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
  );
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
