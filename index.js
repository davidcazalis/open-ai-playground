#!/usr/bin/env node

import 'dotenv/config'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import chalk from 'chalk'

const argv = yargs(hideBin(process.argv)).argv
const API_KEY = process.env.OPENAI_API_KEY;

import { writeResponse } from './libs/writeResponse.js'
import { completions, edits } from './libs/sendRequest.js'

(async () => {
  const defaultOptions = {
    max_tokens: argv?.maxTokens || 500,
    temperature: Number(argv?.temperature) || 0.9,
    stop: argv?.stop || ["<|endoftext|>"],
  }
  console.log(chalk.yellow('⏳ Ask OpenAI ...'))

  if (argv.edits) {
    console.log(chalk.yellow('... with instruction ...'))
    const editsResponse = await edits(API_KEY)({
      model: 'text-davinci-edit-001',
      input: argv._.length ? argv._.toString() : "What day of the wek is it?",
      instruction: argv.instruction || 'Fix the spelling mistakes',
      temperature: defaultOptions?.temperature,
    })

    writeResponse(editsResponse.data, argv._)
  } else {
    const completionsResponse = await completions(API_KEY)({
      ...defaultOptions,
      model: "text-davinci-002",
      prompt: argv._.length ? argv._ : "Say this is a test.",
    });
  
    writeResponse(completionsResponse.data, argv._);
  }
})();