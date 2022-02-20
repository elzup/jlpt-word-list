#!/usr/bin/env node
'use strict'

const { readFileSync, writeFileSync } = require('fs')

const concat = (a, init = []) => a.reduce((p, c) => p.concat(c), init)
const range = (n) => [...Array(n).keys()]

const main = async (outFile = 'out/all.csv', toN = 5, min = false) => {
  const files = range(toN)
    .map((v) => v + 1)
    .map((i) => readFileSync(`src/n${i}.csv`, 'utf-8').trim().split('\n'))
  const head = files[0][0]
  files.forEach((f) => {
    f.shift()
  })
  const result = concat(files, [head]).map((line) => {
    if (min) {
      const [expression, reading, _meaning, _tags] = line.split(',')
      return [expression, reading].join(',')
    }
    return line
  })

  const text = result.join('\n')

  writeFileSync(outFile, text, 'utf-8')
}

// full
// main('out/all.csv', 5, false)

// min
main('out/all.min.csv', 5, true)
