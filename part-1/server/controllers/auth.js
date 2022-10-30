const bcrypt = require('bcrypt')

const users = [{
  username: 'Ken',
  email: 'ken',
  firstName: 'ken',
  lastName: 'Last',
  password: '$2b$10$iXGxJVNwfhHHcNu.QHk8ReC37MRpb5zVVGFYdTQm/fIrQrV2dgOO2'
}]
//password: hello
module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        console.log(users[i])
        console.log(username, password)
        if (users[i].username === username) {
          console.log('good username')
          bcrypt.compare(password, users[i].password, (error, success) => {
            
              if(success) {
                const userData = {...users[i]}
                delete userData.password
                res.status(200).send(userData)
                console.log(userData)
                console.log('success')
              } else if(error) {
                res.status(400).send('bad pass')
                console.log('bad pass')
              }
            })
          // res.status(200).send(users[i])
        }
      }
      // res.status(400).send("User not found.")
    },
    register: (req, res) => {
      let {email, password} = req.body
      const saltRounds = 10

      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, saltRounds, (error, hashPass) => {
               
        req.body.password = hashPass  
          
        console.log('Registering User')
        console.log(req.body)
        users.push(req.body)
        res.status(200).send(req.body)
        })

      
      })
     },
    

}