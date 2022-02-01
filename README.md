# OpenAPI-Skeleton-M295

## Anforderungen

- Git
- Node
- Datenbank

## Installieren

```sh
git clone https://github.com/FabioKaelin/OpenAPI-ToDoManager.git
cd OpenAPI-Skeleton-M295
npm install
npm run api
```

## Benutzung

Mann kan hier seine Tasks eintragen mit verschiedenen Benutzern.

Mann kann mit Hilfe meines Frontends ([ToDo-API](https://github.com/FabioKaelin/ToDoManager)) kann man das Backend benutzen.

## Endpunkte (/v1)

- /authenticate ist um einen Token zu erhalten
- /healthcheck ist um die API zu testen
- /register ist um einen neune Benutzer zu erstellen
- /tasks ist um die Tasks zu bearbeiten
- /unauthorized ist um den Error-Handler zu testen
- /uuid generiert eine UUID

### /authenticate

Man gibt eine Email mit dem dazugehörendem Passwort eines registrierten Benuzers im Body mit und bekommt einen eine Email, Token und die UUID des Benutzers

Antwort Beispiel

```json
{
  "code": 200,
  "message": "JWT Verification succeeded",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "max.muster@example.ch",
    "token": "S0VLU0UhIExFQ0tFUiEK"
  }
}
```
