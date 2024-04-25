export default function getFileNameFromUri(uri) {
  if (!uri) return null;

  // Extract the last segment of the URI after the last '/'
  const segments = uri.split("/");
  // The file name will be the last segment in the array
  const fileName = segments.pop();

  return fileName;
}
