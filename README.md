# Set up a new Next.js application
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
### 7. *Create* a file to store two basic GROQ queries:
`src/sanity/lib/queries.ts`
```
import {defineQuery} from 'next-sanity'

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug
}`)

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage
}`)
```