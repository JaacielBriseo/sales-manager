## Development

1. Clone the repository and install the dependencies

```bash
git clone
cd
npm install
```

2. Create .env.local file

3. Run docker compose to start the database

```bash
docker compose -f docker-compose.dev.yaml --env-file .env.local up
```

4. Run the server

```bash
npm run dev
```
