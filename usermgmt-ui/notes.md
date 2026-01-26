- content-Type -> the type of data being sent to the server
- accept -> the type of data being expected from the server

content-Type tells the server:
"I'm sending you a request body of this format"

//NOTE: null = "data doesn't exist
//NOTE: [] = "data exists, but it's empty"

------------------

**Minimal GET request**

```tsx
fetch(USER_API_BASE_URL)
```
**When Headers are required in GET**

```tsx
headers:{
     Authorization: `Bearer ${token}`,
     Accept: "application/json",
```
 
 - Authorization -> who you are
 - Accept -> what you expect bac
 
 **When to use Content-Type: POST/PUT/PATCH requests**
 ```tsx
 fetch(url, {
     method: "POST", //or "PUT" or "PATCH",
     headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
     },
     body: JSON.stringify(data), //data being sent to the server
 });
```

