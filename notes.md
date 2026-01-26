**Every JPA entity MUST have a no-arg constructor with at least protected visibility.**

- public -> OK
- protected -> best practice
- private -> not allowed
- missing -> crash

Hibernate doesn't use your parametrized constructor when reading from the DB.

When it executes:
```sql
SELECT * FROM users
```

Hibernate:
  - Allocates an empty object
  - Uses reflection
  - Sets fields directly

For this, it must be able to do: 
```java
new UserEntity();
```
If it can't -> crash.

-----------------

```java
private UserRepository userRepository;

public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
}
```

- One constructor -> Spring uses it (even without @Autowired)
- Multiple Constructors -> Spring may choose the no-arg constructor
- leaving the userRepository to be null causing NPE
    
--------------

keeping the entity free from setters but give it the updation logic (intent-based update) setters should go in models and use dto only for what data is to be transfered 



-----------------
**Jackson only serializes properties that have getters**

If you don't have getter for id in model (User) then Jackson will not serialize it

🧠 **Why this happens (important to understand)**

Jackson follows JavaBean conventions:
- Field alone ❌ not enough
- Getter = property
- No getter = invisible

Jackson does NOT care about:
- constructors
- parameter order
- JPA annotations

Only getters (or public fields).

```java
public class User {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    public User(Long id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
}
```
What you'll see after the fix:
```json
[{
    "id": 1,
    "firstName": "tester",
    "lastName": "1",
    "email": "test1@gmail.com"
  }]
```
