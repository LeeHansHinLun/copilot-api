import { access, cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import * as esbuild from "esbuild-wasm";
import ts from "typescript";

await rm("dist", { recursive: true, force: true });

const args = new Set(process.argv.slice(2));

const isDev = args.has("--development");
const isProd = args.has("--production");

const minify = isProd;
const sourcemap = args.has("--sourcemap") || isDev;

await esbuild.initialize({ worker: false });

await esbuild.build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    format: "esm",
    platform: "neutral",
    outfile: "dist/index.js",
    minify,
    sourcemap,
});

const configPath = ts.findConfigFile("./", ts.sys.fileExists, "tsconfig.json");
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, "./");

const program = ts.createProgram({
    rootNames: parsed.fileNames,
    options: {
        ...parsed.options,
        emitDeclarationOnly: true,
        declaration: true,
        outDir: "dist",
        declarationMap: false,
    },
});
program.emit();

const publish = args.has("--publish");
const root = process.cwd();
const targetDir = path.join(root, "published");

const items = ["dist", "src", "build.mjs", "package.json", "tsconfig.json"];

async function exists(p) {
    try {
        await access(p);
        return true;
    } catch {
        return false;
    }
}

async function doPublish() {
    await mkdir(targetDir, { recursive: true });

    for (const item of items) {
        const srcPath = path.join(root, item);
        const destPath = path.join(targetDir, item);

        if (await exists(destPath)) {
            await rm(destPath, { recursive: true, force: true });
        }

        if (await exists(srcPath)) {
            await cp(srcPath, destPath, { recursive: true });
        }
    }
}

if (publish)
    doPublish().catch((err) => {
        console.error(err);
        process.exit(1);
    });
