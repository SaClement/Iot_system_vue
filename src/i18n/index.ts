import { createI18n } from "vue-i18n";
import { getLanguage, setLanguage } from "@/utils";

import element_zh_cn from 'element-plus/lib/locale/lang/zh-cn';
import element_en from 'element-plus/lib/locale/lang/en';

const zh_cn = import.meta.globEager('./lang/**/zh_CN.ts');
const en_us = import.meta.globEager('./lang/**/en_US.ts');

// 解析语言文件
export const loadLang = (modules: Record<string, any>) => {
  const message: { [key: string]: string } = {}

  Object.keys(modules).forEach(module => {
    Object.assign(message, { ...modules[module].default });
  })
  return message;
}

export const languageJson: { [key: string]: any } = {
  'zh-CN': {
    langName: '简体中文',
    ...loadLang(zh_cn),
    el: {
      ...element_zh_cn
    }
  },
  'en-US': {
    langName: 'English',
    ...loadLang(en_us),
    el: {
      ...element_en
    }
  }
}

// 返回当前 Language
function getLocalLanguage() {
	return getLanguage()
}

export const i18n = createI18n({
	locale: getLocalLanguage(),
	languageJson
})