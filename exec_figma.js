import http from 'node:http';
import { executeCode } from './figma-ui-mcp-main/figma-ui-mcp-main/server/code-executor.js';

const bridge = {
  async sendOperation(operation, params = {}, sessionId) {
    const postData = JSON.stringify({ operation, params });
    return new Promise((resolve, reject) => {
      const req = http.request({
        hostname: 'localhost',
        port: 38451,
        path: '/exec',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        }
      }, (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(raw);
            if (parsed.success) {
              resolve(parsed.data);
            } else {
              reject(new Error(parsed.error || 'Unknown error'));
            }
          } catch (e) {
            reject(new Error('Invalid response: ' + raw));
          }
        });
      });
      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  }
};

export async function runFigmaCode(code) {
  const res = await executeCode(code, bridge);
  return res;
}

// If run from CLI with a file argument
import fs from 'node:fs';
if (process.argv[2]) {
  const code = fs.readFileSync(process.argv[2], 'utf-8');
  runFigmaCode(code).then(res => {
    console.log(JSON.stringify(res, null, 2));
    process.exit(res.success ? 0 : 1);
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
