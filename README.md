<img src="src/app/opengraph-image.png" alt="quartett-preview"/>

# 3D Solar System experience 🛰️👨‍🚀

Visit the live site under: 3d-solar-system-experience.vercel.app ⬅️

### About the Project

---

This is a university project. The goal was to create an 3d solar experience using Three.js and SvelteKit that showcases the solar system with its planets and moons. I also added an AI chat functionality to provide even more information about specific planets.

### Features

- [x] 🖼️ AI Generated Images
- [x] 📶Streaming AI Responses using Vercel AI SDK
- [x] 🪄 CSS Animations
- [x] ↕️ Sort Functionality
- [x] ⭕ Filter Functionality
- [x] 📲 Reponsiveness

### API's used

<b>Solar and Planet Data: </b>
I used the Le Systeme Solaire API to get the data for the solar system. You can check out the API here:
[Solar API](https://api.le-systeme-solaire.net/rest/bodies)
<img src="./static/documentation/api-preview.png" alt="solar-api-preview" style="width: 50%;"/>

To provide even more information about specific planets, I used the OpenAI API to generate text based on the data provided by the Le Systeme Solaire API. You can check out the API here:
[Open AI](https://platform.openai.com/docs/api-reference/chat)
<img src="./static/documentation/openai-preview.png" alt="openai-preview" style="width: 50%;"/>

I also used the Vercel [AI SDK](https://sdk.vercel.ai/docs/introduction) to stream the text generated by the OpenAI API.
<img src="./static/documentation/vercel-sdk-preview.png" alt="vercel-sdk-preview" style="width: 50%;"/>

### Tech Stack

---

- NextJS
- Tailwind CSS
- Typescript
- ShadcnUI
- Vercel AI SDK

---

## How it works

1. Clone the Repo
2. Create a .env.local file in your root directory

```
OPENAI_API_KEY=YOUR_API_KEY
```

3. Install all the dependecies using pnpm install

```
pnpm install
```

4. Start the Development Sever with pnpm run dev

```
pnpm run dev
```
