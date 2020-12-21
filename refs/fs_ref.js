const fs = require('fs')
const path = require('path')

// fs.mkdir(path.join(__dirname, 'notes'), (err) => {
//   if (err) throw new Error(err)

//   console.log('111')
// })

// fs.writeFile(path.join(__dirname, 'notes', 'myNotes.txt'), 
//   'Hello World',
//   (err) => {
//     if (err) throw new Error(err)

//     console.log("File create")

//     fs.appendFile(
//       path.join(__dirname, 'notes', 'myNotes.txt'),
//       'From append file',
//       (err) => {
//         if (err) throw new Error(err)
//       }
//     )
//   }
// )

// fs.readFile(path.join(__dirname, 'notes', 'myNotes.txt'), 
//   'utf-8',
//   (err, data) => {
//     if (err) throw new Error(err)

//     console.log(data)
//   }
// )

fs.rename(
  path.join(__dirname, 'notes', 'myNotes.txt'),
  path.join(__dirname, 'notes', 'notes.txt'),
  (err) => {
    if(err) throw new Error(err)

    console.log('rename')
  }
)