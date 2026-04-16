import { rm } from "node:fs/promises";
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
