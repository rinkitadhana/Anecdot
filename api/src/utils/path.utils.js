import path from "path"
import { fileURLToPath } from "url"

// Get __dirname equivalent in ESM
const getDirname = (importMetaUrl) => {
  const __filename = fileURLToPath(importMetaUrl)
  return path.dirname(__filename)
}

export default getDirname
