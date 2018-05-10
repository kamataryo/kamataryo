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
  message: 'Contacts =>',
  choices: Object.keys(callbacks),
}]

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
  process.stdout.write(`\nHi, I'm ${chalk.cyan('kamataryo')}. I am a web developer and a naturalist.\n`)
  process.stdout.write('My interests: 🐟🐸🐍🐈🌿💻\n\n')
  ask(promptOptions, callbacks)
}
