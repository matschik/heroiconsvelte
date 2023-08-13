import pascalcase from 'pascalcase';
import fsx from 'fs-extra';
import { globby as glob } from 'globby';
import path from 'path';

const BASE_DIR = 'node_modules/heroicons/optimized';

const svgIconPaths = await glob([`${BASE_DIR}/**/*.svg`]);

const targetDir = 'src/lib';

await fsx.ensureDir(targetDir);
await fsx.remove(targetDir);
await fsx.ensureDir(targetDir);

const pkgJson = await fsx.readJson('package.json');

pkgJson.exports = {};

for (const svgIconPath of svgIconPaths) {
	let svgIconContent = await fsx.readFile(svgIconPath, 'utf8');
	svgIconContent = svgIconContent.replace('<svg ', `<svg {...$$$$props} `);

	const parsedPath = path.parse(svgIconPath);
	const srcPath = parsedPath.dir.replace(BASE_DIR, '');
	const dirPath = path.join(targetDir, srcPath);
	const componentName = `${pascalcase(parsedPath.name)}Icon`;
	const componentFilename = `${componentName}.svelte`;
	const filePath = path.join(dirPath, componentFilename);

	await fsx.ensureDir(dirPath);
	await fsx.writeFile(filePath, svgIconContent);

	const indexFilePath = path.join(dirPath, 'index.js');
	const indexFileContent = `export { default as ${pascalcase(
		parsedPath.name
	)}Icon } from './${componentFilename}';\n`;
	await fsx.ensureFile(indexFilePath);
	await fsx.appendFile(indexFilePath, indexFileContent);

	const indexPathFromSrc = `.${srcPath}/index.js`;

	pkgJson.exports[indexPathFromSrc] = {
		types: `./dist${srcPath}/index.d.ts`,
		svelte: `./dist${srcPath}/index.js`
	};

	const exportKey = `.${srcPath}/${componentFilename}`;
	const sveltePath = `./dist${srcPath}/${componentFilename}`;
	const typesPaths = sveltePath + '.d.ts';
	pkgJson.exports[exportKey] = {
		types: typesPaths,
		svelte: sveltePath
	};
}

await fsx.writeFile('package.json', JSON.stringify(pkgJson, null, '\t'));
