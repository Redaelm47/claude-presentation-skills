// Resolve a Chromium executable: $CHROMIUM_PATH, Claude Code remote env, or playwright default.
const fs = require('fs');
module.exports = function chromiumPath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const glob = '/opt/pw-browsers';
  if (fs.existsSync(glob)) {
    for (const d of fs.readdirSync(glob)) {
      const p = `${glob}/${d}/chrome-linux/chrome`;
      if (d.startsWith('chromium-') && fs.existsSync(p)) return p;
    }
  }
  return undefined; // let playwright-core resolve (npx playwright install chromium)
};
