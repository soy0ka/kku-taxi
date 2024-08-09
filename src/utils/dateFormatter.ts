/**
 * 주어진 날짜를 '오늘', '내일', '모레'로 표시하거나,
 * 그 이후 날짜는 '월 일'로 표시합니다.
 *
 * 예시:
 * - 오늘: '오늘 12시 30분'
 * - 내일: '내일 12시 30분'
 * - 모레: '모레 12시 30분'
 * - 그 이후: '6월 1일 12시 30분'
 * - 올해가 아닌 경우: '2021년 6월 1일 12시 30분'
 *
 * @param date - 날짜 문자열 (ISO 형식)
 * @returns 포맷된 날짜 문자열
 *
 * @example
 * ```typescript
 * formatDateWithRelativeDay('2021-06-01T12:30:00.000Z');
 * // '2021년 6월 1일 12시 30분'
 * ```
 *
 * @example
 * ```typescript
 * formatDateWithRelativeDay(new Date().toISOString());
 * // '오늘 12시 30분' (현재 시간이 12시 30분일 경우)
 * ```
 */
export const formatDateWithRelativeDay = (date: string) => {
  const d = new Date(date)
  const now = new Date()

  const year =
    d.getFullYear() === now.getFullYear() ? '' : `${d.getFullYear()}년 `

  const isToday = d.toDateString() === now.toDateString()
  const isTomorrow =
    d.toDateString() === new Date(now.setDate(now.getDate() + 1)).toDateString()
  const isDayAfterTomorrow =
    d.toDateString() === new Date(now.setDate(now.getDate() + 1)).toDateString()

  let dayPart
  if (isToday) {
    dayPart = '오늘'
  } else if (isTomorrow) {
    dayPart = '내일'
  } else if (isDayAfterTomorrow) {
    dayPart = '모레'
  } else {
    dayPart = `${d.getMonth() + 1}월 ${d.getDate()}일`
  }

  return `${year}${dayPart} ${d.getHours()}시 ${d.getMinutes()}분`
}

/**
 * 주어진 날짜를 '시 분' 또는 '월 일' 형식으로 포맷팅합니다.
 *
 * @param date - 날짜 문자열 (ISO 형식)
 * @returns 포맷된 날짜 문자열
 */
export const formatRelativeDate = (date: string | undefined): string => {
  if (!date) return '불러올 수 없음'
  const d = new Date(date)

  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const diffHours = diff / (1000 * 60 * 60)
  const diffDays = diffHours / 24
  if (diffDays < 1) {
    return `${d.getHours()}시 ${d.getMinutes()}분`
  } else {
    return `${d.getMonth() + 1}월 ${d.getDate()}일`
  }
}

/**
 * 주어진 날짜와 현재 시간의 차이를 계산하여 남은 시간을 반환합니다.
 *
 * @param date - 날짜 문자열 (ISO 형식)
 * @returns 남은 시간을 나타내는 문자열
 */
export const getTimeRemaining = (date: string | undefined): string => {
  if (!date) return '불러올 수 없음'
  const d = new Date(date)
  if (isNaN(d.getTime())) return '날짜 형식이 잘못되었습니다'

  const now = new Date()
  const diff = d.getTime() - now.getTime()
  const diffHours = diff / (1000 * 60 * 60)
  const diffMinutes = (diffHours % 1) * 60

  if (diffHours < 12) {
    return `${Math.floor(diffHours)}시간 ${Math.floor(diffMinutes)}분`
  } else {
    return `${Math.floor(diffHours / 24)}일`
  }
}

/**
 * 주어진 날짜를 한국어로 포맷팅합니다. (년 월 일 시 분)
 * @param date - 날짜 문자열 혹은 Date 객체
 * @returns 포맷된 날짜 문자열
 * @example
 * ```typescript
 * formatDateToKorean('2021-06-01T12:30:00.000Z');
 * // '2021년 6월 1일 12시 30분'
 * ```
 */
export const formatDateToKorean = (date: string | Date) => {
  const d = new Date(date)
  return `${d.getFullYear()}년 ${d.getMonth()}월 ${d.getDate()}일 ${d.getHours()}시 ${d.getMinutes()}분`
}
