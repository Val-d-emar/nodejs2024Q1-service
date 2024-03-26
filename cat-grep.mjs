import fs from 'node:fs';
import { EOL } from 'node:os';
if (process.argv.length > 3) {
  fs.createReadStream(process.argv[2], 'utf8').on('data', (data) => {
    data
      .toString()
      .split(EOL)
      .forEach((data) => {
        if (data.includes(process.argv[3])) {
          console.log(data);
        }
      });
  });
}
