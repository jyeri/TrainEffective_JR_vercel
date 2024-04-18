# Goals of this exercise

- Create an app
    - Fetces userdata from github api
    - typeaheads and shows users and avatar fitting to input
    - modify typeahead for every character

- Given ruleset
    - Which does not use prebuilt NPM comps
    - Using HTML, CSS, REACT, JS + Vite and vercel
    - No outside libraries

# My approach

- Keep it as simple as possible
- Handle error when occured, do not overthink
- Keep interface organized and comment everything for myself just aswell as to others. (Trying to learn, not teach yet)
- Don't mess with looks before functional
- Understand every single line you write.

## Order of operations

- App.jsx -> simple as possible, containing mostly components
- SearchInput.jsx -> Field to take an input as event and renders the user input
- UserList.jsx -> Using UseState decide when to show typeahead and update the list of what typeahead should countain.
    - Fetch user data from github api
    - useEffect hook when prop changes
    - Error message if api fetch fails
    - show list of components returned from SingleUser.jsx
- Footer.jsx / Header.jsx most basic components to show info needed.

# Bonuses this far

- Decided to make css that does not atleast hurt my eyes
    - components all have their own .css
    - for example list elements gets colored when hovered
    - Should be scalable to some extent
    - typeahead only shown when i want to
    - For clarity slice typeahead to 20 instead of all
    - Basic commenting done

# Repo

Root
|- Src
|  |- App.jsx
|  |- App.css
|  |- Main.jsx
|  |- Components
|  |  |- Header.jsx / .css
|  |  |- SearchInput.jsx / .css
|  |  |- UserList.jsx / .css
|  |  |- SingleUser.jsx / .css
|  |  |- Footer.jsx / .css
|  |- Bloatware etc.
|- Readme.md
|- Index.html
|- Vite set-up files.