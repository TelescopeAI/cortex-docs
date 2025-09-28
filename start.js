import * as fs from "fs";
import packageJson from "./.output/server/package.json" with { type: "json" };

packageJson.scripts = packageJson.scripts || {};
packageJson.scripts.start = "node index.mjs";

fs.writeFileSync(
  ".output/server/package.json",
  JSON.stringify(packageJson, null, 2)
);