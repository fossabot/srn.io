import fs from 'fs';
import path from 'path';

const config = {
  port: process.env.PORT || 3000,
  firebase: {
    url: process.env.FIREBASE_URL
  }
};

if (process.env.NODE_ENV === 'production') {
  var jsonString = fs.readFileSync(path.join(process.cwd() + '/assets/dist', 'assets.json'));

  Object.assign(config, {
    assets: JSON.parse(jsonString),
    cdn: process.env.CDN_URL
  });
}

export default config;
