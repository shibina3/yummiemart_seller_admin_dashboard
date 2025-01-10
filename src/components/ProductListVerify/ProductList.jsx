import React, { useState } from 'react';

const ProductVerify = ({products}) => {
  const [expandedAccordionIndex, setExpandedAccordionIndex] = useState(null);
  const [productStatuses, setProductStatuses] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [currentRejectIndex, setCurrentRejectIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedAccordionIndex(index === expandedAccordionIndex ? null : index);
  };

  const handleAccept = (index) => {
    setProductStatuses((prevState) => ({
      ...prevState,
      [index]: true,
    }));
  };

  const handleRejectClick = (index) => {
    setCurrentRejectIndex(index);
    setShowPopup(true);
  };

  const handleRejectConfirm = () => {
    if (rejectionReason.trim()) {
      setProductStatuses((prevState) => ({
        ...prevState,
        [currentRejectIndex]: false,
      }));
      setShowPopup(false);
      setRejectionReason('');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setRejectionReason('');
  };

  return (
    <div style={styles.container}>
      {products.length > 0 ? (
        products.map((product, index) => (
          <div key={index} style={styles.section}>
            <div style={styles.header} onClick={() => toggleAccordion(index)}>
              <span style={styles.headerText}>{product.name}</span>
            </div>
            {expandedAccordionIndex === index && (
              <div style={styles.content}>
                <div style={styles.card}>
                  <img src={product.image_url} alt={product.name} style={styles.image} />
                  <div style={styles.cardDetails}>
                    <div><strong>Address:</strong> {product.address}</div>
                    <div><strong>Rating:</strong> {product.rating}</div>
                    <div><strong>Reviews:</strong> {product.reviews}</div>
                    <div style={styles.buttonContainer}>
                      <button
                        style={{
                          ...styles.button,
                          backgroundColor: productStatuses[index] === true ? 'gray' : 'green',
                          cursor: productStatuses[index] === true ? 'not-allowed' : 'pointer',
                        }}
                        onClick={() => handleAccept(index)}
                        disabled={productStatuses[index] === true}
                      >
                        Accept
                      </button>
                      <button
                        style={{
                          ...styles.button,
                          backgroundColor: productStatuses[index] === false ? 'gray' : 'red',
                          cursor: productStatuses[index] === false ? 'not-allowed' : 'pointer',
                        }}
                        onClick={() => handleRejectClick(index)}
                        disabled={productStatuses[index] === false}
                      >
                        Reject
                      </button>
                    </div>
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                      {productStatuses[index] === true && (
                        <span style={{ color: 'green', fontWeight: 'bold' }}>Accepted</span>
                      )}
                      {productStatuses[index] === false && (
                        <span style={{ color: 'red', fontWeight: 'bold' }}>Rejected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No products to verify</div>
      )}

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3 style={styles.popupTitle}>Reason for Rejection</h3>
            <input
              type="text"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason"
              style={styles.input}
            />
            <div style={styles.popupButtonContainer}>
              <button style={styles.popupButton} onClick={handleRejectConfirm} disabled={!rejectionReason.trim()}>
                Submit
              </button>
              <button style={styles.popupButtonCancel} onClick={closePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
  content: {
    padding: '16px',
    backgroundColor: '#f9f9f9',
  },
  card: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '8px',
  },
  cardDetails: {
    flex: 1,
  },
  buttonContainer: {
    display: 'flex',
   gap: '10px',
    marginTop: '10px',
  },
  button: {
    border: 'none',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
  },
  popupTitle: {
    marginBottom: '16px',
  },
  input: {
    width: "370px",
    padding: '10px',
    marginBottom: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  popupButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  popupButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  popupButtonCancel: {
    backgroundColor: 'gray',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ProductVerify;
