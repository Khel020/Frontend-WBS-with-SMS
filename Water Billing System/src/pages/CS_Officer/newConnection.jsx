import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import { Card } from "react-bootstrap";
import ConnectioTBL from "../../components/connectionTbl.jsx";

const NewConnection = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  // State for counts, loading, and error handling
  const [counts, setCounts] = useState({
    totalPending: 0,
    totalApproved: 0,
    totalInstalling: 0,
    totalInstalled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientCounts = async () => {
      try {
        const response = await fetch(`${backend}/csofficer/totalapplicants`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCounts(data);
      } catch (err) {
        setError("Failed to fetch client counts");
      } finally {
        setLoading(false);
      }
    };

    fetchClientCounts();
  }, []);

  return (
    <div
      className="d-flex flex-column flex-md-row"
      style={{
        backgroundColor: "white",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded">
          <h1 className="h2">New Service Connection</h1>
        </div>

        {loading ? (
          <p>Loading client data...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div className="row g-3">
            {/* Pending Applications */}
            <div className="col-md-3">
              <Card className="shadow-sm border-1 h-100">
                <Card.Body className="pb-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-hourglass-split fs-3 text-warning me-2"></i>
                    <div>
                      <h6 className="fw-semibold mb-0 fs-6">
                        Pending Applications
                      </h6>
                      <p className="text-muted mb-0 fs-6">Waiting for review</p>
                    </div>
                  </div>
                  <h4 className="fw-bold text-end mt-3">
                    {counts.totalPending}
                  </h4>
                </Card.Body>
              </Card>
            </div>

            {/* Approved Applications */}
            <div className="col-md-3">
              <Card className="shadow-sm border-1 h-100">
                <Card.Body className="pb-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle fs-3 text-success me-2"></i>
                    <div>
                      <h6 className="fw-semibold mb-0 fs-6">
                        Approved Applications
                      </h6>
                      <p className="text-muted mb-0 fs-6">
                        Ready for installation
                      </p>
                    </div>
                  </div>
                  <h4 className="fw-bold text-end mt-3">
                    {counts.totalApproved}
                  </h4>
                </Card.Body>
              </Card>
            </div>

            {/* Ongoing Installations */}
            <div className="col-md-3">
              <Card className="shadow-sm border-1 h-100">
                <Card.Body className="pb-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-tools fs-3 text-primary me-2"></i>
                    <div>
                      <h6 className="fw-semibold mb-0 fs-6">
                        Ongoing Installations
                      </h6>
                      <p className="text-muted mb-0 fs-6">Work in progress</p>
                    </div>
                  </div>
                  <h4 className="fw-bold text-end mt-3">
                    {counts.totalInstalling}
                  </h4>
                </Card.Body>
              </Card>
            </div>

            {/* Completed Installations */}
            <div className="col-md-3">
              <Card className="shadow-sm border-1 h-100">
                <Card.Body className="pb-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-house-check fs-3 text-info me-2"></i>
                    <div>
                      <h6 className="fw-semibold mb-0 fs-6">
                        Completed Installations
                      </h6>
                      <p className="text-muted mb-0 fs-6">
                        Successfully installed
                      </p>
                    </div>
                  </div>
                  <h4 className="fw-bold text-end mt-3">
                    {counts.totalInstalled}
                  </h4>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
        <ConnectioTBL />
      </main>
    </div>
  );
};

export default NewConnection;
