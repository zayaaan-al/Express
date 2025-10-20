## Project overview

This is a small MERN-style workspace with two top-level apps:
- `Backend/` — Express + Mongoose API server (ES module style). Entry: `Backend/app.js`.
- `frontent/` — Vite + React frontend (note: directory name is `frontent` not `frontend`).

Key runtime details:
- Backend connects to MongoDB at `mongodb://127.0.0.1:27017/backend` via `Backend/connection.js`.
- Environment variables are loaded with `dotenv` in `Backend/app.js`. The server listens on `process.env.PORT`.
- Router definitions live in `Backend/router.js`; request handlers are in `Backend/reqhandler.js` and data model in `Backend/model/model.js`.
- Simple JWT auth middleware located at `Backend/middleware/auth.js` expects `Authorization: Bearer <token>` and uses `process.env.JWT_KEY`.

## What an AI code agent should know and do first
- Respect the ES module (`type: "module"`) style in `Backend/package.json` and use import/export syntax.
- The backend has no start script: avoid adding assumptions. If you add scripts, update `Backend/package.json` and document them.
- Database is local MongoDB; when modifying model or connection behavior, update `Backend/connection.js` and `.env` usage.
- The frontend folder is named `frontent/` (typo). Tools or patches that reference `frontend` will break—use the exact name.

## Coding patterns and conventions (project-specific)
- Handlers in `reqhandler.js` use async functions but mostly rely on Mongoose promise chaining (.then/.catch). Follow the existing pattern for consistency when adding new handlers.
- Responses often return short JSON shapes: { msg: "..." } or { error: ... }. Mirror these shapes in client-facing changes.
- Model file exports with `mongoose.models.Datas||mongoose.model('datas',dataSchema)` to avoid overwrite errors in dev - keep this pattern when adding models.
- Auth middleware attaches `req.user = decoded` and calls `next()`. Routes that require auth are not currently wired; follow this middleware shape when protecting routes.

## Examples (copyable snippets)
- Read token in middleware (as used in `Backend/middleware/auth.js`):

  - Authorization header format: `Authorization: Bearer <token>`
  - Use `jwt.verify(token, process.env.JWT_KEY, callback)` and set `req.user = decoded`.

- Create document pattern (as in `AddData`):

  - `await dataSchema.create({...Datas}).then(()=>res.status(201).send({msg:"Successfull"})).catch(err=>res.status(404).send({msg:err}))`

## Files to inspect for impact when changing behavior
- `Backend/app.js` — server bootstrap, dotenv usage, CORS, and router mount point (`/api`).
- `Backend/connection.js` — MongoDB connection string. If switching environments, update here or load from `.env`.
- `Backend/reqhandler.js` — CRUD implementations; changing response shapes or status codes must be reflected in frontend calls.
- `Backend/middleware/auth.js` — JWT secret usage; if rotating keys, update `process.env.JWT_KEY` and token issuance logic (not present here).
- `frontent/` — Vite React app; check `src/components` for how API endpoints are consumed (not exhaustively listed here).

## Developer workflows & commands (discoverable)
- Frontend dev: from `frontent/` run `npm run dev` (Vite) — scripts are in `frontent/package.json`.
- Backend: no start/dev script defined. Typical run commands are:

  - `node Backend/app.js` (requires Node >=14 with ES module support and environment variables set)
  - Prefer adding `start` and `dev` scripts to `Backend/package.json` (e.g. `node app.js` / `nodemon app.js`) and documenting them.

## Integration points & external dependencies
- MongoDB (local) — change DB URL in `Backend/connection.js` or switch to using `.env` variables for host/port.
- JWT (`jsonwebtoken`) — secret from `process.env.JWT_KEY`.
- CORS enabled in `app.js` for all origins; when tightening, update `app.use(cors())` there.

## Safety and testing notes for AI edits
- Do not assume presence of a production build or CI config. There are no tests or start scripts.
- Preserve the `frontent/` folder name when editing or creating scripts.
- Keep `type: "module"` in `Backend/package.json` and use imports instead of require.

## If you update/add files, also update
- `Backend/package.json` scripts if you add a start/dev script.
- Project README (there is a `frontent/README.md`) — keep documentation in sync.

---
If anything here is unclear or you want more detail (for example, frontend API usage or token issuance flow), tell me which area to expand and I will update this file.
