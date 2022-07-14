import * as path from "path";

/**
 * 获取项目根目录
 * @returns 
 */
export function getRootPath() {
  return path.resolve(process.cwd());
}

/**
 * 获取项目src路径
 * @param srcName - src目录名称
 * @descrition 结尾不带斜杠
 */
export function getSrcPath(srcName = 'src') {
  const rootPath = getRootPath();

  return `${rootPath}/${srcName}`;
}