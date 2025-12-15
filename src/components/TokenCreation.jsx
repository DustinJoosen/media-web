import { useState } from "react";
import {createToken, uploadFile} from "../services/apiService.js";

const TokenCreation = () => {
    const [name, setName] = useState("");
    const [expiresAt, setExpiresAt] = useState("");
    const [generatedToken, setGeneratedToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        setIsLoading(true);
        setError(null);
        setGeneratedToken(null);

        try {
            setIsLoading(true);
            let result = await createToken(name, expiresAt);
            setGeneratedToken(result.token);
        } catch (err) {
            if (err.statusCode === 409) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card shadow-sm h-100">
            <div className="card-body">
                <h5 className="card-title mb-3">Create Token</h5>
                {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="token-name" className="form-label">Token Name</label>
                        <input type="text" className="form-control" placeholder="API Auth Key for my frontend"
                               id="token-name" value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="token-expiration" className="form-label">Expires At (optional)</label>
                        <input type="date" className="form-control" id="token-expiration" value={expiresAt}
                            onChange={(e) => setExpiresAt(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn text-white p-3"
                            disabled={name === "" || isLoading}
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
                        {isLoading ? "Creating..." : "Submit"}
                    </button>
                    <hr className="mt-4" />
                    <div className="mt-4">
                        <label className="form-label">Generated Token</label><br/>
                        <div className="input-group">
                            <input type="text" className="form-control" value={generatedToken ?? ""}                                disabled
                                placeholder="Generated token will appear here" />
                            <button className="btn btn-outline-secondary" type="button" disabled={generatedToken === ""}
                                onClick={() => navigator.clipboard.writeText(generatedToken) }>
                                <i className="bi bi-clipboard"></i>
                            </button>
                        </div>
                        {generatedToken && (
                            <sup className="m-2">Be sure to safe this token! You can't see it again!</sup>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TokenCreation;
