/*
Config plugin required when upgrading from 
Expo 50 & react native 0.73 --> Expo 51 & react native 0.74
ReactCommon.modulemap and React-RuntimeApple.modulemap have the same content and are defining the ReactCommon module, then the issue lies in the redefinition of the module.
The error message "redefinition of module 'ReactCommon'" suggests that the module is being defined more than once in your project, leading to a conflict.
*/

// postinstall.js
const fs = require('fs')
const path = require('path')

const commentOutCode = (fileContent) => {
  console.log('File content to commen out:', { fileContent })

  return fileContent
    .split('\n')
    .map((line) => {
      if (!line.trim().startsWith('//')) {
        return `// ${line}`
      }
      return line
    })
    .join('\n')
}

const executePostInstall = () => {
  console.warn('*'.repeat(20))

  console.warn(`
  This script fixes an issue when upgrading Expo 50 & react native 0.73 --> Expo 51 & react native 0.74
  ReactCommon.modulemap and React-RuntimeApple.modulemap have the same content and are defining the ReactCommon module, then the issue lies in the redefinition of the module.
  The error message "redefinition of module 'ReactCommon'" suggests that the module is being defined more than once in your project, leading to a conflict.
  `)
  console.warn('This should be temporary and removed once fixed.')

  console.warn('*'.repeat(20))

  console.log('Executing post-install script...')

  const directoryPath = path.resolve('ios/Pods/Headers/Public/ReactCommon')
  try {
    const files = fs.readdirSync(directoryPath)
    files.forEach((file) => {
      if (file === 'React-RuntimeApple.modulemap') {
        const filePath = path.join(directoryPath, file)
        let fileContent = fs.readFileSync(filePath, 'utf-8')
        console.log('File content BEFORE commenting out:', { fileContent })
        fileContent = commentOutCode(fileContent)
        console.log('File content AFTER commenting out:', { fileContent })
        fs.writeFileSync(filePath, fileContent)
        console.log('File content updated.')
      }
    })
  } catch (error) {
    console.error('Error occurred while commenting out code:', error)
  }
}

executePostInstall()
