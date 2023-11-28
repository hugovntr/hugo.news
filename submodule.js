const fs = require("fs");

const GIT_MODULES = ".gitmodules";

if (fs.existsSync(GIT_MODULES)) return;

fs.writeFileSync(
    GIT_MODULES,
    `[submodule "web/content"]\n\tpath = web/content\n\turl = ${process.env.CMS_MODULE_URL}\n`
);
