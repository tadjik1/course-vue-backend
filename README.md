# Course Vue Backend

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Сборка
npm run build

# Инициализация БД
npm run db:refresh

# Запуск
npm start

#...или с watch и debug
npm run start:debug
```

## Конфигурирование

```dotenv
# .env

PORT=3000
HOST=127.0.0.1
SECRET=secret_key

# Admin key is used to protect some maintenance features; remove or set empty to disable
# ADMIN_KEY=admin_key

# Database refresh interval in CRON pattern; remove or set empty to disable DB refresh
# DB_REFRESH_CRON=* 15 * * * *

```

## База Данных

Регенерация БД с тестовыми данными:
```bash
npm run db:refresh
```

Тестовые данные описаны в `src/maintenance/seed-data.ts`.

## Документация API

http://localhost:3000/api 

## Known issues

При автоматической генерации схемы БД не добавляются внешние ключи.   
После изменения схемы требуется перегенерировать и дополнить вручную `data/create-schema.sql`.

https://github.com/mikro-orm/mikro-orm/issues/464  
https://github.com/knex/knex/issues/3351  
