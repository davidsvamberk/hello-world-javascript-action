import * as core from '@actions/core'
import * as inOut from './in-out'
import {getVersion} from './get-version'

/**
 * GitHub Action entrypoint.
 */
async function run(): Promise<void> {
  try {
    core.info('Env:')
    for (const key in process.env) {
      const value = process.env[key]
      core.info(`${key}:${value}`)
    }

    const expireInDays: string = core.getInput(inOut.INPUT_EXPIRE_IN_DAYS, {
      required: true
    })
    core.debug(`${inOut.INPUT_EXPIRE_IN_DAYS}: ${expireInDays}`)

    const version = await getVersion(expireInDays)

    core.setOutput(inOut.OUTPUT_VERSION, version)
    core.notice('', {title: version})
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
    else core.setFailed(String(error))
  }
}

run()
