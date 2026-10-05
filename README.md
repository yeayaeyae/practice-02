# Технологии индустриального программирования

Учебный репозиторий практических работ №1–3 по JavaScript.

## Автор

**Студент:** Кигози Елисей Маликович
**Группа:** ЭФБО-13-25
**Вариант:** 1

## Практические работы

* [Практическая работа №1](./practice-01/README.md)
* [Практическая работа №2](./practice-02/README.md)
* [Практическая работа №3](./practice-03/README.md)

## Структура репозитория

```text
practice-02/
├── practice-01/
│   ├── README.md
│   ├── index.html
│   └── js/
├── practice-02/
│   ├── README.md
│   ├── checks.js
│   ├── package.json
│   └── src/
├── practice-03/
│   ├── README.md
│   ├── checks.html
│   ├── checks.js
│   ├── index.html
│   └── src/
├── .gitignore
└── README.md
```

## Проверка

### Практическая работа №1

Из корня репозитория:

```powershell
node practice-01/js/hello.js
node practice-01/js/types.js
node practice-01/js/progress.js
node practice-01/js/plan.js
node practice-01/js/debug.js
```

### Практическая работа №2

```powershell
node practice-02/checks.js
```

Также доступен npm-скрипт:

```powershell
npm.cmd --prefix practice-02 run check
```

### Практическая работа №3

Автоматические проверки:

```powershell
node practice-03/checks.js
```

Для браузерной части из корня репозитория:

```powershell
python -m http.server 5503
```

После запуска открыть:

```text
http://127.0.0.1:5503/practice-03/index.html
```

## Результат

В репозитории представлены три практические работы по JavaScript:

* основы JavaScript и отладка;
* функции, объекты, массивы и работа с данными;
* DOM, события и интерактивный интерфейс.

Каждая практическая работа содержит исходный код, собственный README с описанием выполненных заданий и инструкции по запуску.
