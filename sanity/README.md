# Sanity Studio schema

These files describe the content model the website expects. They are not part of
the React build — copy them into a Sanity Studio project.

```bash
npm create sanity@latest -- --project <projectId> --dataset production
# then copy sanity/schemaTypes/* into the studio's schemaTypes folder
```

Register them in the studio's `sanity.config.js`:

```js
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  // …
  schema: { types: schemaTypes },
})
```

Then add the project id to the website's `.env`:

```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

Add the deployed site URL to **API → CORS origins** in sanity.io/manage so the
browser is allowed to read the dataset.

Until a project id is present, the site serves the mock posts in
`src/lib/sanity/mockPosts.js` — nothing breaks, and the layout is identical.
