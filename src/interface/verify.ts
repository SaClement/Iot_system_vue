interface VerifyItemSize {
  // 验证组件各个模块的宽度
  width: string;
  // 验证组件各个模块的高度
  height: string;
}

type CaptchaType = "blockPuzzle" | "clickWord" | null

export interface Verify {
  locale: string;
  captchaType: CaptchaType;
  figure?: number | null;
  arith?: number | null;
  mode: string;
  vSpace?: number;
  explain?: string;
  imgSize?: VerifyItemSize;
  blockSize?: VerifyItemSize;
  barSize?: VerifyItemSize;
}