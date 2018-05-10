const path = require('path')
const termImg = require('term-img')
const chalk = require('chalk')
const inquirer = require('inquirer')
const opn = require('opn')

const avatar = path.join(__dirname, 'icon.png')

const callbacks = {
  Twitter: () => opn('https://twitter.com/kamataryo_'),
  GitHub: () => opn('https://github.com/kamataryo'),
  Instagram: () => opn('https://www.instagram.com/kamata.ryo/'),
  web: () => opn('https://kamataryo.com'),
  iNaturalist: () => opn('https://www.inaturalist.org/people/kamataryo'),
  [chalk.yellow('Quit')]: () => process.exit(0),
}

const promptOptions = [{
  type: 'list',
  name: 'key',
  message: 'Contacts:',
  choices: Object.keys(callbacks),
}]

const arg = process.argv[process.argv.length - 1]

const ask = async (promptOptions, callbacks) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { key } = await inquirer.prompt(promptOptions)
    callbacks[key]()
  }
}

module.exports = () => {
  process.stdout.write('\n')
  termImg(avatar, { fallback: () => process.stdout.write('🐟🐟🐟\n🐟🐈🐟\n🐟🐟🐟\n') })
  process.stdout.write(`\nHi, I'm ${chalk.cyan('kamataryo')}, a web developer and naturalist.\n`)
  process.stdout.write('My interests: 🐟🐸🐍🦎🦆🐈🌿💻\n\n')
  const foundKey = Object.keys(callbacks)
    .filter(key => key.toUpperCase() === arg.toUpperCase())[0]
  if (foundKey) {
    callbacks[foundKey]()
    process.stdout.write(`${foundKey} has been opend.`)
    process.exit(0)
  } else {
    ask(promptOptions, callbacks)
  }
}
