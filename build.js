#!/usr/bin/env zx
import pascalcase from 'pascalcase';

const BASE_DIR = 'node_modules/heroicons/optimized';

const svgIconPaths = await glob([`${BASE_DIR}/**/*.svg`]);

const targetDir = 'src/lib';

await fs.ensureDir(targetDir);
await fs.remove(targetDir);
await fs.ensureDir(targetDir);

const pkgJson = await fs.readJson('package.json');

pkgJson.svelte = [];

for (const svgIconPath of svgIconPaths) {
	let svgIconContent = await fs.readFile(svgIconPath, 'utf8');
	svgIconContent = svgIconContent.replace('<svg ', `<svg {...$$$$props} `);

	const parsedPath = path.parse(svgIconPath);
	const srcPath = parsedPath.dir.replace(BASE_DIR, '');
	const dirPath = path.join(targetDir, srcPath);
	const componentName = `${pascalcase(parsedPath.name)}Icon`;
	const componentFilename = `${componentName}.svelte`;
	const filePath = path.join(dirPath, componentFilename);

	await fs.ensureDir(dirPath);
	await fs.writeFile(filePath, svgIconContent);

	const indexFilePath = path.join(dirPath, 'index.js');
	const indexFileContent = `export { default as ${pascalcase(
		parsedPath.name
	)}Icon } from './${componentFilename}';\n`;
	await fs.ensureFile(indexFilePath);
	await fs.appendFile(indexFilePath, indexFileContent);

	const indexPathFromSrc = `.${srcPath}/index.js`;
	if (!pkgJson.svelte.includes(indexPathFromSrc)) {
		pkgJson.svelte.push(indexPathFromSrc);
	}
}

await fs.writeFile('package.json', JSON.stringify(pkgJson, null, '\t'));
