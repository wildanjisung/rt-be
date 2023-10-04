

## Description

Teknikal tes untuk Fullstack di Jaghos

## Persiapan
- jalankan database postgre dengan docker
```bash
docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```
- buat database dengan nama 'task_management'
```bash
create database task_management;
```
## Instalasi
- clone repository ini
```bash
$ git clone git@github.com:wildanjisung/rt-be.git
```
- download semua depedensi
```bsh
npm install
```

## Jalankan Aplikasi

```bash
# watch mode
$ npm run start:dev
```

## API Collection
- import file 'Pak RT Management System.postman_collection.json' pada postman. file berada di root directory
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
