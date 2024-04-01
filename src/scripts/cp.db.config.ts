import { dbConfigService } from '../db/db.config.service';
import fs = require('fs');
fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(dbConfigService.getConfig(), null, 2),
);
