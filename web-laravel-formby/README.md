# Formby

![License](https://img.shields.io/github/license/zS1L3NT/web-laravel-formby?style=for-the-badge) ![Languages](https://img.shields.io/github/languages/count/zS1L3NT/web-laravel-formby?style=for-the-badge) ![Top Language](https://img.shields.io/github/languages/top/zS1L3NT/web-laravel-formby?style=for-the-badge) ![Commit Activity](https://img.shields.io/github/commit-activity/y/zS1L3NT/web-laravel-formby?style=for-the-badge) ![Last commit](https://img.shields.io/github/last-commit/zS1L3NT/web-laravel-formby?style=for-the-badge)

Formby is a form creation website that aims to act like Google Forms or Microsoft Forms.<br>
The react frontend of Formby is [here](https://github.com/zS1L3NT/web-react-formby).<br>

A more detailed README is provided in the frontend repository.

## Usage

Copy the `.env.example` file to `.env` then fill in the json file with the correct project credentials.

```
$ composer install
$ php artisan migrate:fresh --seed
$ php artisan serve
```

## Built with

-   Laravel
    -   [![tymon/jwt-auth](https://img.shields.io/badge/tymon%2Fjwt--auth-*-blue?style=flat-square)](https://packagist.org/packages/tymon/jwt-auth)
