IMAGE_NAME=cloud-fe
TAG=latest
PORT=5173

.PHONY: build run build-run

build:
	docker build -t $(IMAGE_NAME):$(TAG) .

run:
	docker run -it --rm -p $(PORT):$(PORT) \
		$(IMAGE_NAME):$(TAG)

build-run: build run