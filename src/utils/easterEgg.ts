const ArrivalAndDestinationsAreSame = (count: number) => {
  switch (count) {
    case 0:
      return '출발지와 도착지가 같습니다'
    case 1:
      return '그 거리는 좀 걸어가세요...'
    case 2:
      return '택시 기사님이 "그건 좀.." 이라고 하실거에요'
    case 3:
      return '건강을 위해 좀 걸어가시는게 어때요?'
    case 4:
      return '아니 그만좀 누르세요'
    case 5:
      return '대체 얼마나 누르시는걷에요?'
    case 6:
      return '알겠습니다 여기까지 오실지는 몰랐어요'
    case 7:
      return '아니 이제 그만 누르세요'
    case 8:
      return '언제까지 누르실거에요..?'
    case 9:
      return '한번 해보자는 건가요?'
    case 10:
      return '제가 얼마나 만들어놓았는지 궁굼하시다고요?'
    case 11:
      return '한번만 더 누르시기만 해봐요!'
    case 12:
      return '전 그만하라고 했어요 다음에도 누르면 계정을 삭제해버릴거에요'
    case 13:
      return '3'
    case 14:
      return '2'
    case 15:
      return '1'
    case 16:
      return '0'
    case 17:
      return '0.1'
    case 18:
      return '0.01'
    case 19:
      return '0.001'
    case 20:
      return '....'
    case 21:
      return '사용자의 계정이 삭제되었습니다 \n 이용해주셔서 감사합니다'
    case 22:
      return '겠냐고요...'
    case 23:
      return '식겁하셨죠? 이제 그만하세요'
    case 24:
      return '끝났습니다'
    case 25:
      return '끝났다고요'
    case 26:
      return '끝'
    case 27:
      return '이제 더 없어요'
    case 28:
      return '이제 그만'
    case 29:
      return '개발자가 대체 몇개를 숨겨놓은건지 궁굼하시다고요?'
    case 30:
      return '그거 아세요? 지금 당신은 이 버튼을 30번이나 눌렀어요'
    case 31:
      return '이제 준비해둔건 끝났어요 더 없어요'
    case 32:
      return '못 믿으시는거에요?'
    case 33:
      return '진짠데...'
    case 34:
      return '이번엔 진짜로 끝났어요'
    default:
      return '출발지와 도착지가 같습니다'
  }
}

export default {
  ArrivalAndDestinationsAreSame
}
