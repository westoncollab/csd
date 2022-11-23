# Landing page pseudocode

Here when we refer to `EVENT` it means code which runs as a reaction to a user interacting with the user interface.
For example, an `EVENT` might be a triggered when a user clicks a button.

***

## Landing page
```
1: EVENT On sign in button click THEN
2:     Open the login page
3: END
```
```
1: EVENT On sign up button click THEN
2:     Open the sign up page
3: END
```

## Sign in page
```
1: EVENT On login button click THEN
2:     Open the authentication process
3:     Verify account
4:     Login verfied/denied
5: END
```
```
1: EVENT On cancel button click THEN
2:     Open the landing page
3: END
```

# Sign up page
```
1: EVENT On account creation button click THEN
2:     Open the authentication process
3:     Verify account
4:     Add account to database
5:     Open home page
6: END
```
