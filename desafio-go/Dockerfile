FROM golang:1.18-alpine AS builder

WORKDIR /go/src
COPY . .
RUN go build -o .

FROM scratch

COPY --from=builder /go/src/desafio .

ENTRYPOINT [ "./desafio" ]