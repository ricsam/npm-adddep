#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);

let dependencyName = 'dependencies';

const deps = [];

args.forEach(dep => {

	if (dep.indexOf('-D') !== -1) {
		dependencyName = 'devDependencies';
		return;
	}

	const [name, version] = dep.split('@');
	deps.push({
		name,
		version
	});

}); 

const pkgPath = path.resolve(process.cwd(), 'package.json');
const rawPkg = fs.readFileSync(pkgPath)
const pkg = JSON.parse(rawPkg);

if (!pkg[dependencyName]) {
	pkg[dependencyName] = {};
}

deps.forEach(({name, version}) => {

	pkg[dependencyName][name] = version;

});

const pkgString = JSON.stringify(pkg, true, 2);

fs.writeFileSync(pkgPath, pkgString);
