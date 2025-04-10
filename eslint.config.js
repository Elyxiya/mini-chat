import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
/**
 * ESLint 多环境配置文件（支持 JavaScript/TypeScript/Vue）
 */
export default defineConfig([
  // ====================== 基础通用配置 ======================
  {
    ignores: [
      '**/dist/**', // 构建输出目录
      'node_modules/**', // 依赖目录
      '**/vite-env.d.ts',
    ],
    // 目标文件类型
    files: ['**/*.{js,mjs,cjs,ts,vue}'],

    // 语言环境配置
    languageOptions: {
      ecmaVersion: 'latest', // 支持最新ECMAScript特性
      sourceType: 'module', // 强制使用ES Modules
      globals: {
        ...globals.browser, // 浏览器环境变量（window/document等）
        ...globals.node, // Node.js环境变量（process/module等）
        ...globals.es2021, // ES2021新增全局对象（如AggregateError）
      },
    },
    // 通用代码质量规则
    rules: {
      'no-var': 'error', // 强制使用let/const代替var
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 空行最多1行
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境禁用console
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境禁用debugger
      'no-unexpected-multiline': 'error', // 避免混淆的多行表达式
      'no-useless-escape': 'off', // 允许特殊转义字符
    },
  },
  // ====================== TypeScript增强配置 ======================
  ...tseslint.configs.recommended, // 继承TypeScript官方推荐规则
  {
    files: ['**/*.ts'], // 仅针对.ts文件
    rules: {
      '@typescript-eslint/no-unused-vars': 'error', // 未使用变量检测
      '@typescript-eslint/prefer-ts-expect-error': 'error', // 强制使用@ts-expect-error
      '@typescript-eslint/no-explicit-any': 'off', // 允许any类型（根据项目需要开启）
      '@typescript-eslint/no-non-null-assertion': 'off', // 允许非空断言（谨慎使用）
      '@typescript-eslint/no-namespace': 'off', // 允许命名空间
      '@typescript-eslint/semi': 'off', // 关闭分号检查（与Prettier配合时使用）
    },
    // TypeScript解析器配置
    languageOptions: {
      parser: tseslint.parser, // 使用@typescript-eslint解析器
      parserOptions: {
        project: './tsconfig.eslint.json', // 必须指向正确的tsconfig路径
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },
  // ====================== Vue3项目配置 ======================
  ...pluginVue.configs['flat/recommended'], // 继承Vue3官方推荐规则
  {
    files: ['**/*.vue'], // 仅针对.vue文件
    rules: {
      'vue/multi-word-component-names': 'off', // 允许单文件组件命名（如Home.vue）
      'vue/no-mutating-props': 'off', // 允许修改props（需要时开启）
      'vue/attribute-hyphenation': 'off', // 允许驼峰属性名（如:customProp）
    },
    // Vue解析器配置
    languageOptions: {
      parser: pluginVue.parser, // 使用vue-eslint-parser
      parserOptions: {
        parser: tseslint.parser, // 支持TS语法解析
        extraFileExtensions: ['.vue'], // 特殊文件扩展
        ecmaFeatures: {
          jsx: true, // 支持Vue JSX语法
        },
      },
    },
  },
  // ====================== JavaScript推荐配置 ======================
  {
    ...js.configs.recommended, // 继承ESLint官方推荐规则
    files: ['**/*.{js,mjs,cjs}'], // 仅针对原生JS文件
  },
])
