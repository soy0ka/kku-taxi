export const getTextId = (email: string): string => {
  return email.split('@')[0]
}
