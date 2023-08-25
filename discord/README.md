# Magnus
`/imagine` a discord bot that pushes Midjourney's images to Notion

> **Note**
> This bot is currently not stable. If you are unsure about what you are doing, I'd advise waiting on the stable release

---

## Requirements
Before you start the project, you must have installed certain pieces of software.
- [NodeJS](https://nodejs.org/en) _(Download the latest available version 20.x)_
- [Pnpm](https://pnpm.io/installation) — You can make it work with `yarn` or `npm` but I highly suggest using `pnpm`

You will also have to create a new [discord application](https://discord.com/developers/applications) (the bot).

Once you created your application, you will need the following variables: 
- `Application ID`: Can be found in the **General Information** tab
- `Token`: Bot > Token (Reset if needed)

> **Warning**
> These should always remain private! Never share them with anyone

Add these variables to the `.env.local` file that you previously created by copying the `.env.example` at the root of your project directory.

## Development

Start the development server by using the following command at the root of the project:
```bash
pnpm --filter discord run dev
```

> **Note**
> If you already started the project with `pnpm dev` there is not need to start the development server here, as it is already started

## Deployment

To run all the time, you will need to deploy the code to a distant server (or on a local machine)

Build the bot with following command:
```bash
pnpm --filter discord build
```

Then start it with:
```bash
pnpm --filter discord start
```