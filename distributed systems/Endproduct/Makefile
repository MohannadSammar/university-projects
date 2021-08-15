start:
	docker-compose up -d

stop:
	docker-compose down

build:
	docker-compose down -v
	docker-compose build
	docker-compose up -d

clean:
	docker rm --force participant
	docker rm --force central
