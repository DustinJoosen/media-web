import {useState} from "react";
import FileUpload from "../components/FileUpload.jsx";
import {uploadFile} from "../services/apiService.js";
import {useNavigate} from "react-router-dom";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [apiKey, setApiKey] = useState("H1Ai6l0uY7r74udLCK0Cf6/ieLSJwsAIzDfGTFBtuNyVTlbLX3tN/G9D+yrIQcb5hvPIrKOTxPwgVHZGqg464g==");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) return alert("Please select a file.");
        if (!apiKey) return alert("Please enter an api key");

        setIsLoading(true);

        try {
            await uploadFile(file, title, description, apiKey);
            navigate("/");
        } catch (err) {
            if (err.statusCode === 404 || err.statusCode === 401) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div className="container my-4">
            <div className="card shadow-sm h-100">
                <div className="card-body">
                    <h5 className="mb-4">Upload a Media File</h5>
                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="w-75">
                        <div className="mb-3">
                            <label htmlFor="apiKeyInput" className="form-label">API Auth Key</label>
                            <input type="text" id="apiKeyInput" className="form-control" value={apiKey}
                                   placeholder="H1Ai ... 464g==" onChange={(e) => setApiKey(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">File title (optional)</label>
                            <input type="text" id="title" className="form-control" value={title}
                                   placeholder="Food picture" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description (optional)</label>
                            <textarea className="form-control" id="description" placeholder="A nice picture of the food I just ate"
                                      rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <FileUpload onFileSelect={handleFileSelect} />
                        <button type="submit" className="btn text-white p-3"
                                disabled={file == null || apiKey === "" || isLoading}
                                style={{
                                    background: "linear-gradient(to right, #ff7171, #F1AE4A)",
                                    boxShadow: "2px 1px 10px gray",
                                    border: "none",
                                    fontWeight: "bold",
                                }}>
                            {isLoading && (
                                <div className="spinner-border mx-2" style={{
                                    width: "20px",
                                    height: "20px",
                                }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            )}
                            {isLoading ? "Uploading..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Upload;