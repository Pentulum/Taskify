const { urlencoded } = require("express");
const express = require("express");
const helmet = require('helmet');
const path = require("path");
const i18n = require("i18n"); // 新增：引入 i18n
const cookieParser = require("cookie-parser"); // 新增：引入 cookie-parser

require("dotenv").config();
require("../src/db/conn");

const views_path = path.join(__dirname, "../views");
const static_path = path.join(__dirname, "../static");
const app = express();
const port = process.env.PORT || 3000;

// --- i18n 国际化配置开始 ---
i18n.configure({
    locales: ['en', 'zh'],  // 支持英文和中文
    directory: path.join(__dirname, '../locales'), // 词典存放在根目录的 locales 文件夹
    defaultLocale: 'en',    // 默认语言
    cookie: 'lang',         // 使用名为 lang 的 cookie 记录语言
    queryParameter: 'lang', // 允许通过 ?lang=zh 这种方式切换语言
    autoReload: true,
    updateFiles: false,
    api: {
        '__': 't'           // 简写，在模板中可以使用 t('key')
    }
});
// --- i18n 国际化配置结束 ---

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'"], // 允许运行 HTML 里的脚本
      },
    },
  })
);
app.use("/static", express.static(static_path));
app.use(express.json());
app.use(urlencoded({ extended: false }));

// 必须在路由之前使用这两个中间件
app.use(cookieParser()); // 解析 cookie
app.use(i18n.init);      // 初始化 i18n

// 自定义中间件：让所有 EJS 模板都能直接访问当前语言
app.use((req, res, next) => {
    res.locals.currentLocale = req.getLocale();
    next();
});

app.set("view engine", "ejs");
app.set("views", views_path);

app.get("/", (req, res) => {
    res.status(200).render("index.ejs");
});

app.get("/signup", (req, res) => {
    res.status(200).render("signup.ejs");
});

app.get("/privacy", (req, res) => {
    res.status(200).render("privacy.ejs");
});

// In Future this dashboard will be rendered after authentication of users 
app.get("/dashboard", (req, res) => {
    res.status(200).render("dashboard/dashboard.ejs");
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

//* listen
if (require.main === module) {
    app.listen(port, () => {
        console.log(`The application started successfully on port ${port}`);
    });
}

module.exports = app;