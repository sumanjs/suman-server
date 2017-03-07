const path = require('path');

// module.exports = {
//   exec: 'bin/www.js',
//   exclude: [path.resolve(__dirname + '/node_modules/.*'), '.git', 'test', 'public','.idea']
// };


module.exports = {
 exec: 'bin/www.js',  // any binary file or a file with a hashbang
 include: [__dirname],
 exclude: [
  'public',
  '.git',
  '.idea',
  'package.json',
  'node_modules',
  '.*\.log',
  '.*\.sh'
 ],
 signal: 'SIGINT',
 restartUponChange: true,
 restartUponAddition: false,
 restartUponUnlink: false,
 processLogPath: null,         // if desired, pass a relative or absolute path to log file
 verbosity: 1,  // an integer {1,2,3}
 processArgs: []
};
