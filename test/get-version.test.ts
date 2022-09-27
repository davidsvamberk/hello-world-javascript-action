import {getVersion} from '../src/get-version'

describe('Get version', () => {
  describe('expire-in-days validation', () => {
    it('should throw error if exp days is string', async () => {
      await expect(getVersion('a')).rejects.toThrow()
    })

    it('should throw error if exp days is negative int', async () => {
      await expect(getVersion('-5')).rejects.toThrow()
    })
  })

  describe('getVersion', () => {
    jest.useFakeTimers().setSystemTime(new Date('2022-01-01'))

    const envVars = process.env

    beforeEach(() => {
      process.env = {...process.env}
      delete process.env.GITHUB_REF_TYPE
      delete process.env.APP_VERSION
      delete process.env.GITHUB_REF_NAME
      delete process.env.GITHUB_SHA
    })

    afterEach(() => {
      process.env = envVars
    })

    it('should use GITHUB_REF_NAME when GITHUB_REF_TYPE is tag', async () => {
      process.env.GITHUB_REF_TYPE = 'tag'
      process.env.GITHUB_REF_NAME = 'v1.2.3'

      const version = await getVersion('5')
      expect(version).toEqual('1.2.3')
    })

    it('should use APP_VERSION when GITHUB_REF_TYPE is tag', async () => {
      process.env.GITHUB_REF_TYPE = 'branch'
      process.env.GITHUB_REF_NAME = 'main'
      process.env.GITHUB_SHA = 'b0a34d1b920fb32df5aba2ba13777e3382ea2979'

      const version = await getVersion('5')
      expect(version).toEqual('0.0.0-main.b0a34d1b-expire202201060000')
    })
  })
})
