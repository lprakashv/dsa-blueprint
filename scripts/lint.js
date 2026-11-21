import { execFileSync } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

for (const directory of ['site', 'scripts', 'test']) {
  for (const name of await readdir(directory, { recursive: true })) {
    const extension = extname(name)
    if (!['.js', '.css', '.html'].includes(extension)) continue
    const path = join(directory, name)
    const source = await readFile(path, 'utf8')
    if (/[^\S\n]+$/m.test(source) || !source.endsWith('\n')) {
      throw new Error(`Check whitespace in ${path}`)
    }
    if (extension === '.js') execFileSync(process.execPath, ['--check', path], { stdio: 'inherit' })
  }
}
console.log('Syntax and whitespace checks passed')
