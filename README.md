# nextjs-whatsapp-clone-starter

## some useful commands 

### start postgresql
pg_ctl -D whatsapp start

### Start manually
pg_ctl -D /usr/local/var/postgres start

### Stop manually
pg_ctl -D /usr/local/var/postgres stop

### start automatically
brew services start postgresql

### stop automatically
brew services stop postgresql

### start client
npm run dev

### start server 
npm start

### start prisma studio gui
npx prisma studio