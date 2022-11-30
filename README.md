# Formby

![License](https://img.shields.io/github/license/zS1L3NT/web-react-formby?style=for-the-badge) ![Languages](https://img.shields.io/github/languages/count/zS1L3NT/web-react-formby?style=for-the-badge) ![Top Language](https://img.shields.io/github/languages/top/zS1L3NT/web-react-formby?style=for-the-badge) ![Commit Activity](https://img.shields.io/github/commit-activity/y/zS1L3NT/web-react-formby?style=for-the-badge) ![Last commit](https://img.shields.io/github/last-commit/zS1L3NT/web-react-formby?style=for-the-badge)

Formby is a form creation website that aims to act like Google Forms or Microsoft Forms.<br>

View the video demonstration of the website [here](https://youtu.be/56A5XV-Q-PA)

## Motivation

I need a deliverable for my FWEB (Full Stack Web Development) submission so I looked around for a cool project idea to build.

## Features

-   Authentication
    -   Login with email and password
    -   Register with email and password
    -   Logout
    -   Update user profile
    -   Update password
-   Forms
    -   Creating & Editing
        -   Form name
        -   Form description
        -   Final form preview
        -   Form questions
            -   Add question
            -   Duplicate
            -   Edit question
                -   Question title
                -   Question description
                -   Question type
            -   Reorder questions
            -   Delete question
            -   Change authentication requirements
    -   Deleting
    -   Responding
        -   Allow submitting as anonymous if allowed

## Usage

### React Frontend

```
$ npm i
$ npm run dev
```

### Laravel Backend

Copy the `.env.example` file to `.env` then fill in the json file with the correct project credentials.

```
$ composer install
$ php artisan migrate:fresh --seed
$ php artisan serve
```

## Credits

A lot of inspiration came from [Google Forms](https://forms.google.com) and [Microsoft Forms](https://forms.microsoft.com).

## Built with

-   React
    -   TypeScript
        -   [![typescript](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/dev/typescript?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/typescript)
    -   React
        -   [![@babel/core](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/dev/@babel/core?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/@babel/core)
        -   [![react](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/react?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/react)
        -   [![react-dom](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/react-dom?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/react-dom)
        -   [![react-icons](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/react-icons?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/react-icons)
        -   [![react-router-dom](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/react-router-dom?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/react-router-dom)
    -   Chakra UI
        -   [![@chakra-ui/icons](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/@chakra-ui/icons?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/@chakra-ui/icons)
        -   [![@chakra-ui/react](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/@chakra-ui/react?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/@chakra-ui/react)
        -   [![@chakra-ui/styled-system](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/dev/@chakra-ui/styled-system?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/@chakra-ui/styled-system)
        -   [![@chakra-ui/system](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/dev/@chakra-ui/system?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/@chakra-ui/system)
        -   [![@emotion/react](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/@emotion/react?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/@emotion/react)
        -   [![@emotion/styled](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/@emotion/styled?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/@emotion/styled)
    -   Redux Toolkit
        -   [![@reduxjs/toolkit](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/@reduxjs/toolkit?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/@reduxjs/toolkit)
        -   [![immer](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/immer?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/immer)
        -   [![react-redux](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/react-redux?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/react-redux)
        -   [![use-immer](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/use-immer?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/use-immer)
    -   Miscellaneous
        -   [![luxon](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/luxon?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/luxon)
        -   [![react-beautiful-dnd](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/react-beautiful-dnd?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/react-beautiful-dnd)
        -   [![react-chartjs-2](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/react-chartjs-2?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/react-chartjs-2)
        -   [![react-colorful](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/react-colorful?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/react-colorful)
        -   [![react-error-boundary](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/react-error-boundary?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/react-error-boundary)
        -   [![react-select](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/react-select?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/react-select)
        -   [![validate-any](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/validate-any?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/validate-any)
        -   [![vite](https://img.shields.io/github/package-json/dependency-version/zS1L3NT/web-react-formby/dev/vite?style=flat-square&filename=web-react-formby%2Fpackage.json)](https://npmjs.com/package/vite)
-   Laravel
    -   Authentication
        -   [![tymon/jwt-auth](https://img.shields.io/badge/tymon%2Fjwt--auth-*-blue?style=flat-square)](https://packagist.org/packages/tymon/jwt-auth)
