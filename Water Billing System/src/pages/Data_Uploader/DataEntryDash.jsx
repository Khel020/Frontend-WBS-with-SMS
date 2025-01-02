import React, { useState, useEffect } from "react";
import { FaFileUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DataTable from "react-data-table-component";
import { FaFileExport } from "react-icons/fa"; // Importing an icon for export button
import DatePicker from "react-datepicker";
import Sidebar from "../../components/sidebar";
const DataEntryDash = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const [uploadData, setUploadData] = useState(null);
  const [selectedZone, setSelectedZone] = useState("");
  const [uploadHistory, setUploadHistory] = useState([]);
  const [filteredData, setFilteredData] = useState(uploadHistory);
  const [statusLog, setStatusLog] = useState([]); // State to store log messages
  const [Zone, selectZone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const token = localStorage.getItem("type");
  const usertype = token;
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    // Filter data based on selected zone and date
    const filtered = uploadHistory.filter((item) => {
      const matchesZone = Zone ? item.zone === Zone : true;
      const matchesDate = selectedDate
        ? new Date(item.uploadDate).toDateString() ===
          selectedDate.toDateString()
        : true;
      return matchesZone && matchesDate;
    });
    setFilteredData(filtered);
  }, [Zone, selectedDate, uploadHistory]);

  const handleZoneHisto = (e) => {
    selectZone(e.target.value);
  };
  const handleDateHisto = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await fetch(`${backend}/dataentry/uploadHistory`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        });
        const data = await response.json();
        setUploadHistory(data);
      } catch (error) {
        console.error("Error fetching upload history:", error);
      }
    };

    // Fetch data once when the component mounts
    getStatus();
  }, [backend]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/json" || file.type === "text/csv")
    ) {
      setUploadData(file);
      setStatusLog((prevLog) => [...prevLog, "File selected successfully."]);
    } else {
      setStatusLog((prevLog) => [
        ...prevLog,
        "Error: Only JSON or CSV files are accepted.",
      ]);
      setUploadData(null);
    }
  };

  const handleZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };

  const handleUploadSubmit = async () => {
    if (!uploadData) {
      setStatusLog((prevLog) => [...prevLog, "Error: No file selected"]);
      return;
    }
    if (!selectedZone) {
      setStatusLog((prevLog) => [...prevLog, "Error: Please select a zone."]);
      return;
    }

    setStatusLog(["Starting upload process..."]);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);

        if (!Array.isArray(jsonData)) {
          throw new Error("Uploaded data must be an array.");
        }

        setStatusLog((prevLog) => [...prevLog, "File parsed successfully."]);

        const response = await fetch(`${backend}/dataentry/uploadBills`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
          body: JSON.stringify({ bills: jsonData, zone: selectedZone }),
        });

        if (response.ok) {
          const data = await response.json();
          setStatusLog((prevLog) => [
            ...prevLog,
            "Bills uploaded successfully.",
          ]);
        } else {
          const errorResponse = await response.json();
          setStatusLog((prevLog) => [
            ...prevLog,
            "Error uploading bills.",
            ...errorResponse.errors.map((error) => `Error: ${error}`),
          ]);
        }
      } catch (error) {
        setStatusLog((prevLog) => [
          ...prevLog,
          `Error parsing or uploading the bills: ${error.message}`,
        ]);
      }
    };

    reader.onerror = (error) => {
      setStatusLog((prevLog) => [
        ...prevLog,
        "File reading error: " + error.message,
      ]);
    };

    reader.readAsText(uploadData);
  };

  const columns = [
    { name: "Upload Date", selector: (row) => formatDate(row.date) },
    { name: "No. of Consumers", selector: (row) => row.consumers },
    { name: "Zone", selector: (row) => row.zone },
    {
      name: "Status",
      selector: (row) => (row.status === "success" ? "Success" : "Error"),
    },
    {
      name: "Action",
      selector: (row) => (
        <i
          className="bi bi-download"
          style={{ fontSize: "20px", cursor: "pointer" }}
          aria-label="Download"
          title="Download"
        ></i>
      ),
    },
  ];
  const customStyles = {
    table: {
      style: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "#1F702C",
        color: "white",
        fontSize: "12px",
      },
    },
    rows: {
      style: {
        minHeight: "45px",
        "&:hover": { backgroundColor: "#f1f1f1" },
      },
    },
    pagination: {
      style: {
        border: "none",
        fontSize: "14px",
        color: "#000",
        backgroundColor: "#f7f7f7",
        minHeight: "50px",
      },
    },
  };
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  const exportToExcel = () => {
    // Format the records for Excel export
    const formattedRecords = filteredRecords.map((record) => ({}));

    // Create a worksheet from the formatted records
    const worksheet = XLSX.utils.json_to_sheet(formattedRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Outstanding Balances");

    // Generate file name
    const fileName = `Outstanding_Balances_Report.xlsx`;

    // Write the workbook to a file
    XLSX.writeFile(workbook, fileName);
  };
  // Function to determine CSS class based on log message
  const getLogClass = (log) => {
    if (log.startsWith("Error:")) {
      return "text-danger"; // Red background for errors
    }
    if (log.includes("successfully")) {
      return " text-success";
    }
    return "text-light";
  };

  return (
    <div
      className="d-flex flex-column flex-md-row"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <Sidebar role={usertype} />
      <main
        className="flex-grow-1 px-md-4 py-4"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Container fluid>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom rounded">
            <h1 className="h2">Data Entry Dashboard</h1>
            <Dropdown align="end">
              <Dropdown.Toggle
                className="d-flex align-items-center bg-transparent border-0"
                id="dropdown-basic"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt=""
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Row>
            <Col md={6} lg={4}>
              <div className="p-4 bg-white shadow-sm rounded mb-4 h-100">
                <h4 className="mb-3 d-flex align-items-center text-primary">
                  <FaFileUpload className="me-2" />
                  Upload Billing Data
                </h4>

                <Form.Group controlId="zoneSelector" className="mb-3">
                  <Form.Label>Select Zone</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedZone}
                    onChange={handleZoneChange}
                  >
                    <option value="">-- Select Zone --</option>
                    <option value="Zone 1">Zone 1</option>
                    <option value="Zone 2">Zone 2</option>
                    <option value="Zone 3">Zone 3</option>
                    <option value="Zone 4">Zone 4</option>
                    <option value="Zone 5">Zone 5</option>
                    <option value="Zone 6">Zone 6</option>
                    <option value="All Zones">All Zones</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-4">
                  <Form.Label>Select Bill File</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".json, .csv"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleUploadSubmit}
                  className="w-100 mb-3"
                >
                  <FaFileUpload className="me-2" />
                  Upload File
                </Button>

                <div
                  className="mt-3 p-2 rounded bg-dark"
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    height: "200px",
                  }}
                >
                  <h6 className="text-white">Upload Status..</h6>
                  {statusLog.map((log, index) => (
                    <div key={index} className={`p-1 ${getLogClass(log)}`}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            <Col md={6} lg={8} className="bg-white shadow-sm rounded">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
                <h4 className="text-primary mb-3">Upload History</h4>
              </div>

              <div className="d-flex mb-4">
                <select
                  value={Zone}
                  onChange={handleZoneHisto}
                  className="form-select me-2"
                  style={{ width: "160px" }}
                >
                  <option value="">-- Select Zone --</option>
                  <option value="Zone 1">Zone 1</option>
                  <option value="Zone 2">Zone 2</option>
                  <option value="Zone 3">Zone 3</option>
                  <option value="Zone 4">Zone 4</option>
                  <option value="Zone 5">Zone 5</option>
                  <option value="Zone 6">Zone 6</option>
                </select>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateHisto}
                  placeholderText="Select Date"
                  className="form-control me-2"
                />
              </div>

              <DataTable
                columns={columns}
                data={uploadHistory}
                customStyles={customStyles}
                pagination
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default DataEntryDash;
