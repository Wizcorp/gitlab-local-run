const ora = require('ora')
const https = require('https')
const fs = require('fs')
const path = require('path')

const platform = process.platform
const spinner = ora('Downloading gitlab-runner').start()

function abort(error) {
  spinner.fail(`${error.message}`)
  spinner.stop()

  throw error
}

const req = https.request({
  host: 'gitlab-ci-multi-runner-downloads.s3.amazonaws.com',
  path: `/latest/binaries/gitlab-ci-multi-runner-${platform}-amd64`
}, function (res) {
  if (res.statusCode !== 200) {
    abort(new Error(`Received status code: ${res.statusCode}`))
  }

  const file = fs.createWriteStream('./gitlab-runner', {
    mode: parseInt('0755', 8)
  })

  file.on('error', abort)
  res.on('error', abort)
  file.on('close', function () {
    spinner.succeed()
    spinner.stop()
  })
  res.pipe(file)
})

req.on('error', abort)
req.end()

