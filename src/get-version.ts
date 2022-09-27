import * as core from '@actions/core'
import {addToCurrentDate, formatDate} from './util/date'

export const getVersion = async (expireInDays: string): Promise<string> => {
  const expDaysNumber: number = parseInt(expireInDays)
  if (isNaN(expDaysNumber) || expDaysNumber < 0) {
    throw new Error(`invalid value of expireInDays: ${expireInDays}`)
  }

  const expDateSuffix: string = formatDate(addToCurrentDate(expDaysNumber))
  core.debug(`expiration date suffix: ${expDateSuffix}`)

  let version = '1.2.3'
  if (
    process.env.GITHUB_REF_TYPE !== 'tag' ||
    process.env.APP_VERSION?.endsWith('-SNAPSHOT')
  ) {
    version = `0.0.0-${
      process.env.GITHUB_REF_NAME
    }.${process.env.GITHUB_SHA?.substring(8)}-expire${expDateSuffix}`
  }

  // VERSION=$(yq e -p=xml '.project.version' pom.xml)
  // if [ "$GITHUB_REF_TYPE" != "tag" ] || [[ "$APP_VERSION" == *"-SNAPSHOT" ]]; then
  // VERSION="0.0.0-${GITHUB_REF_NAME//[\/]/-}.${GITHUB_SHA::8}-expire$(date -d "today + $EXPIRE_IN" "+%y%m%d%H%M")"    fi
  // echo "::set-output name=version::$VERSION"

  return version
}
