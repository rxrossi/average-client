Format: [Client, Server] - Priority - task type
Priority: [H, M , L]

# Doing

* Client - H - style SignIn and SignUp

# Todo

Fase 1

* Client - M - Sign in of NavBar should redirect to the page where user was when clicking on login
* Client - L - Replace every input with a labeled input that can also show errors
* Client - L - Make the forms to show the generic error message if there is one
* Client - L - Make the EditProfile look better
* Client - L - Covert ArticleCard and ListOfArticleCard to styledComponents
* Client - L - add to storybook the SignIn and SignUp components

---

Fase 2

* Client - H - Work no a comments section

# Done

* Client - L - Edit the Article PublishMenu to look better
* Client - H - Upon creation of new article, entering to edit will reload the page
* Client - H - Implement delete article
* Client - H - Add a create an article button to the MyArticles page
* Client - H - Add the edit profile page
* Client - H - it is not reliable to store the user information on AuthContext, replace storeUserAndToken with storeUserIDandToken ( edit Article component to work with this change)
* Client - M - AuthContext does not pass the authenticated state quick enough (now it reads localStorage on constructor instead of at componentDidMount)
* Client - H - Add saving
* Client - H - fix canEdit(logic) and reading(must always start with true)
* Client - H - Add the publish menu
* Client - H - Nav complement must use min-content on css and the buttons should have theirs width fixed
* Client - H - Implement /article/read
* Client - M - create a flowtype of Article and User
* Client - H - Implement SignIn Component
* Client - H - Implement SignUp Component
* Client - H - Implement Wrapper Component to handle auth
* Client - H - Make sure SignIn and SignOut sends the values correctly to AuthComponent
