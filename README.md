# node-epub

## Getting started

    yarn add node-epub

```typescript
import Epub from 'node-epub';

const epub = new Epub('./path-to.epub');

console.log(
  epub.title,
  epub.creator,
  epub.language,
  epub.identifier,
  epub.coverImage,
);
```

## Testing

Make sure you have the git submodule initialized.

```bash
git submodule update --init
```

Then run the test cases with `yarn test`.
