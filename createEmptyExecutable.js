/**
 * We create an empty executable; NPM will link to it,
 * and we will then overwrite that file on post-install
 */
var fs = require('fs')
fs.writeFileSync(`${__dirname}/gitlab-runner`, '', { mode: parseInt('0755', 8) })
