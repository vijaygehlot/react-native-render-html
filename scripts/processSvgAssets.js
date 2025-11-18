/**
 * SVGO v3 Compatible SVG Optimization Script
 * Replaces old extendDefaultPlugins() based version.
 */

const fs = require("fs");
const path = require("path");
const { optimize } = require("svgo");

const SVG_DIR = path.resolve(__dirname, "../assets/svg");
const OUTPUT_DIR = path.resolve(__dirname, "../assets/svg-optimized");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log("🔧 Running SVGO optimization (v3)...");

const optimizeSvgFile = (filePath, outputPath) => {
  const svgData = fs.readFileSync(filePath, "utf-8");

  const result = optimize(svgData, {
    path: filePath,
    multipass: true, // better optimization
    plugins: [
      // SVGO v3 default plugins
      "preset-default",

      // (optional) Add more plugins here
      // { name: "removeDimensions" },
      // { name: "convertStyleToAttrs" },
    ],
  });

  fs.writeFileSync(outputPath, result.data, "utf-8");
  console.log(`✔ Optimized: ${path.basename(filePath)}`);
};

const processDirectory = (dir, outDir) => {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const outputPath = path.join(outDir, item);

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
      }
      processDirectory(fullPath, outputPath);
    } else if (item.endsWith(".svg")) {
      optimizeSvgFile(fullPath, outputPath);
    }
  });
};

processDirectory(SVG_DIR, OUTPUT_DIR);

console.log("✨ SVG optimization completed successfully!");
