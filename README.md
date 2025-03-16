
![iProjectmage info](./public/sanity.png)
# SANITY.io Project
## Set up a new Next.js application
``npx create-next-app@15 layer-caker --typescript --tailwind --eslint --app --src-dir --import-alias="@/*" --turbopack``
### 1.  Change directory into the project:
``cd layer-caker``
### 2. start Visual Code:
``code .``
### 3. Start the development server:
``npm run dev``
### 4. Update Tailwind CSS implementation:
(src/app/layout.tsx)
```
children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```
### 5. Update layer.tsx to remove custom fonts:
(src/app/layout.tsx)
```
import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```
### 6. Update globals.css to remove anything other than Tailwind's import:
(src/app/globals.css)
```
@import "tailwindcss";
```
***
# Create a new Sanity project
### 1. Run the following command inside your Next.js application to create a new free project from the command line:
`npx sanity@latest init`
### 2. Log into Sanity Studio:
`localhost:3000/studio.com`
### 3. Create and publish posts: use date provided. Download and change to .tar.gz
https://cdn.sanity.io/files/3do82whm/next/0e4d6d82e4663719aa3ce64493975253b93a1c68.gz
### 4. Delete the backup file once the import is succesfull.
`rm production.tar.gz`
### 5. Envirement variables: confirm there is a (.env.local) in the root.
```
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
```
You can use Sanity CLI to update these values with a new or existing Sanity project by running sanity init again with the --env flag: **"only do this if you are starting a new project"**.
`npx sanity@latest init --env`
### 6. Run the following command to show project details:
`npx sanity@latest debug`
### 7. Create a file to store two basic GROQ queries:
`(src/sanity/lib/queries.ts)`
```
import {defineQuery} from 'next-sanity'

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug
}`)

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage
}`)
```
## Testing GROQ queries
- Open http://localhost:3000/studio/vision, paste the POSTS_QUERY GROQ query string and click Fetch:
`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug
}`
***
# Generate TypeScript Types
## Extracting schema
- You're able to use the Sanity CLI from inside the Next.js application because of the sanity.cli.ts file at the root of your project.
### 1. Run the following command in your terminal:
`npx sanity@latest schema extract --path=./src/sanity/extract.json`

Re-run this every time you modify your schema types.
You should see a response like the one below and a newly generated extract.json file in your src/sanity directory.
`✅ Extracted schema`
## Generating types
### 1. Create a new file at the root of your project:
`(sanity-typegen.json)`
```
{
  "path": "./src/**/*.{ts,tsx,js,jsx}",
  "schema": "./src/sanity/extract.json",
  "generates": "./src/sanity/types.ts"
}
```
**The configuration here will:**

- Scan the src directory for GROQ queries to create Types.
- Additionally, use the extract.json file created during the previous task.
- Write a new types.ts file with our other Sanity utilities.
### 2. Run the following command in your terminal:
`npx sanity@latest typegen generate`

Re-run this every time you modify your schema types or GROQ queries.

You should see a response like the one below and a newly created src/sanity/types.ts file in your project.
`✅ Generated TypeScript types for 15 schema types and 2 GROQ queries in 1 files into: ./src/sanity/types.ts`
## Automating TypeGen
### 1. Update package.json scripts:
`(package.json)`
```
"scripts": {
  // ...all your other scripts
  "predev": "npm run typegen",
  "prebuild": "npm run typegen",
  "typegen": "sanity schema extract --path=./src/sanity/extract.json && sanity typegen generate"
},
```
You can now run both the **schema** extraction and **TypeGen** commands with one line:
`npm run typegen`
***
# Fetch Sanity Content
### 1. Open src/sanity/lib/client.ts to confirm it exists in your project.
## Next.js App Router
### 1. Create a new (frontend) directory and duplicate layout.tsx into it:
`mkdir -p src/app/\(frontend\) && cp src/app/layout.tsx src/app/\(frontend\)/`
### You should now have two layout.tsx files inside the app folder at these locations:

src
└── app
    ├── // all other files
    ├── layout.tsx
    └── (frontend)
        └── layout.tsx
### 2. Update the home page.
- Move page.tsx into the (frontend) folder
- Update your home page route to add basic navigation to the posts index.
        
        