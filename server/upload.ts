import { Request, Response } from "express";
import fs from "fs";
import path from "path";

// Simple file upload handler that saves files to a public directory
export const handleFileUpload = (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.file) {
      return res.status(400).json({ success: false, message: "No file provided" });
    }

    const { file, filename } = req.body;
    
    // Validate file type (only images)
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.some(type => file.startsWith(`data:${type}`))) {
      return res.status(400).json({ success: false, message: "Invalid file type. Only images are allowed." });
    }

    // Extract base64 data
    const matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, message: "Invalid file format" });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const extension = mimeType.split('/')[1];
    
    // Generate unique filename
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}_${filename || `upload.${extension}`}`;
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save file
    const filePath = path.join(uploadsDir, uniqueFilename);
    fs.writeFileSync(filePath, base64Data, 'base64');

    // Return the URL that can be used to access the file
    const fileUrl = `/uploads/${uniqueFilename}`;
    
    res.json({ 
      success: true, 
      data: { 
        url: fileUrl,
        filename: uniqueFilename 
      } 
    });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ success: false, message: "Failed to upload file" });
  }
};