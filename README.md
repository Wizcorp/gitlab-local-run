gitlab-local-run
================

Usage
-----

```bash
npm install --save gitlab-local-run
```

Then, in your `package.json`, you can add:

```json
{
  "scripts": {
    "unit-test": "gitlab-runner exec docker unit-test"
  }
}
```

License
-------

MIT
