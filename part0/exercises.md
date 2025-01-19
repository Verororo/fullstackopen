# 0.4: New note diagram

```mermaid
sequenceDiagram
	participant browser
	participant server
	
	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
	activate server
	
	Note right of browser: Server handles the POST request, adding the new note to the array and returning a redirect to the browser
	
	server-->>browser: redirect
	deactivate server
	
	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
	activate server
	server-->>browser: HTML document
	deactivate server
	
	Note right of browser: ...The rest - CSS, JS and JSON - are loaded as usual
```

# 0.5: Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: the JSON file
    deactivate server
```

# 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
	participant browser
	participant server
	
	Note right of browser: User clicks the submit button
	browser->>browser: The list is redrawn by redrawNotes() in spa.js
	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
	
	activate server
	server-->>browser: {"message":"note created"}
	deactivate server
```
