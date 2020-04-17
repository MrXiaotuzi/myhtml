/**
 * eslint代码规范检测规则配置
 * 本文档中的规则与《前端编码规范.docx》内容一一对应，【】括号内为对应的章节
 * 规范中标识为[强制]的内容对应本文档中的ERROR，规范中标识为[建议]的内容对应本文档中的WARN
 *
 * 如需不检查当前代码，加注释 \/\* eslint-disable no-undef \*\/
 *
 * 更新于：2019年2月28日
 * */

const ERROR = 2; // 错误（退出代码）"error"或者2
const WARN = 1; // 警告（不影响退出代码）"warn"或者1
const OFF = 0; // 关闭规则关闭"off"或者0

module.exports = {
    root: true,
    parserOptions: {
		ecmaVersion: 6,
		parser: "babel-eslint",
        sourceType: 'module',
    },
    env: {
        browser: true,
		node: true,
		es6: true
    },
    extends: ["plugin:vue/strongly-recommended"],
    overrides: [
        {
            "files": ["*.vue"],
            "rules": {
                // 解决vue文件中script标签内缩进检测出错的问题（script标签内默认顶格缩进）
                // vue文件中的缩进分别用"vue/script-indent" 和 "vue/html-indent" 来检测
                "indent": OFF
            }
        }
    ],
    rules: {
        // 【规范2.2 缩进】
		// 【2.1.2】文件结尾树，保留一个空行
		"eol-last": [ERROR, "always"],
        // 【2.2.1】缩进风格,强制4个空格
        "indent": [ERROR, 4, {"SwitchCase": 1}],

        // 【规范3.1 空格】
        // 【3.1.1】一元运算符的前面要加空格，后面不加空格
        "space-unary-ops": [ERROR, {"words": true, "nonwords": false}],
        // 【3.1.2】用作代码块起始的左花括号{前必须有一个空格
        "space-before-blocks": [ERROR, "always"],
        // 【3.1.3】关键字(if/else/for/while/function/switch/do/try/catch/finally)前后都要空一格
        "keyword-spacing": [ERROR, {"before": true, "after": true}],
        // 【3.1.4】对象字面量中冒号前不能有空格，冒号后要有空格
        "key-spacing": [ERROR, {"beforeColon": false, "afterColon": true}],
        // 【3.1.5】分号前不允许有空格,之后如果有内容则必须有空格
        "semi-spacing": [ERROR, {"before": false, "after": true}],
        // 【3.1.5】逗号前不允许有空格,之后如果有内容则必须有空格
        "comma-spacing": [ERROR, {"before": false, "after": true}],
        // 【3.1.6】圆括号内紧贴括号部分不允许有空格
        "space-in-parens": [WARN, "never"],
        // 【3.1.6】方括号内紧贴括号部分不允许有空格,使用方括号取值时
        "computed-property-spacing": [WARN, "never"],
        // 【3.1.6】方括号内紧贴括号部分不允许有空格,使用方括号表示数组时
        "array-bracket-spacing": [WARN, "never"],

        // 【规范3.2 换行】
        // "no-unexpected-multiline": ERROR,//避免多行表达式
        // 使用windows换行风格
        "linebreak-style": [ERROR, "windows"],
        // 【3.2.2】换行时运算符在行首
        "operator-linebreak": [ERROR, "before"],
        // 【3.2.3】换行时，逗号不允许在行首
        "comma-style": [ERROR, "last"],
        // 【3.2.6】每个语句不超过120
        "max-len":[OFF, 120],

        // 【规范3.3 语句】
        // 【3.3.1】语句强制分号结尾
        "semi": [ERROR, "always"],
        // 【3.3.2】不允许省略if后面的{}
        "curly": [ERROR, "all"],
        // 【3.3.4】提交的代码中不能有debugger
        "no-debugger": WARN,

        // 【规范3.4 命名】
        // 【3.4.1】【3.4.2】【3.4.3】【3.4.4】强制驼峰法命名
        "camelcase": ERROR,
        // 命名检测
        // "id-match": ERROR,

        // 【规范3.5 变量】
        // 【3.5.1】不能有未定义的变量,必须用var等声明
        "no-undef": ERROR,
        // 【3.5.2】不能有声明后未被使用的变量或参数
        "no-unused-vars": [ERROR, {"vars": "all", "args": "after-used"}],
        // 【3.5.4】禁止重复声明变量
        "no-redeclare": ERROR,
        // 【3.5.5】禁止修改const声明的变量
        "no-const-assign": ERROR,

        // 【规范3.1.6 条件】
        // 【3.6.3】如果if语句里面有return, 建议删除else
        "no-else-return": WARN,

        // 【规范3.7 字符串】
        // 引号类型，建议使用单引号
        // "quotes": [WARN, "single"],

        // 【规范3.9 函数】
        // 【3.9.1】函数参数最多只能有6个
        "max-params": [ERROR, 6],
		// 【3.9.3】函数块中的语句最大数量为80
		"max-statements": [ERROR, 80],
		
        // 【规范3.10 VUE】
        // 以下需要插件【plugin:vue/essential】或【plugin:vue/strongly-recommended】支持
        // 【3.10.1】不允许在vue的computed计算属性中使用异步返回
        "vue/no-async-in-computed-properties": ERROR,
        // 【3.10.2】不允许重名的属性（data,computed,methods中）
        "vue/no-dupe-keys": ERROR,
        // 【3.10.3】不允许重名的属性（template模板中）
        "vue/no-duplicate-attributes": ["error", {
            "allowCoexistClass": true,
            "allowCoexistStyle": true
        }],
        "vue/no-parsing-error": OFF,
        // 【3.10.4】不允许自定义属于名与vue中特有的属性名一样
        "vue/no-reserved-keys": ERROR,
        // 【3.10.5】data必须通过一个function返回，而不是直接是一个对象
        "vue/no-shared-component-data": ERROR,
        // 在计算属性中不允许做其它的操作，如改变data中的属性的值
        "vue/no-side-effects-in-computed-properties": OFF,
        // 【3.10.6】不能在<template>标签上使用key属性
        "vue/no-template-key": ERROR,
        // 【3.10.7】给<textarea>标签绑定值时，推荐使用v-model指令，而不是在标签内部使用输出模板
        "vue/no-textarea-mustache": WARN,
        // 【3.10.8】删除未使用的组件及引用
        "vue/no-unused-components": ERROR,
        // 【3.10.9】没有使用的变量不要声明
        "vue/no-unused-vars": ERROR,
        // v-if 不能和v-for一起使用
        "vue/no-use-v-if-with-v-for": OFF,
        // 【3.10.10】使用component组件时，需要指定is参数
        "vue/require-component-is": ERROR,
        // 【3.10.11】设置props属性的类型时，需要用对象方式如Object/Number/String等，而不要用字符串如"Object"/"Number"/"String"
        "vue/require-prop-type-constructor": ERROR,
        // 【3.10.12】在render中需要强制返回结果
        "vue/require-render-return": ERROR,
        // 【3.10.13】始终为v-for制定key参数
        "vue/require-v-for-key": ERROR,
        // 【3.10.14】在props中给定的默认值需要与设置的值类型匹配
        "vue/require-valid-default-prop": ERROR,
        // 【3.10.15】在计算属性中始终返回值
        "vue/return-in-computed-property": ERROR,
        // 【3.10.16】当有另一个带修饰符的v-on时，此规则强制对v-on使用精确修饰符
        "vue/use-v-on-exact": ERROR,
        // 验证模板根节点
        "vue/valid-template-root": WARN,
        // 【3.10.17】验证v-bind
        "vue/valid-v-bind": ERROR,
        // 【3.10.17】验证v-cloak
        "vue/valid-v-cloak": ERROR,
        // 【3.10.17】验证v-else-if
        "vue/valid-v-else-if": ERROR,
        // 【3.10.17】验证v-else
        "vue/valid-v-else": ERROR,
        // 【3.10.17】验证v-for
        "vue/valid-v-for": ERROR,
        // 【3.10.17】验证v-html
        "vue/valid-v-html": ERROR,
        // 【3.10.17】验证v-if
        "vue/valid-v-if": ERROR,
        // 【3.10.17】验证v-on
        "vue/valid-v-on": ERROR,
        // 【3.10.17】验证v-once
        "vue/valid-v-once": ERROR,
        // 【3.10.17】验证v-pre
        "vue/valid-v-pre": ERROR,
        // 【3.10.17】验证v-show
        "vue/valid-v-show": ERROR,
        // 【3.10.17】验证v-text
        "vue/valid-v-text": ERROR,
        // 以下需要【plugin:vue/strongly-recommended】支持
        // 【3.10.18】强制在Vue模板中的自定义组件上使用连字符属性名
        "vue/attribute-hyphenation": ERROR,
        // 【3.10.19】>标签结束符号换行的位置，推荐单行时不换行，多行时换行
        "vue/html-closing-bracket-newline": WARN,
        // 【3.10.20】>标签结束符号的距离，>前不要有空格，/>前保留一个空格
        "vue/html-closing-bracket-spacing": WARN,
        // 【3.10.21】标签必须有结束符号
        "vue/html-end-tags": ERROR,
        // 【3.10.22】标签缩进使用4个空格
        "vue/html-indent": [ERROR, 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": false,
            "ignores": []
        }],
        // 【3.10.23】标签中属性的引号类型使用双引号
        "vue/html-quotes": ["error", "double"],
        // 标签自动闭合
        "vue/html-self-closing": OFF,
        // 标签属性换行规则
        "vue/max-attributes-per-line": OFF,
        // 标签content内容换行,除"pre", "textarea"以外的标签，字符内容不允许换行
        "vue/multiline-html-element-content-newline": OFF,
        // 【3.10.24】标签模板中{{}}内侧需要有空格
        "vue/mustache-interpolation-spacing": ERROR,
        // 【3.10.25】VUE组件名采用大驼峰命名法
        "vue/name-property-casing": [ERROR, "PascalCase"],
        // 【3.10.26】属性key和:号之间不要有多余的空格
        "vue/no-multi-spaces": WARN,
        // 【3.10.27】属性=号两边不要有空格
        "vue/no-spaces-around-equal-signs-in-attribute": ERROR,
        // v-for隐藏属性
        "vue/no-template-shadow": OFF,
        // 【3.10.28】VUE中的属性使用驼峰命名法
        "vue/prop-name-casing": [ERROR, "camelCase"],
        // 【3.10.29】建议给每个props指定默认值
        "vue/require-default-prop": WARN,
        // props属性尽可能详细
        "vue/require-prop-types": WARN,
        // 单行元素的内容前后要求换行
        "vue/singleline-html-element-content-newline": OFF,
        // 【3.10.30】v-bind使用缩写：
        "vue/v-bind-style": [ERROR, "shorthand" ],
        // 【3.10.30】v-on 使用缩写
        "vue/v-on-style": [ERROR, "shorthand" ],
		// 【3.10.31】组件参数使用统一的顺序
		"vue/order-in-components": [ERROR, {
			"order": [
			    "el",
			    "name",
			    "parent",
			    "functional",
			    ["delimiters", "comments"],
			    ["components", "directives", "filters"],
			    "extends",
			    "mixins",
			    "inheritAttrs",
			    "model",
			    ["props", "propsData"],
			    "data",
			    "computed",
			    "watch",
			    "LIFECYCLE_HOOKS",
			    "methods",
			    ["template", "render"],
			    "renderError"
			]
		}],
        // 检测script标签里面的缩进
        "vue/script-indent": [ERROR, 4, {
            "baseIndent": 1,
            "switchCase": 1,
            "ignores": []
        }]

    }
}