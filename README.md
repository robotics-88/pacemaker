# Installing a Private NPM Package

This has a private npm package installed.

To install this package, you will need to point to the private registry.

Create a `.npmrc` file with this content:

```plaintext
//npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN
@robotics-88:registry=https://npm.pkg.github.com
```

Replace `YOUR_PERSONAL_ACCESS_TOKEN` with a token generated through your GitHub account.

**Remember to add `.npmrc` to your `.gitignore` file.**

