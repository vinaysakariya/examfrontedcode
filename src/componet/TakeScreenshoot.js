import React, { useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";

const ScreenshotComponent = () => {
  const takeScreenshotAndSend = async () => {
    try {
      // Take screenshot
      const canvas = await html2canvas(document.body);
      const imgData = canvas.toDataURL("image/png");

      // Convert base64 to blob
      const blob = await (await fetch(imgData)).blob();
      const file = new File([blob], "screenshot.png", { type: "image/png" });

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", file);

      // Send screenshot to API
      await axios.post("http://localhost:3000/ssupload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Screenshot taken and sent successfully.");
    } catch (error) {
      console.error("Error taking screenshot and sending:", error);
    }
  };

  useEffect(() => {
    // Take initial screenshot
    takeScreenshotAndSend();

    // Schedule to take screenshots every 2 minutes (120000 ms)
    const interval = setInterval(() => {
      takeScreenshotAndSend();
    }, 120000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return <div>Your content here</div>;
};

export default ScreenshotComponent;
