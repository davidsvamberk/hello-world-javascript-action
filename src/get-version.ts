import * as core from '@actions/core'
import {addToCurrentDate, formatDate} from './util/date'

export const getVersion = async (expireInDays: string): Promise<string> => {
  const expDaysNumber: number = parseInt(expireInDays)
  if (isNaN(expDaysNumber) || expDaysNumber < 0) {
    throw new Error(`invalid value of expireInDays: ${expireInDays}`)
  }

  const expDateSuffix: string = formatDate(addToCurrentDate(expDaysNumber))
  core.debug(`expiration date suffix: ${expDateSuffix}`)

  let version
  if (process.env.GITHUB_REF_TYPE === 'tag') {
    version = `${process.env.GITHUB_REF_NAME?.replace('v', '')}`
  } else {
    version = `0.0.0-${
      process.env.GITHUB_REF_NAME
    }.${process.env.GITHUB_SHA?.substring(0, 8)}-expire${expDateSuffix}`
  }

  return version
}
