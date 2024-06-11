::: mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: The server pushes the payload data into notes and redirects us
    server-->>browser: 201 with {message: "note created"}
    deactivate server

    Note right of browser: When the form is sent, the browser pushes the note into notes, executes redrawNotes() and sends the note to the server with sendToServer(note)
:::