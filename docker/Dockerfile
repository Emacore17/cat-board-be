# Usa un'immagine Node come base
FROM node:20.9.0

# Crea una directory di lavoro
WORKDIR /usr/src/app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutti gli altri file del progetto
COPY . .

# Compila il progetto
RUN npm run build

# Espone la porta usata dall'applicazione (sostituisci con la porta usata dal tuo NestJS)
EXPOSE 4000

# Comando per avviare l'applicazione
CMD ["npm", "run", "start:prod"]
