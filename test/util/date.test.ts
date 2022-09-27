import {addToCurrentDate, formatDate} from '../../src/util/date'

describe('Date utils', () => {
  describe('add to current date', () => {
    jest.useFakeTimers().setSystemTime(new Date('2022-01-01'))

    it('should add given days', async () => {
      expect(addToCurrentDate(0)).toEqual(new Date('2022-01-01'))
      expect(addToCurrentDate(31)).toEqual(new Date('2022-02-01'))
      expect(addToCurrentDate(5)).toEqual(new Date('2022-01-06'))
      expect(addToCurrentDate(-5)).toEqual(new Date('2021-12-27'))
    })
  })

  describe('format date', () => {
    it('should format date correctly', async () => {
      expect(formatDate(new Date('2022-01-01'))).toEqual('202201010000')
      expect(formatDate(new Date('2024-02-29 11:22:33 GMT'))).toEqual(
        '202402291122'
      )
    })
  })
})
