# open-ai-playground
A small repo to play with openAI in Node.js

## Install and setup

* Clone this repo and install depedencies

```
git clone git@github.com:davidcazalis/open-ai-playground.git
cd open-ai-playground
npm install
```

* Create a `.env` file with your [api key](https://beta.openai.com/account/api-keys).

## Usage
```shell
$ npm start "Say this is a test." --maxTokens=5 --temperature=1

> openai@1.0.0 start
> node ./index.js -- "Say this is a test."

⏳ Ask OpenAI ...
 
JSON:         1654997655
ID:           cmpl-5I6mVDvKOzryeXRhoNwFkwUMnsb6O
AI answer(s): 1
🧠: 
    1 →: This is a test.

 
✅ Response saved.
```

Prompt and responses are stored in JSON files in `./logs`