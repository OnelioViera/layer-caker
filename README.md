
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
- (src/app/layout.tsx)
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
- (src/app/layout.tsx)
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
- (src/app/globals.css)
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