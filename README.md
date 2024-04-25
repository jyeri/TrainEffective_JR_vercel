# Github user search, including typeahead.

## SUMMARY

The project is a GitHub user search application with typeahead functionality. It's built with JavaScript and React, and it's divided into three main components:

1. Header: Displays the title.
2. SearchInput: Allows the user to enter input. It takes two props, setSearchQuery and setIsInputFocused, and updates the search query when the input changes. It also controls whether the typeahead should be shown based on the isInputFocused state.
3. UserList: Displays a list of users. It takes searchQuery and isInputFocused as props, and uses these to handle errors and suggestions. It also debounces the searchQuery to prevent too many API calls.

The application is bootstrapped with Vite and deployed on Vercel. It does not use any external libraries or prebuilt components from npm.

## Main goals

1. Fetch user data from github api.
2. Take user input in search bar.
3. Search matching usernames from fetched database.
4. Show typeahead of usernames containing same sequence with userinput.
5. Link typeahead with user github profile page.

- No external libraries,  no prebuilt components from npm, Vite for bootstrap, Vercel deployement.

## Hows and whys?

- App in general
    - Divided in 3 sections, each their own comp.

        1. Header for title

        2. SearchInput

            - Allows user to enter input
            - Takes two props, setSearchQuery and SetIsInputFocused
            - on input change calls HandleInputQuery to update search to target value.
            - Using IsInputFocuses decides should typeahead be shown or not.
            - OnBlur function delays activation of IsInputFocused
            - Basic emoji to prevent searchbar from going unnoticed by any chance

        3. UserList

            - forms a list of users to be shown
            - take states of searchQuery and isInputFocused as prop
            - First make object for handling errors and suggestion text
                - all binded in same object, not as efficient but SO MUCH easier to read and follow. Didn't affect performance enough to justify using multiple useStates.
            - Debounce the searchQuery to prevent too many api calls.
                1. The useDebounce hook takes two arguments: value and delay. value is the value to be debounced, and delay is the amount of time (in milliseconds) to delay the update of the value.
                2. Inside the useDebounce hook, a state variable debouncedValue is created using the useState hook. This state variable holds the debounced version of the value.
                3. The useEffect hook is used to update debouncedValue after the specified delay whenever the value or delay changes. This is done by setting a timeout that updates debouncedValue to the current value after delay milliseconds.
                4. The useEffect hook returns a cleanup function that clears the timeout. This function is called when the component unmounts or before the next time the effect runs.
                5. The useDebounce hook returns the debouncedValue.
            - Function check if there is already searchQuery from previous call (Local storage)
                - Again not most efficient but works great giving the idea of this app.
            - If there is none, we fetch from github api
                - If error shows up, we update the error message and throw it.
                - we store succesfull fetch to local storage if it needs to be accessed again soon. (toLower)
            - Error management
                - if there is no results give an error message
                - if there is nothing in input give suggestion
                - if there is error with fetch, show error message
            - fetchdata again after debounce if input has changed.
            - On mouseclick of the return div link to correspoding users page
            - Build the list from SingleUser components.
        
        4. SingleUser
            - Returns single div of Matching User avatar, name and link.
            - Uses memo to skip re-rendering comp if its prop is unchanged.
            - take regular expression of the name, and split it to parts for highlighting
            - if query is empty show no avatar. (suggestion)
            - else, for each part of users login display it with or without highlighting
    
## Styling and preferences

- I made decision to keep styling really simple with only css
- Small details to make it look better:
    1. Color scheme from TrainEffective app
    2. On hover action for title and typeahead results
        - on hover result avatar gets colored
    3. highlight the matching part of the name that matches
    4. proper suggestions, error messages and placeholder

## Lessons learned and what would I change

- Css if awful.
    1. I would really use anymated search bar, more colors and actualy style it to be part of the page, instead being the whole page.
    2. outside libraries would have done wonders.
- Handling the request limits
    1. Debouncing is great, but not enough for strict request limits
    2. combined with local storage is decent workaround, but if the use case was different that would not be sufficient.
- Next time take direct road how you want to handle clicks and events
    1. it gets really messy if you keep changing direction on how and what to track like now.
    2. Instead of moving on when it seems to work, try to clean up directly after so you dont end up testing every line is it necessary or not.
- Naming and id's on everything should much more const, becuase its wasting time and making it harder to read if the naming isn't obivious.
- Try to lose the mentality from C where every piece of memory has to be strictly allocated and passed for re-use.
- When starting KEEP IN MIND THE DEVICE AND USE CASE. it is so much easier to write responsive app than modifying non resposive to be one.
- More error handling, more use of memo for effiency
- Find good alternative for smal localstorage
- try to decrease use of inline functions and move towards Callback hooks
- Avoid prop drilling in future, in this scale it should be fine, but makes problems in larger scale
- Api URL shouldn't be hardcoded if possible, instead enviro variable.

### Thought before starting

- Keep it as simple as possible
- Handle error when occured, do not overthink
- Keep interface organized and comment everything for myself just aswell as to others. (Trying to learn, not teach yet)
- Don't mess with looks before functional
- Understand every single line you write.

### Repository

Root
|- GithubApiSearch
|  |- Src
|  |  |- App.jsx
|  |  |- App.css
|  |  |- Main.jsx
|  |  |- Components
|  |  |  |- Header.jsx / .css
|  |  |  |- SearchInput.jsx / .css
|  |  |  |- UserList.jsx / .css
|  |  |  |- SingleUser.jsx / .css
|  |  |  |- UseDebounde.jsx
|  |  |  |- Footer.jsx / .css (DELETED)
|  |  |- Bloatware etc.
|  |- Index.html
|  |- Vite set-up files.
|- README.md

