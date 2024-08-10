import md5 from 'md5'

export const Profile = (identifinder: string | number | undefined): string => {
  // 파라미터가 전달되지 않았을경우 랜덤한 프로필 이미지를 생성합니다
  if (!identifinder)
    return `https://www.gravatar.com/avatar/${md5(
      String(Math.random()),
    )}?d=identicon&s=200`

  const hash = md5(String(identifinder))
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`
}
