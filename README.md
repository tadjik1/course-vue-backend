# Course Vue Backend

## Подготовка

```bash
# Установка зависимостей
npm install

# Миграция БД
npm run db:migrate

# Заполнение БД тестовыми данными
npm run db:seed

# Сборка
npm run build
```

## Запуск приложения

```bash
# Продакшн
npm run start:prod

# Разработка с watch и debug
npm run start:debug
```

## Отчистка

Пересоздание БД с повторным заполнением тестовыми данными.

```bash
npm run db:refresh
```

## Тестирование

*No tests...*

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
