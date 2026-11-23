import { buildSite } from '@lprakashv/course-board'
import { buildShell } from './course-shell.js'

await buildSite('.', { shell: buildShell })
console.log('Built dist/')
