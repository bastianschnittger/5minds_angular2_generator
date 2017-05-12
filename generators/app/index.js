"use strict"

const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.argument('generate', {type: String, required: true});
  }
  
  start() {
    switch (this.options.generate) {
      case 'module':
        this._modulePrompting();
        break;
      default:
        break;
    }
  }


  _modulePrompting() {
    return this.prompt([{
      type: 'input',
      name: 'moduleName',
      message: 'Type Modulname in Camelcase'
    }]).then((answer) => {
      const moduleFileName = this._generateFileNameForModule(answer.moduleName);
      const moduleName = answer.moduleName.replace(/-/g, '');
      this._createModule(moduleName, moduleFileName);
    });
  }

  _generateFileNameForModule(answer) {
    for(let i = 0; i < answer.length - 1; i++) {
      if(answer[i+1] == answer[i+1].toUpperCase()) {
        if(i != 0){
          answer = answer.substring(0, i+1) + answer[i+1].toLowerCase() + answer.substring(i+2, answer.length);
          answer = answer.substring(0, i+1) + '-' + answer.substring(i+1, answer.length);
        }
      }
    }
    answer = answer.toLowerCase();
    return answer;
  }

  _createServices(moduleName, moduleFileName, moduleCompName) {
    this.fs.copyTpl(
      this.templatePath('module/service.default.ts'),
      this.destinationPath(`${moduleFileName}/services/${moduleFileName}.service.default.ts`),
      {moduleName: moduleName, moduleFileName: moduleFileName, moduleCompName: moduleCompName}
    );
    this.fs.copyTpl(
      this.templatePath('module/service.interface.ts'),
      this.destinationPath(`${moduleFileName}/services/${moduleFileName}.service.interface.ts`),
      {moduleName: moduleName, moduleFileName: moduleFileName, moduleCompName: moduleCompName}
    );
  }

  _createRepository(moduleName, moduleFileName, moduleCompName) {
    this.fs.copyTpl(
      this.templatePath('module/repository.mock.ts'),
      this.destinationPath(`${moduleFileName}/repositories/${moduleFileName}.repository.mock.ts`),
      {moduleName: moduleName, moduleFileName: moduleFileName}
    );
    this.fs.copyTpl(
      this.templatePath('module/repository.interface.ts'),
      this.destinationPath(`${moduleFileName}/repositories/${moduleFileName}.repository.interface.ts`),
      {moduleName: moduleName, moduleFileName: moduleFileName}
    );
  }

  _createRouting(moduleName, moduleFileName, moduleCompName) {
    this.fs.copyTpl(
      this.templatePath('module/routing.module.ts'),
      this.destinationPath(`${moduleFileName}/${moduleFileName}-routing.module.ts`),
      {moduleName: moduleName, moduleFileName: moduleFileName}
    );
  }

  _createModule(moduleName, moduleFileName) {
    const moduleCompName = moduleName[0].toLowerCase() + moduleName.substring(1);
    this.fs.copyTpl(
      this.templatePath('module/component.ts'),
      this.destinationPath(`${moduleFileName}/${moduleFileName}.component.ts`),
      {moduleName: moduleName, moduleFileName: moduleFileName, moduleCompName: moduleCompName}
    );
    this.fs.copyTpl(
      this.templatePath('module/component.html'),
      this.destinationPath(`${moduleFileName}/${moduleFileName}.component.html`),
      {moduleName: moduleName}
    );
    this.fs.copyTpl(
      this.templatePath('module/component.css'),
      this.destinationPath(`${moduleFileName}/${moduleFileName}.component.css`)
    );
    this.fs.copyTpl(
      this.templatePath('module/module.ts'),
      this.destinationPath(`${moduleFileName}/${moduleFileName}.module.ts`),
      {moduleName: moduleName, moduleFileName: moduleFileName}
    );
    this.log('WARNING! Didnt Update App Module')
    this.fs.copyTpl(
      this.templatePath('module/routing.module.ts'),
      this.destinationPath(`${moduleFileName}/${moduleFileName}-routing.module.ts`),
      {moduleName: moduleName, moduleFileName: moduleFileName}
    );
    this.fs.copyTpl(
      this.templatePath('module/service.default.ts'),
      this.destinationPath(`${moduleFileName}/services/${moduleFileName}.service.default.ts`),
      {moduleName: moduleName, moduleFileName: moduleFileName, moduleCompName: moduleCompName}
    );
    this.fs.copyTpl(
      this.templatePath('module/service.interface.ts'),
      this.destinationPath(`${moduleFileName}/services/${moduleFileName}.service.interface.ts`),
      {moduleName: moduleName, moduleFileName: moduleFileName, moduleCompName: moduleCompName}
    );
    this.fs.copyTpl(
      this.templatePath('module/repository.mock.ts'),
      this.destinationPath(`${moduleFileName}/repositories/${moduleFileName}.repository.mock.ts`),
      {moduleName: moduleName, moduleFileName: moduleFileName}
    );
    this.fs.copyTpl(
      this.templatePath('module/repository.interface.ts'),
      this.destinationPath(`${moduleFileName}/repositories/${moduleFileName}.repository.interface.ts`),
      {moduleName: moduleName, moduleFileName: moduleFileName}
    );
    this.log('WARNING! Generating it does not replace checking it!')
  }
};

