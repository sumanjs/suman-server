'use strict';

//core
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

//npm
const chokidar = require('chokidar');
const Server = require('socket.io');

//project
const strict = process.argv.indexOf('--strict') > 0;
const io = new Server(3980, {});
const publicPath = path.resolve(__dirname + '/public');
const publicPathLen = publicPath.length;

const clients = [];

/////////////////////////////////////////////////////////////////////////////////

function getCount () {
  return ' => connection count:' + clients.length
}

io.on('connection', function (socket) {

  // only start watching when there is a connection
  // startWatching();
  clients.push(socket);
  console.log(' => new dev server connection! ' + getCount());

  socket.on('disconnect', function () {
    console.log('dev server user disconnected ' + getCount());
    clients.splice(clients.indexOf(socket), 1);
  });
});

const strm = fs.createWriteStream(__dirname + '/dev-server.log');

const watcher = chokidar.watch(__dirname + '/**/*.tsx', {
  // ignored: /\.[^tsx]$/,
  // ignored: '!**/*.tsx',
  // ignored: ['**/.git/**/*', '**/**.js', '**/.idea/**/*'],
  ignoreInitial: true
});

function runTSC (path, cb) {

  const shell = cp.spawn('bash');

  let stderr = '';
  let stdout = '';

  shell.once('close', function (code) {

    shell.removeAllListeners();
    shell.unref();
    if (code < 1 || !strict) {
      cb(null)
    }
    else {
      console.error(' => stderr from tsc child process => \n' + stderr);
    }
  });

  console.log('path => ', String(path).trim());

  shell.stderr.setEncoding('utf8');
  shell.stdout.setEncoding('utf8');

  shell.stderr.on('data', function (d) {
    stderr += d;
  });

  shell.stdout.pipe(process.stdout);

  shell.stdin.write('tsc --skipLibCheck --noResolve --jsx react --module amd --target es5 ' + path + '\n');
  process.nextTick(function () {
    shell.stdin.end();
  });

}

watcher.once('ready', function () {

  watcher.on('add', p => {

    // const sockets = io.sockets.connected;
    const sockets = clients;

    sockets.forEach(function (socket) {
      socket.emit('HOT_RELOAD_JSX', {
        event: 'add',
        path: p
      });
    });
  });

  watcher.on('change', p => {

    runTSC(p, function () {

      if (String(p).startsWith(publicPath)) {

        p = String(p).slice(publicPathLen + 1, p.length - 4);
        const sockets = clients;

        console.log('alrighty then sending message to front-end...');

        sockets.forEach(function (socket) {
          socket.emit('HOT_RELOAD_JSX', {
            event: 'change',
            path: p
          });
        });
      }
    });

  });

  watcher.on('unlink', p => {

    const sockets = clients;

    sockets.forEach(function (socket) {
      socket.send('HOT_RELOAD_JSX', {
        event: 'unlink',
        path: p
      });
    });

  });

});





