#!/usr/bin/env node
'use strict'

const { readFileSync, writeFileSync } = require('fs')

const concat = (a, init = []) => a.reduce((p, c) => p.concat(c), init)
const range = (n) => [...Array(n).keys()]
const main = async () => {
  const files = range(5)
    .map((v) => v + 1)
    .map((i) => readFileSync(`src/n${i}.csv`, 'utf-8').trim().split('\n'))
  const head = files[0][0]
  files.forEach((f) => {
    f.shift()
  })
  const result = concat(files, [head])
  const text = result.join('\n')

  writeFileSync('out/all.csv', text, 'utf-8')
}

main()
