
/* 
bun run compile.js
*/

import { minify } from "terser";
import { readFile, writeFile } from "node:fs/promises";

let original = await readFile("./main.js", { encoding: "utf-8" });

const globalTSFile = await readFile("./global.d.ts", { encoding: "utf-8" });

const validVariableNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_";

const /** @type {Record<string, string>} */ fixedNamesMap = {
	infoElement: "I",
	canvas: "C",
	pointerdownX: "x",
	pointerdownY: "y",
};

{
	let currentNameIndex = 0;
	let /** @type {Set<string>} */ alreadyRenamed = new Set();
	for (const { groups: { name } } of globalTSFile.matchAll(/\bdeclare (?:const|var) (?<name>\w+)\:/g)) {
		if (alreadyRenamed.has(name)) continue;
		let newName = fixedNamesMap[name];
		if (!newName) {
			while (
				Object.values(fixedNamesMap).includes(validVariableNameCharacters[currentNameIndex])
			) {
				++currentNameIndex;
			}
			newName = validVariableNameCharacters[currentNameIndex];
			++currentNameIndex;
		}
		alreadyRenamed.add(name);
		// console.log(name, newName);
		original = original.replaceAll(new RegExp(`\\b${name}\\b`, "g"), newName);
	}
}

let minified = (await minify(original, {
	module: true,
	compress: {
		passes: 3,
		unsafe_math: true,
	},
	format: {
		wrap_func_args: false,
		wrap_iife: false,
	},
	mangle: {
		// reserved: ["x", "y"],
	},
	ecma: 2020,
})).code;

// minified = minified.slice(minified.indexOf("=") - 1);

minified = minified
	.replace(/(,\w=0)+;$/, "")
	.replaceAll("(/*!REMOVE_PREV*/", "")
	.replaceAll("/*!REMOVE_NEXT*/)", "");

const html = `<body style=touch-action:none onload='${minified.replaceAll("'", "&#39;")
	}'><input id=I><br><canvas id=C width=800 height=300>`;

console.log(`Current total HTML code length: ${html.length}.`);

await writeFile("./index.html", html, { encoding: "utf-8" });
