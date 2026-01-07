#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
function removeComments(code) {
    let result = '';
    let i = 0;
    let inString = false;
    let stringChar = '';
    let inSingleLineComment = false;
    let inMultiLineComment = false;
    while (i < code.length) {
        const char = code[i];
        const nextChar = code[i + 1];
        if (inSingleLineComment) {
            if (char === '\n') {
                inSingleLineComment = false;
                result += char;
            }
            i++;
            continue;
        }
        if (inMultiLineComment) {
            if (char === '*' && nextChar === '/') {
                inMultiLineComment = false;
                i += 2;
                continue;
            }
            i++;
            continue;
        }
        if (inString) {
            result += char;
            if (char === '\\') {
                result += nextChar;
                i += 2;
                continue;
            }
            if (char === stringChar) {
                inString = false;
            }
            i++;
            continue;
        }
        if (char === '"' || char === "'" || char === '`') {
            inString = true;
            stringChar = char;
            result += char;
            i++;
            continue;
        }
        if (char === '/' && nextChar === '/') {
            inSingleLineComment = true;
            i += 2;
            continue;
        }
        if (char === '/' && nextChar === '*') {
            inMultiLineComment = true;
            i += 2;
            continue;
        }
        result += char;
        i++;
    }
    return result.split('\n').filter(line => line.trim() !== '').join('\n');
}
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const cleaned = removeComments(content);
        fs.writeFileSync(filePath, cleaned, 'utf8');
        console.log(`Processed: ${filePath}`);
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err.message);
    }
}
function walkDir(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== 'build') {
                walkDir(filePath, fileList);
            }
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}
const projectRoot = process.argv[2] || '.';
const files = walkDir(projectRoot);
files.forEach(processFile);
console.log(`\nProcessed ${files.length} files`);