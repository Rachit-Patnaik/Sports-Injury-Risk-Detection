import { useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function Upload() {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleChooseFile = () => {
    inputRef.current.click();
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      alert("Please select a video first.");
      return;
    }

    alert(`Selected Video: ${selectedFile.name}`);

    // Backend integration will be added later.
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Card sx={{ width: 700 }}>
        <CardContent sx={{ p: 5 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
          >
            Upload Athlete Video
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Upload a video to analyze injury risk using AI.
          </Typography>

          <Box
            sx={{
              border: "2px dashed #1976d2",
              borderRadius: 3,
              p: 6,
              textAlign: "center",
              bgcolor: "#f8fbff",
            }}
          >
            <CloudUploadIcon
              sx={{
                fontSize: 70,
                color: "primary.main",
                mb: 2,
              }}
            />

            <Typography variant="h6">
              Drag & Drop Video Here
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ my: 2 }}
            >
              or
            </Typography>

            <Button
              variant="contained"
              onClick={handleChooseFile}
            >
              Choose Video
            </Button>

            <input
              ref={inputRef}
              type="file"
              hidden
              accept="video/*"
              onChange={handleFileChange}
            />
          </Box>

          {selectedFile && (
            <Typography
              sx={{ mt: 3 }}
              fontWeight={600}
            >
              Selected File: {selectedFile.name}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 4 }}
            onClick={handleAnalyze}
          >
            Analyze Video
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}