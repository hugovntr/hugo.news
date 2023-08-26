# Title

## Packages

This monorepo is separated into **3 directories**:
- `discord`: Representing **Magnus**, the discord bot that grabs images from Midjourney and publish them to [Notion](https://notion.so)
- `packages`: Representing shared packages (i.e: the notion helper)
- `web`: Representing the blog itself

## Requirements
Before you start the project, you must have installed certain pieces of software.
- [NodeJS](https://nodejs.org/en) _(Download the latest available version 20.x)_
- [Pnpm](https://pnpm.io/installation) — You can make it work with `yarn` or `npm` but I highly suggest using `pnpm`

### Environment
First, clone the `.env.example` to `.env.local`. This file will store all the environment variables required to run the project.
> **Warning**
> Never share this file or its content to anyone


### Notion 
Create a new [Notion API Integration](https://www.notion.so/my-integrations).

Copy the **Internal Integration Secret**, found by clicking in your newly created integration, under the **Secrets** tab.
Save this variable to your `.env.local` like:
```env
NOTION_TOKEN="<Internal Integration Secret>"
```

Next, you should create a new page on notion and add **2 inline databases** to it. You can also do it in many other ways, as long as their schema is the same as the followings:

**Images Database Schema**

| Property Name | Type           |
|---------------|----------------|
| Name          | Title          |
| Image         | Files & medias |
| Prompt        | Text           |
| PromptShare   | Checkbox       |
| Collections   | Relation       |
| CreatedAt     | Created time   |

**Collections Database Schema**

| Property Name | Type                  |
|---------------|-----------------------|
| Name          | Title                 |
| Images        | ↗︎Relation[^relation] |

[^relation] This relation should be automatically created when you create the _Collections_ relation in the **Images Database Schema**

Once you have created these databases, you need to get their unique ID and add them into your `.env.local`.

To do so, click on the "..." next to the `New` button on the database an then click `Copy link to view`.
Here is what the link should look like:
```text
https://www.notion.so/john-doe/<DATABASE_ID>?v=...
```

```env
NOTION_IMAGES_DATABASE="<Image Database Id>"
NOTION_COLLECTIONS_DATABASE="<Collections Database Id>"
```

### Discord
Create a new [Discord Application](https://discord.com/developers/applications) (the bot).

Once you created your application, you will need the following variables:
- `Application ID`: Can be found in the **General Information** tab
- `Token`: Bot > Token (Reset if needed)

> **Warning**
> These should always remain private! Never share them with anyone

Add these variables to the `.env.local` file that you previously created by copying the `.env.example` at the root of your project directory.
```env
...
DISCORD_TOKEN="<Token>"
DISCORD_APPLICATION_ID="<Application ID>"
```

### Encryption Key
Some routes of the API (i.e: the image OpenGraph route) are protected with an **encryption key** to prevent malicious usage.

This encryption key can be anything, see it as a sort of "password".

```env
ENCRYPT_KEY="<Your Encryption Key>"
```

> **Note**
> If you are one macOS or Linux, and have OpenSSL installed, run the following command:
> ```openssl rand -base64 16 | pbcopy```
> It will generate a 16 character base64 key that you can use as your encryption key


## Getting started

First, install all the dependencies
```bash
pnpm install
```


Finally, start the development server:
```bash
pnpm dev
```
> **Note**
> Both, the **Blog** and **Magnus** will start with the same command. They also both react to changes on their source files, so you do not have to restart them to see the changes


## Deployment

> **Warning**
> As of today, I do not recommend to use **Magnus** in production yet, as well as the **Blog** — It's subject to a lot of change, and unless you know what you are doing, follow the development on my [X (ex-Twitter)](https://x.com/hugovntr)

### Blog
The blog can easily be deployed on [Vercel](https://vercel.com), everything is pretty much explained there, only thing that you have to take in consideration is the environment variables that you **MUST** add to your Vercel project, otherwise nothing will work.

### Magnus
**Magnus** can be deployed on the cloud (Netlify, fly.io, ...) or on a private server (VPS, Dedicated, Bare-metal). I personally opted for the private server solution, as I have few of those that are unused/lightly-used.
It does not require a lot of resources to run so you pretty much don't feel any impact on the performances of your server