import he from "he";

export default function stripHtmlTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();
  let strippedString = str.replace(/<[^>]*>/g, "");
  return he.decode(strippedString);
}
