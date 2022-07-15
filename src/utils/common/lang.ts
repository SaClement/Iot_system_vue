import { EnumStorageKey } from "@/enum"

/**
 * 获取用户语言
 * @returns langeuage
 */
export function getLanguage (): string {
  return window.localStorage.getItem(EnumStorageKey['language']) || 'zh-CN'
}

/**
 * 设置用户语言
 * @param value - 语言
 */
export function setLanguage(value: string) {
  window.localStorage.setItem(EnumStorageKey['language'], value)
}