import * as core from '@actions/core'
import * as fs from 'fs'
import path from 'path'

import {Bump, nextVersion, parseVersion} from './utils'

async function run(): Promise<void> {
  // Get action inputs
  const projectVersion = core.getInput('project-version').replace(/\s/g, '')
  let godotVersion = core.getInput('godot-version').replace(/\s/g, '')
  const bump = core.getInput('bump').replace(/\s/g, '') as Bump

  const checkoutDirectory = process.env['GITHUB_WORKSPACE'] ?? ''

  // Show action environment information
  core.startGroup('🏝 Environment Information')
  core.info(`🖨 Project version: ${projectVersion}`)
  core.info(`🔼 Bump: ${bump}`)

  if (godotVersion.toLowerCase().includes('global')) {
    const globalJsonPath = path.join(checkoutDirectory, godotVersion)
    const hasGlobalJsonFile = fs.existsSync(globalJsonPath)
    core.info(`📢 Inferring Godot version from global.json file.`)
    core.info(`🌐 global.json file path: ${globalJsonPath}`)
    core.info(`🌐 global.json file exists: ${hasGlobalJsonFile}`)
    if (!hasGlobalJsonFile) {
      throw new Error(
        `🚨 Cannot find global.json file to infer the Godot version from.`
      )
    }
    const globalJsonFileContents = fs.readFileSync(globalJsonPath, 'utf8')
    core.info(`🖨 global.json contents: ${globalJsonFileContents}`)
    const globalJson = JSON.parse(globalJsonFileContents) ?? {}
    core.info(
      `🖨 global.json parsed contents: ${JSON.stringify(
        globalJsonFileContents,
        null,
        2
      )}`
    )
    godotVersion = globalJson['msbuild-sdks']['Godot.NET.Sdk'] ?? ''
  }

  core.info(`🤖 Godot version: ${godotVersion}`)
  core.endGroup()

  // Compute next version

  const semanticProjectVersion = parseVersion(projectVersion)
  const semanticGodotVersion = parseVersion(godotVersion)

  const version = nextVersion(
    semanticProjectVersion,
    semanticGodotVersion,
    bump
  )

  // Output next version

  core.info(`💽 Next version: ${version}`)
  core.setOutput('version', version)
}

run()
