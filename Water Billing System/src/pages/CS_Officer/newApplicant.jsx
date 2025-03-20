import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import { Card } from "react-bootstrap";
import ApplicantTBL from "../../components/applicantTbl.jsx";

const NewConnection = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("type");
  const usertype = token;

  // State for counts, loading, and error handling
  const [applicantStat, setStats] = useState({
    New: 0,
    For_Inspection: 0,
    For_Installation: 0,
    Installed: 0,
  });

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(`${backend}/csofficer/getApplicants`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        });

        if (!response.ok) {
          toast.error("Error Applicant counts");
        } else {
          const data = await response.json();
          setStats(data); // Update state with the response data
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
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
          <h1 className="h2">Manage Applicants</h1>
        </div>
        {usertype === "CS_Officer" && (
          <div className="row g-3">
            <div className="col-md-3">
              <Card className="shadow-sm border-1 h-100">
                <Card.Body className="pb-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-hourglass-split fs-3 text-warning me-2"></i>
                    <div>
                      <h6 className="fw-semibold mb-0 fs-6">New Applicants</h6>
                      <p className="text-muted mb-0 fs-6">Waiting for review</p>
                    </div>
                  </div>
                  <h4 className="fw-bold text-end mt-3">{applicantStat.New}</h4>
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
                      <h6 className="fw-semibold mb-0 fs-6">For Inspection</h6>
                      <p className="text-muted mb-0 fs-6">
                        Ready for inspection
                      </p>
                    </div>
                  </div>
                  <h4 className="fw-bold text-end mt-3">
                    {applicantStat.For_Inspection}
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
                      <h6 className="fw-semibold mb-0 fs-6">For Inspection</h6>
                      <p className="text-muted mb-0 fs-6">Work in progress</p>
                    </div>
                  </div>
                  <h4 className="fw-bold text-end mt-3">
                    {applicantStat.For_Installation}
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
                    {applicantStat.Installed}
                  </h4>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
        <ApplicantTBL />
      </main>
    </div>
  );
};

export default NewConnection;
