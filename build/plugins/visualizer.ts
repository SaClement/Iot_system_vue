import { visualizer } from "rollup-plugin-visualizer";

export default visualizer({
  gzipSize: true, //源代码中收集 gzip 大小并将其显示在图表上
  brotliSize: true, //源代码中收集 brotli 大小并将其显示在图表
  open: true
})