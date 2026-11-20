
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "Online",
    app: "All Video Downloader",
    version: "1.0.0"
  });
});

app.post("/analyze", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "Video URL is required"
    });
  }

  try {
    const parsed = new URL(url);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Invalid protocol");
    }

    res.json({
      success: true,
      message: "URL received successfully",
      url: parsed.href,
      formats: ["MP4"]
    });
  } catch (error) {
    res.status(400).json({
      error: "Invalid video URL"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
