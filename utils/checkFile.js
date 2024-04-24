import * as FileSystem from "expo-file-system";

export default async function checkFile(uri) {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    console.log("File Info:", fileInfo);

    if (fileInfo.exists) {
      console.log("File size:", fileInfo.size);
      if (fileInfo.size > 0) {
        // Optional: Read the file to ensure it's not corrupt
        const fileContents = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        console.log("File can be read");
      }
    } else {
      console.log("File does not exist");
    }
  } catch (error) {
    console.error("Error accessing file:", error);
  }
}
