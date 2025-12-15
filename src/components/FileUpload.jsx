import {useEffect, useState} from "react";


const FileUpload = ({onFileSelect}) => {
    const [_, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("")
    const [displayWarning, setDisplayWarning] = useState(false);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                return URL.revokeObjectURL(previewUrl);
            }
        }
    }, [previewUrl])

    const handleChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        if (uploadedFile && typeof onFileSelect === "function") {
            onFileSelect(uploadedFile);
        }

        // If the file is empty, empty everything.
        if (!uploadedFile) {
            setPreviewUrl(null);
            setDisplayWarning(false);
            return;
        }

        if (uploadedFile.type.startsWith("image")) {
            const url = URL.createObjectURL(uploadedFile);
            setPreviewUrl(url);
            setDisplayWarning(false);
        } else {
            setPreviewUrl(null);
            setDisplayWarning(true);
        }
    }

    return (
        <div className="mb-3">
            <input
                type="file"
                className="form-control"
                id="fileInput"
                onChange={handleChange}
            />

            {previewUrl && (
                <div className="mt-3">
                    <h6>Preview:</h6>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                </div>
            )}

            {displayWarning && (
                <div className="alert alert-warning mt-2">
                    Can't preview this file type.
                </div>
            )}

        </div>
    )
}

export default FileUpload;