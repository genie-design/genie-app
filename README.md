<p align="center">
  <a href="https://storybook.js.org/">
    <picture>
      <img src="https://raw.githubusercontent.com/genie-team/graphql-genie/master/resources/logo.svg?sanitize=true"  alt="Genie App" width="300" />
    </picture>
  </a>
</p>

<p align="center">Genie App is a set of tools that make it easier to create a content manageable site with unique features.</p>
<br/>
<p align="center"> Use any framework, meta framework, or language you want (React, Next, Remix, Astrol Svelte, Qwik, Vue, Solid  or even something like  HTMX with a Go backend)</p>
<br/>
<p align="center"> ❗Genie App is early on so creating the stack is manual process... for now❗</p>
<p align="center">❗See https://brown-dog-biscuits.pages.dev/ for an in progress example ❗</p>

## Features

- [Content Management](#content-management)
- [Image API](#image-api)
- [Icon Background](#icon-background)


## Content Management
- Get full featured API, GraphQL API, Authentication, Access Control, Image storage and more running on Cloudflare's global network 
- Powered by [Sonic JS](https://github.com/genie-design/sonicjs)

## Image API
- Use [Cloudinary](https://cloudinary.com/) and their API to get image renditions (size, format, crop, etc) but use Cloudflare to cache and serve them quickly.
- https://github.com/acoreyj/cf-worker-images
- Not only fast, but avoids the bandwidth costs from Cloudinary and compute costs from Cloudflare
- Create an image component so your users get the best image for their device
  - Examples
    - [jsx (React, Solid, Qwik, etc) ](https://github.com/acoreyj/qwik-daisyui/blob/main/apps/docs/src/components/genie-image.tsx)
    - [Svelte](https://github.com/acoreyj/brown-dog-biscuits/blob/main/src/components/GenieImage.svelte)
   
## Icon Background
  - Choose from over 200,000 icons from [Iconify](https://icon-sets.iconify.design/)
  - Configure a range of sizes, colors, transformations, blank areas
  - https://github.com/genie-design/icon-bg-wrangler
  - https://github.com/genie-design/icon-background
  - Example with different backgrounds at different screen widths, with different cutouts for the dogs image
    - https://brown-dog-biscuits.pages.dev/

## Typescript Page API
  - Get your content, fully typed, with GraphQL
  - https://github.com/acoreyj/brown-dog-biscuits

```ts
import { graphql } from 'gql.tada';
import { GraphQLClient } from 'graphql-request';
const getProductsQuery = graphql(`
	query Products {
		products {
			id
			title
			description
			image
      skus {
        id
        title
        description
        price
        size
      }
		}
	}
`);

const graphQLClient = new GraphQLClient(
	'https://content.GENIEAPP.com/graphql'
);
const data = await graphQLClient.request(getProductsQuery);
if (data?.products) {
	return {
		products: data.products
	};
}

```
  
