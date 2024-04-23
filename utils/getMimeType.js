export default function getMimeType(uri) {
  // Extract the file extension
  let extension = uri.split(".").pop();
  // Convert the extension to lower case for comparison
  extension = extension.toLowerCase();

  let mimeType = "application/octet-stream"; // Default to a binary file type
  // Determine the MIME type
  switch (extension) {
    case "jpg":
    case "jpeg":
      mimeType = "image/jpeg";
      break;
    case "png":
      mimeType = "image/png";
      break;
  }
  return mimeType;
}
