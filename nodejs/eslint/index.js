#!usr/bin/env node
process.env.DEBUG = process.env.DEBUG || 'webmaker:*';

const path = require('path');
const { CLIEngine } = require('eslint');
const debug = require('debug');
const fs = require('fs');

const log = debug('webmaker:eslint');
log.color = 4;

function dirExists(p, callback) {
    if (!fs.existsSync(p)) {
        const pathinfo = path.parse(p);
        dirExists(pathinfo.dir, () => {
            fs.mkdirSync(p);
        });
    }
    callback && callback();
}

function writeReport(reportPath, fileName, data, append = false) {
    dirExists(reportPath);

    const outputPath = path.join(reportPath, fileName);
    fs.writeFileSync(outputPath, data, {
        encoding: 'utf8',
        flag: append ? 'a' : 'w'
    });

    return reportPath;
}

let argv = process.argv;
let ifFix = false;
if (argv[argv.length - 1] == '--fix') {
    ifFix = true;
    argv = argv.slice(0, argv.length - 1);
}

let codePath = ['../'];
if (argv.length > 3) {
    codePath = argv.slice(3);
}
codePath = codePath.map(f => path.join(__dirname, '..', f));
log('最终的检查目录：', codePath);

const opts = {
    configFile: path.join(__dirname, './.eslintrc.js'),
    ignorePath: path.join(__dirname, './.eslintignore'),
    extensions: ['.js', '.vue'],
    ignore: true,
    useEslintrc: true,
    cache: false,
    fix: ifFix,
    allowInlineConfig: true,
};

const engine = new CLIEngine(opts);
const report = engine.executeOnFiles(codePath);

const outputStylish = engine.getFormatter('codeframe')(report.results);
const outputXml = engine.getFormatter('jslint-xml')(report.results);
const outputHtml = engine.getFormatter('html')(report.results.filter(res => res.messages.length > 0));
const resultPath = argv[2];
const reportPath = path.join(resultPath, './report/mpupweb');
const resultText = `\n 代码路径 ： ${codePath.join('\n')}
eslint 检查结果： 
${report.errorCount}个错误，可修复${report.fixableErrorCount}个
${report.warningCount}个错误，可修复${report.fixableWarningCount}个
`;

writeReport(resultPath, 'result.txt', resultText, true);
writeReport(reportPath, 'eslint.txt', outputStylish);
writeReport(reportPath, 'eslint.xml', outputXml);
writeReport(reportPath, 'eslint.html', outputHtml);

log(resultText);

if (ifFix) {
    log('开始修复文件...');
    CLIEngine.outputFixes(report);
    log('修复完成！');
}


