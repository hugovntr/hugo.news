const fs = require("fs");
const { spawn } = require("node:child_process");

const GIT_MODULES = ".gitmodules";

if (fs.existsSync(GIT_MODULES)) return;

fs.writeFileSync(
    GIT_MODULES,
    `[submodule "web/content"]\n\tpath = web/content\n\turl = ${process.env.CMS_MODULE_URL}\n`
);

const submodule = spawn("git", [
    "submodule",
    "add",
    "-f",
    process.env.CMS_MODULE_URL,
    "web/content",
]);

submodule.stdout.on("data", console.log);
submodule.stderr.on("data", console.error);
submodule.on("close", (code) =>
    console.log(`Submodule child process exited with code ${code}`)
);
