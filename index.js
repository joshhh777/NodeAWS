import express from 'express'
const app = express()

app.use(express.json())

let personas = [
  {
    id: 1,
    nombre:"Pablo Perez",
    numero:"+51980567123"
  },
  {
    id: 2,
    nombre:"Jose Cancino",
    numero:"+51932199913"
  },
  {
    id: 3,
    nombre:"Marta Garcia",
    numero:"+51980012332"
  },
  
  {
    id: 4,
    nombre:"Noel Santiago",
    numero:"+51980012332"
  },
  
  {
    id: 5,
    nombre:"Bad Bunny",
    numero:"+51992005123"
  }
]

const tamaño = personas.length
const tiempo = new Date().toString()



app.get('/', (request, response) => {
    response.send('<h1>Hola Jose Cancino</h1>')
  })

  app.get('/api/personas', (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(personas))
  })

  app.get('/api/personas/info', (request, response) => {
    response.send ("<h1>La agenda tiene informacion para "+tamaño + " personas</h1>" + 
                     " <h2>La solicitud se hizo en el tiempo de " + tiempo +"</h2>") 
    
  })

  app.get('/api/personas/:id', (request, response) => {
    const id = Number(request.params.id)
    const persona = personas.find(persona =>  persona.id === id)
    if(persona){
      response.json(persona)
      }else{
        response.status(404).end()
      }
    })
  
  app.delete('/api/personas/:id', (request, response) => {
      const id = Number(request.params.id)
      personas = personas.filter(persona => persona.id !== id)
      response.status(204).end()
      })

  app.post('/api/personas', (request, response) => {
      const persona = request.body

      const pernombre = personas.map(pnombre => pnombre.nombre)

      if(!persona || !persona.nombre ){
        return response.status(400).json({
          error: "nombre is missing"
        })
      }
      if(!persona || !persona.numero ){
        return response.status(400).json({
          error: "numero is missing"
        })
      }

      if(!pernombre !== !persona.nombre ){
        response.status(201).json(nuevaPersona)
      }else{
        return response.status(400).json({
          error: "nombre already exists"
        })
      }
      console.log(pernombre)

      const nuevaPersona ={
        id: Math.floor( Math.random()*100),
        nombre: persona.nombre,
        numero: persona.numero
      }

      personas = [
        ...personas,
         nuevaPersona
      ]

      response.status(201).json(nuevaPersona)
      })


  
  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })