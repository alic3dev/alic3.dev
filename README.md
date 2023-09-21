A website for  
🫀&nbsp;&nbsp;&nbsp;Alic3&nbsp;&nbsp;&nbsp;🕷️

# alic3.dev

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the development server:

```zsh
pnpm dev
```

Open [localhost:3000](http://localhost:3000) with your browser to see.

## Development

### Components

Components live under `@/components`.

### SCSS

This project uses CSS modules through SASS (with SCSS syntax).

Make sure your component styles follow the naming convention `*.module.scss` and import accordingly in your components `tsx` file

```javascript
import styles from './COMPONENT_NAME.module.scss'
```

#### Applying Styles

Styles can be applied to an element as shown below

##### Example.module.scss

```scss
.example {
  background: rgba(145, 45, 87, 0.8);
}
```

##### Example.tsx

```javascript
import styles from './Example.module.scss'

const Example = () => (
  <div className={styles.example}>
    Example: Applying a style to a component 🎨
  </div>
)
```

#### Applying Nested Styles

Nested styles can also be applied to an element as follows

##### Example.module.scss

```scss
.example {
  background: rgba(145, 45, 87, 0.8);

  &.active {
    background: rgba(145, 45, 87, 1);
  }
}
```

##### Example.tsx

```javascript
import styles from './Example.module.scss'

const Example = () => (
  <div className={`${styles.example} ${styles.active}`}>
    Example: Applying a nested style 🪺
  </div>
)
```

#### Applying Kebab Cased Styles

Since Javascript interprets a `-` as an operator we have to change our syntax slightly for kebab cased style names

##### KebabCaseExample.module.scss

```scss
.kebab-case-example {
  background: rgba(145, 45, 87, 0.8);
}
```

##### KebabCaseExample.tsx

```javascript
import styles from './KebabCaseExample.module.scss'

const KebabCaseExample = () => (
  <div className={styles['kebab-case-example']}>
    Example: Applying a Kebab cased style 🍡
  </div>
)
```

## Credits

> Happy hacking 👁️⏝🧿🪡  
> -alic3
