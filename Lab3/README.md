# Lab3 - Dockerized Application Deployment

## Aufgabenbeschreibung
Das Projekt besteht aus zwei Teilen:

1. **Teil1:** Bereitstellen einer Wordpress Container infrastruktur unter Verwendung von docker compose mit Wordpress und MySQL images 
2. **Teil2:** Erstellen und Bereitstellen einer Wordpress Container infrastruktur welcher mit zwei benutzerdefinierten „Dockerfile“-Definitionen und einer „docker-compose.yml“-Datei erstellt wird.

---

## Teil1 - Deployment 

Teil 1 setzt vorgefertigte Docker Images voraus. Es sind keine zusätzlichen Erstellungsschritte erforderlich.

1. In Ordnder `Teil1` navigieren:
   ```bash
   cd Teil1
   ```
2. Starten der Applikation mit Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Die Wordpress installation kann unter [localhost:8080](http://localhost:8080) vervollständigt werden.

---

## Teil2 - Build und Deployment 

Teil 2 erfordert die Erstellung von Images mittels der bereitgestellten `Dockerfiles`.

1. In Ordnder `Teil2` navigieren:
   ```bash
   cd Teil2
   ```
2. Build der Applikation mit Docker Compose:
   ```bash
   docker-compose build
   ```
3. Starten der Applikation mit Docker Compose:
   ```bash
   docker-compose up -d
   ```
4. Die Wordpress installation kann unter [localhost:8080](http://localhost:8080) vervollständigt werden.