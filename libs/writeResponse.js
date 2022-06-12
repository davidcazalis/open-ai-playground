import chalk from 'chalk'
import prettyoutput from 'prettyoutput'
import daysjs from 'dayjs'
import { writeFile } from 'node:fs'

export const writeResponse = (data, prompt) => {
  const fileName = daysjs().unix()

  if (!prompt) {
    throw new Error(chalk.red('❌ You forget to ask something ...'))
  }

  if (!data && !data.choices.length) {
    throw new Error(chalk.red('❌ No data in response.'))
  }

  const answers = data.choices.reduce((all, choice, index) => {
    return {
      ...all,
      [`${index + 1} →`]: choice.text.trim()
    }
  }, {})

  return writeFile(`./logs/${fileName}.json`, JSON.stringify({
    prompt,
    response: data,
  }, null, 2), 'utf8', (err) => {
    if (err) {
      console.log(chalk.red('❌ Error:', err))
    } else {
      console.log(' ')
      console.log(prettyoutput({
        'JSON': fileName,
        'ID': data.id,
        "AI answer(s)": data.choices.length,
        '🧠': answers,
      },
      {
        indentationLength: 4,
        colors: {
          string: 'cyan'
        }
      }))
      console.log(' ')
      console.log( chalk.green('✅', 'Response saved.'))
    }
  })
} 