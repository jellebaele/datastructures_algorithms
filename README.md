# Typescript Template
Typescript template including ES linting, prettier & husky. You can fork/import/copy this project in your repository.

## Copy
You can copy the project by running following commands in your project directory:
```bash
$ git clone --depth 1 https://github.com/jellebaele/Typescript-Template.git
$ mv .\Typescript-Template\* .
$ rmdir -Force .\Typescript-Template\
```
## Get started
To get started, simply run the following commands:

1. Install packages
```bash
$ npm install
```
2. Initialize husky
```bash
$ npx init husky
```
3. Start app for development with *ts-node* and *nodemon* (starts watching changes to .ts and .js files located within */src*-folder)
```bash
$ npm run start:dev
```
4. Create production builds
```bash
$ npm run build
```
5. Start in production
```bash
$ npm run start
```
