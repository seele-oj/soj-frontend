FROM oraclelinux:9-slim AS builder

RUN microdnf update -y && \
    microdnf install -y curl tar which gzip

RUN curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - && \
    microdnf install -y nodejs

RUN npm install -g @sveltejs/kit

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | bash -s -- -y

ENV PATH="/root/.cargo/bin:${PATH}"

RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN microdnf install -y gcc

RUN npm run wasm

RUN npm run build

FROM oraclelinux:9-slim AS production

RUN microdnf update -y && \
    microdnf install -y curl tar

RUN curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - && \
    microdnf install -y nodejs

WORKDIR /app

COPY --from=builder /app/.svelte-kit/output/server ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "build"]
