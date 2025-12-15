import {API_URL, findTokenInfo, getHealthInfo} from "../services/apiService.js";
import {useEffect, useState} from "react";

const HealthStatus = () => {
    const [healthInfo, setHealthInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHealthData = async () => {
            try {
                const result = await getHealthInfo();
                setHealthInfo(result);
            } catch (err) {
                setError(err);
                clearInterval(intervalId);
            }
        };

        fetchHealthData();
        const intervalId = setInterval(fetchHealthData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    if (!healthInfo && !error) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <div className="container alert alert-danger mt-3" role="alert">
                {error.message}
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-7">
                    <h5 className="text-center">Backend Health Status</h5>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>Status:</strong>
                            <span className={`badge bg-${healthInfo.status === 'Ok' ? 'success' : 'danger'}`}>
                                {healthInfo.status}
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>API</strong>
                            <span>
                                <a href={`${API_URL}/swagger`} target="_blank">{API_URL}</a>
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>Environment:</strong>
                            <span>{healthInfo.environment}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>Configuration:</strong>
                            <span>{healthInfo.configuration}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>Uptime:</strong>
                            <span>{healthInfo.uptime}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>Start Time:</strong>
                            <span>{healthInfo.startTime}</span>
                        </li>
                    </ul>
                </div>
                <div className="col-md-5">
                    <h5 className="text-center">Database Status</h5>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>Status:</strong>
                            <span className={`badge bg-${healthInfo.database.isRunning ? 'success' : 'danger'}`}>
                                {healthInfo.database.isRunning ? "Running" : "Not running"}
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>Server:</strong> {healthInfo.database.server}
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>Version:</strong> {healthInfo.database.version}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HealthStatus;